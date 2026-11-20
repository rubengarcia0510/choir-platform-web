import { Component, Input, OnInit, inject, signal } from '@angular/core';

import { SingersStore } from './singers.store';
import { Singer } from './singer.model';
import { SingersApiService, SingerRequest } from './singers-api.service';
import { VocalSection } from './vocal-section.model';
import { VocalSectionsApiService } from './vocal-sections-api.service';

interface SingerForm {
  displayName: string;
  email: string;
  voicePart: string;
  voiceSectionId: string;
  mobility: string;
  restrictions: string;
}

const emptyForm = (): SingerForm => ({
  displayName: '',
  email: '',
  voicePart: '',
  voiceSectionId: '',
  mobility: '',
  restrictions: ''
});

@Component({
  selector: 'app-choir-singers',
  standalone: true,
  template: `
    <section class="singers-management" aria-labelledby="singers-heading">
      <div class="singers-heading">
        <div>
          <span class="panel-kicker">ELENCO</span>
          <h3 id="singers-heading">Integrantes de {{ choirName }}</h3>
        </div>
        <button
          class="button button-primary"
          type="button"
          [disabled]="saving()"
          (click)="beginCreate()">
          Agregar integrante
        </button>
      </div>

      @if (loading()) {
        <p role="status">Cargando integrantes…</p>
      }

      @if (error()) {
        <div class="choir-message" role="alert">
          {{ error() }}
          <button class="button button-secondary" type="button" (click)="load()">
            Reintentar
          </button>
        </div>
      }

      @if (success()) {
        <p class="choir-success-announcement" role="status" aria-live="polite">
          {{ success() }}
        </p>
      }

      @if (formOpen()) {
        <form class="singer-form panel" (submit)="save($event)">
          <h4>{{ editingId() === null ? 'Nuevo integrante' : 'Editar integrante' }}</h4>

          <label class="choir-field">
            Nombre completo
            <input
              name="displayName"
              required
              maxlength="160"
              [value]="form().displayName"
              (input)="setField('displayName', $event)">
          </label>

          <label class="choir-field">
            Email
            <input
              name="email"
              type="email"
              maxlength="254"
              [value]="form().email"
              (input)="setField('email', $event)">
          </label>

          <label class="choir-field">
            Cuerda / voz
            <input
              name="voicePart"
              maxlength="40"
              placeholder="Ej.: Soprano, Tenor"
              [value]="form().voicePart"
              (input)="setField('voicePart', $event)">
          </label>

          <label class="choir-field">
            Sección vocal
            <select
              name="voiceSectionId"
              [value]="form().voiceSectionId"
              (change)="setField('voiceSectionId', $event)">
              <option value="">Sin sección asignada</option>
              @for (section of sections(); track section.id) {
                <option [value]="section.id">{{ section.name }}</option>
              }
            </select>
          </label>

          <label class="choir-field">
            Movilidad
            <input
              name="mobility"
              maxlength="120"
              [value]="form().mobility"
              (input)="setField('mobility', $event)">
          </label>

          <label class="choir-field">
            Restricciones u observaciones
            <textarea
              name="restrictions"
              rows="3"
              maxlength="1000"
              [value]="form().restrictions"
              (input)="setField('restrictions', $event)"></textarea>
          </label>

          @if (formError()) {
            <p class="choir-error" role="alert">{{ formError() }}</p>
          }

          <div class="choir-actions">
            <button
              class="button button-primary"
              type="submit"
              [disabled]="saving() || !form().displayName.trim()">
              {{ saving() ? 'Guardando…' : 'Guardar integrante' }}
            </button>
            <button
              class="button button-secondary"
              type="button"
              [disabled]="saving()"
              (click)="cancelForm()">
              Cancelar
            </button>
          </div>
        </form>
      }

      @if (!loading() && singers().length === 0) {
        <div class="singers-empty">
          <p>Todavía no hay integrantes registrados en este coro.</p>
          <p>Agregá el elenco para poder utilizarlo en Formaciones.</p>
        </div>
      } @else {
        <ul class="singers-list">
          @for (singer of singers(); track singer.id) {
            <li class="singer-item" [class.singer-inactive]="!singer.active">
              <div class="singer-information">
                <strong>{{ singer.displayName }}</strong>
                @if (!singer.active) {
                  <span class="choir-archived-label">Inactivo</span>
                }
                <span>{{ singer.voicePart || 'Sin cuerda asignada' }}</span>
                <span>{{ sectionName(singer.voiceSectionId) }}</span>
                @if (singer.email) {
                  <span>{{ singer.email }}</span>
                }
                @if (singer.mobility) {
                  <span>Movilidad: {{ singer.mobility }}</span>
                }
                @if (singer.restrictions) {
                  <span>Observaciones: {{ singer.restrictions }}</span>
                }
              </div>

              <div class="choir-actions">
                @if (singer.active) {
                  <button
                    class="button button-secondary"
                    type="button"
                    [disabled]="saving()"
                    (click)="beginEdit(singer)">
                    Editar
                  </button>

                  @if (deactivationId() === singer.id) {
                    <span>¿Dar de baja?</span>
                    <button
                      class="button button-danger"
                      type="button"
                      [disabled]="saving()"
                      (click)="deactivate(singer)">
                      Confirmar
                    </button>
                    <button
                      class="button button-secondary"
                      type="button"
                      (click)="deactivationId.set(null)">
                      Cancelar
                    </button>
                  } @else {
                    <button
                      class="button button-secondary"
                      type="button"
                      [disabled]="saving()"
                      (click)="deactivationId.set(singer.id)">
                      Dar de baja
                    </button>
                  }
                } @else {
                  <button
                    class="button button-secondary"
                    type="button"
                    [disabled]="saving()"
                    (click)="reactivate(singer)">
                    Reactivar
                  </button>
                }
              </div>
            </li>
          }
        </ul>
      }
    </section>
  `,
  styles: [`
    :host { display: block; }
    .singers-management {
      flex: 1 1 100%;
      min-width: 0;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--choir-line, #E9E8E1);
    }
    .singers-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
    .singers-heading h3 { margin: .25rem 0 0; }
    .singer-form {
      display: grid;
      gap: .85rem;
      margin-bottom: 1rem;
    }
    .singer-form h4 { margin: 0; }
    .singer-form input,
    .singer-form select,
    .singer-form textarea {
      display: block;
      width: 100%;
      box-sizing: border-box;
      margin-top: .35rem;
    }
    .singers-list {
      display: grid;
      gap: .75rem;
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .singer-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: .75rem;
      padding: 1rem;
      border: 1px solid var(--choir-line, #E9E8E1);
      border-radius: 12px;
    }
    .singer-information {
      display: grid;
      gap: .25rem;
      min-width: 0;
    }
    .singer-information span { overflow-wrap: anywhere; }
    .singer-inactive { background: #F5F3EF; }
    .singers-empty { padding: 1rem 0; }
    @media (max-width: 600px) {
      .singers-heading { align-items: stretch; }
      .singer-item { display: grid; }
      .singer-item .choir-actions { flex-wrap: wrap; }
    }
  `]
})
export class ChoirSingersComponent implements OnInit {
  @Input({ required: true }) choirId!: number;
  @Input() choirName = '';

  private readonly singersApi = inject(SingersApiService);
  private readonly singersStore = inject(SingersStore);
  private readonly sectionsApi = inject(VocalSectionsApiService);

  readonly singers = signal<Singer[]>([]);
  readonly sections = signal<VocalSection[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal<string | null>(null);
  readonly formError = signal<string | null>(null);
  readonly formOpen = signal(false);
  readonly editingId = signal<number | null>(null);
  readonly deactivationId = signal<number | null>(null);
  readonly form = signal<SingerForm>(emptyForm());

  ngOnInit(): void {
    this.load();
    this.loadSections();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.singersApi.list(this.choirId, true).subscribe({
      next: singers => {
        this.singers.set([...singers].sort((a, b) =>
          Number(b.active) - Number(a.active)
          || a.displayName.localeCompare(b.displayName)
        ));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('No pudimos cargar los integrantes. Revisá la conexión e intentá nuevamente.');
      }
    });
  }

  private loadSections(): void {
    this.sectionsApi.list(this.choirId).subscribe({
      next: sections => this.sections.set(sections),
      error: () => this.error.set('No pudimos cargar las secciones vocales del coro.')
    });
  }

  private refreshFormationRoster(): void {
    this.singersStore.loadSingers(this.choirId, true);
  }

  sectionName(sectionId: number | null): string {
    if (sectionId === null) return 'Sin sección vocal';
    return this.sections().find(section => section.id === sectionId)?.name
      ?? 'Sección no disponible';
  }

  beginCreate(): void {
    this.editingId.set(null);
    this.form.set(emptyForm());
    this.formError.set(null);
    this.success.set(null);
    this.formOpen.set(true);
  }

  beginEdit(singer: Singer): void {
    if (!singer.active) return;

    this.editingId.set(singer.id);
    this.form.set({
      displayName: singer.displayName,
      email: singer.email ?? '',
      voicePart: singer.voicePart ?? '',
      voiceSectionId: singer.voiceSectionId === null
        ? '' : String(singer.voiceSectionId),
      mobility: singer.mobility ?? '',
      restrictions: singer.restrictions ?? ''
    });
    this.formError.set(null);
    this.success.set(null);
    this.formOpen.set(true);
  }

  setField(field: keyof SingerForm, event: Event): void {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
    this.form.update(current => ({ ...current, [field]: value }));
    this.formError.set(null);
  }

  cancelForm(): void {
    this.formOpen.set(false);
    this.editingId.set(null);
    this.form.set(emptyForm());
    this.formError.set(null);
  }

  save(event: Event): void {
    event.preventDefault();

    const current = this.form();
    const displayName = current.displayName.trim();
    const email = current.email.trim();
    const voicePart = current.voicePart.trim();
    const mobility = current.mobility.trim();
    const restrictions = current.restrictions.trim();

    if (!displayName) {
      this.formError.set('El nombre del integrante es obligatorio.');
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.formError.set('Ingresá un email válido.');
      return;
    }

    const request: SingerRequest = {
      displayName,
      email: email || null,
      voicePart: voicePart || null,
      voiceSectionId: current.voiceSectionId
        ? Number(current.voiceSectionId) : null,
      mobility: mobility || null,
      restrictions: restrictions || null
    };

    const id = this.editingId();
    this.saving.set(true);
    this.formError.set(null);
    this.success.set(null);

    const operation = id === null
      ? this.singersApi.create(this.choirId, request)
      : this.singersApi.update(this.choirId, id, request);

    operation.subscribe({
      next: () => {
        this.saving.set(false);
        this.cancelForm();
        this.success.set(id === null
          ? 'Integrante agregado correctamente.'
          : 'Integrante actualizado correctamente.');
        this.refreshFormationRoster();
        this.load();
      },
      error: () => {
        this.saving.set(false);
        this.formError.set('No pudimos guardar los datos del integrante. Revisá la información e intentá nuevamente.');
      }
    });
  }

  deactivate(singer: Singer): void {
    if (!singer.active || this.deactivationId() !== singer.id) return;

    this.saving.set(true);
    this.error.set(null);

    this.singersApi.deactivate(this.choirId, singer.id).subscribe({
      next: () => {
        this.saving.set(false);
        this.deactivationId.set(null);
        this.success.set('Integrante dado de baja. Su historial se conserva.');
        this.refreshFormationRoster();
        this.load();
      },
      error: () => {
        this.saving.set(false);
        this.error.set('No pudimos dar de baja al integrante. Intentá nuevamente.');
      }
    });
  }

  reactivate(singer: Singer): void {
    if (singer.active) return;

    this.saving.set(true);
    this.error.set(null);

    this.singersApi.reactivate(this.choirId, singer.id).subscribe({
      next: () => {
        this.saving.set(false);
        this.success.set('Integrante reactivado correctamente.');
        this.refreshFormationRoster();
        this.load();
      },
      error: () => {
        this.saving.set(false);
        this.error.set('No pudimos reactivar al integrante. Intentá nuevamente.');
      }
    });
  }
}
