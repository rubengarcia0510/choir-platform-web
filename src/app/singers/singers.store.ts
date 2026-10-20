import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  patchState,
  signalStore,
  withMethods,
  withState
} from '@ngrx/signals';
import { EMPTY, catchError, finalize, tap } from 'rxjs';

import { Singer } from './singer.model';
import { SingersApiService } from './singers-api.service';

interface SingersState {
  singersByChoir: Record<string, Singer[]>;
  loadedChoirIds: Record<string, boolean>;
  loadingByChoir: Record<string, boolean>;
  errorsByChoir: Record<string, string | null>;
}

const initialState: SingersState = {
  singersByChoir: {},
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
            patchState(store, (state) => ({
              singersByChoir: {
                ...state.singersByChoir,
                [key]: singers
              },
              loadedChoirIds: {
                ...state.loadedChoirIds,
                [key]: true
              }
            }));
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
