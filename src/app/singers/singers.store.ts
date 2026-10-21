import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState
} from '@ngrx/signals';
import { EMPTY, catchError, finalize, tap } from 'rxjs';

import { Singer } from './singer.model';
import { SingersApiService } from './singers-api.service';

interface SingersState {
  singersById: Record<string, Singer>;
  singerIdsByChoir: Record<string, number[]>;
  loadedChoirIds: Record<string, boolean>;
  loadingByChoir: Record<string, boolean>;
  errorsByChoir: Record<string, string | null>;
}

const initialState: SingersState = {
  singersById: {},
  singerIdsByChoir: {},
  loadedChoirIds: {},
  loadingByChoir: {},
  errorsByChoir: {}
};

function errorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    return 'No se pudo cargar el elenco. Revisá la conexión e intentá nuevamente.';
  }

  return 'Ocurrió un error al cargar el elenco.';
}

export const SingersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    singersByChoir: computed(() => {
      const singersById = store.singersById();
      const singerIdsByChoir = store.singerIdsByChoir();
      const result: Record<string, Singer[]> = {};

      for (const [choirKey, singerIds] of Object.entries(singerIdsByChoir)) {
        result[choirKey] = singerIds
          .map((singerId) => singersById[String(singerId)])
          .filter((singer): singer is Singer => singer !== undefined);
      }

      return result;
    })
  })),
  withMethods((store) => {
    const api = inject(SingersApiService);

    return {
      loadSingers(choirId: number, force = false): void {
        if (!Number.isSafeInteger(choirId) || choirId <= 0) {
          return;
        }

        const key = String(choirId);

        // No repetir una carga activa ni una carga ya completada.
        if (store.loadingByChoir()[key]) {
          return;
        }

        if (!force && store.loadedChoirIds()[key]) {
          return;
        }

        patchState(store, (state) => ({
          loadingByChoir: {
            ...state.loadingByChoir,
            [key]: true
          },
          errorsByChoir: {
            ...state.errorsByChoir,
            [key]: null
          }
        }));

        api.list(choirId).pipe(
          tap((singers) => {
            patchState(store, (state) => {
              const nextSingersById = { ...state.singersById };
              const previousIds = state.singerIdsByChoir[key] ?? [];
              const nextIds = singers.map((singer) => singer.id);
              const nextIdSet = new Set(nextIds);

              // Retirar entidades que ya no pertenecen al elenco recibido.
              for (const previousId of previousIds) {
                if (!nextIdSet.has(previousId)) {
                  delete nextSingersById[String(previousId)];
                }
              }

              // Actualizar los datos por ID y conservar el orden de la API.
              for (const singer of singers) {
                nextSingersById[String(singer.id)] = singer;
              }

              return {
                singersById: nextSingersById,
                singerIdsByChoir: {
                  ...state.singerIdsByChoir,
                  [key]: nextIds
                },
                loadedChoirIds: {
                  ...state.loadedChoirIds,
                  [key]: true
                }
              };
            });
          }),
          catchError((error: unknown) => {
            patchState(store, (state) => ({
              errorsByChoir: {
                ...state.errorsByChoir,
                [key]: errorMessage(error)
              }
            }));

            return EMPTY;
          }),
          finalize(() => {
            patchState(store, (state) => ({
              loadingByChoir: {
                ...state.loadingByChoir,
                [key]: false
              }
            }));
          })
        ).subscribe();
      }
    };
  })
);
