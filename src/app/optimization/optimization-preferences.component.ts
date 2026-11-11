import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  computed,
  inject,
  signal
} from '@angular/core';

import { OptimizationPreferencesApiService } from './optimization-preferences-api.service';
import {
  DEFAULT_OPTIMIZATION_PREFERENCES,
  OptimizationPreferences
} from './optimization-preferences.model';

@Component({
  selector: 'app-optimization-preferences',
  standalone: true,
  template: `
    <section class="preferences-panel" aria-labelledby="preferences-title">
      <div class="preferences-heading">
        <div>
          <span class="panel-kicker">CRITERIO ARTÍSTICO</span>
          <h2 id="preferences-title">Preferencias de optimización</h2>
          <p>Definí qué aspectos querés priorizar al evaluar alternativas para este concierto.</p>
        </div>
      </div>

      @if (loading()) {
        <p role="status">Cargando preferencias…</p>
      } @else if (loadError()) {
        <div class="preferences-error" role="alert">
          <p>{{ loadError() }}</p>
          <button class="button button-secondary" type="button" (click)="load()">
            Reintentar
          </button>
        </div>
      } @else {
        <form (submit)="save($event)">
          <div class="preferences-fields">
            <label>
              <span>Distancia y desplazamientos</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                required
                [value]="draft().distance"
                (input)="updateWeight('distance', $event)" />
            </label>

            <label>
              <span>Cruces de trayectorias</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                required
                [value]="draft().crossings"
                (input)="updateWeight('crossings', $event)" />
            </label>

            <label>
              <span>Compactación escénica</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                required
                [value]="draft().compactness"
                (input)="updateWeight('compactness', $event)" />
            </label>

            <label>
              <span>Continuidad de secciones</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                required
                [value]="draft().sectionContinuity"
                (input)="updateWeight('sectionContinuity', $event)" />
            </label>
          </div>

          <p
            class="preferences-total"
            [class.preferences-total-invalid]="total() !== 100"
            aria-live="polite">
            Total: <strong>{{ total() }} / 100</strong>
            @if (total() !== 100) {
              · Los valores deben sumar exactamente 100.
            }
          </p>

          @if (saveError()) {
            <p class="preferences-error" role="alert">{{ saveError() }}</p>
          }

          @if (saveSuccess()) {
            <p class="preferences-success" role="status">
              Preferencias guardadas correctamente.
            </p>
          }

          <button
            class="button button-primary"
            type="submit"
            [disabled]="!valid() || saving() || !hasChanges()">
            {{ saving() ? 'Guardando…' : 'Guardar preferencias' }}
          </button>
        </form>
      }
    </section>
  `,
  styles: [`
    :host { display: block; }

    .preferences-panel {
      display: grid;
      gap: 18px;
      margin-top: 20px;
      padding: 20px;
      border: 1px solid var(--line, #dedbd4);
      border-radius: 14px;
      background: var(--surface, #fff);
    }

    .preferences-heading h2 {
      margin: 5px 0;
      color: var(--ink);
      font-size: 19px;
    }

    .preferences-heading p {
      margin: 0;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.5;
    }

    .preferences-fields {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }

    .preferences-fields label {
      display: grid;
      gap: 7px;
      color: var(--ink);
      font-size: 13px;
      font-weight: 650;
    }

    .preferences-fields input {
      width: 100%;
      min-height: 42px;
      box-sizing: border-box;
      padding: 9px 11px;
      border: 1px solid var(--line, #dedbd4);
      border-radius: 8px;
      background: var(--surface, #fff);
      color: var(--ink);
      font: inherit;
    }

    .preferences-total {
      margin: 14px 0;
      color: var(--muted);
      font-size: 13px;
    }

    .preferences-total-invalid,
    .preferences-error {
      color: var(--danger, #a52b2b);
    }

    .preferences-success {
      color: var(--success, #28734a);
    }

    .preferences-error,
    .preferences-success {
      font-size: 13px;
    }

    @media (max-width: 560px) {
      .preferences-fields {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class OptimizationPreferencesComponent implements OnChanges {
  @Input({ required: true }) choirId!: number;
  @Input({ required: true }) concertId!: number;

  private readonly api = inject(OptimizationPreferencesApiService);

  readonly draft = signal<OptimizationPreferences>({
    ...DEFAULT_OPTIMIZATION_PREFERENCES
  });
  readonly confirmed = signal<OptimizationPreferences | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly saveError = signal<string | null>(null);
  readonly saveSuccess = signal(false);

  readonly total = computed(() => {
    const value = this.draft();
    return value.distance + value.crossings
      + value.compactness + value.sectionContinuity;
  });

  readonly valid = computed(() => {
    const value = this.draft();
    const weights = [
      value.distance,
      value.crossings,
      value.compactness,
      value.sectionContinuity
    ];

    return weights.every(weight =>
      Number.isInteger(weight) && weight >= 0 && weight <= 100
    ) && this.total() === 100;
  });

  readonly hasChanges = computed(() => {
    const confirmed = this.confirmed();
    const draft = this.draft();

    return confirmed !== null && (
      confirmed.distance !== draft.distance
      || confirmed.crossings !== draft.crossings
      || confirmed.compactness !== draft.compactness
      || confirmed.sectionContinuity !== draft.sectionContinuity
    );
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['choirId'] || changes['concertId']) {
      if (this.choirId > 0 && this.concertId > 0) {
        this.load();
      }
    }
  }

  load(): void {
    this.loading.set(true);
    this.loadError.set(null);
    this.saveError.set(null);
    this.saveSuccess.set(false);

    this.api.get(this.choirId, this.concertId).subscribe({
      next: preferences => {
        const value = { ...preferences };
        this.draft.set(value);
        this.confirmed.set(value);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.loadError.set(
          'No pudimos cargar las preferencias de este concierto.'
        );
      }
    });
  }

  updateWeight(
    key: keyof OptimizationPreferences,
    event: Event
  ): void {
    const rawValue = (event.target as HTMLInputElement).value;
    const value = rawValue === '' ? 0 : Number(rawValue);

    this.draft.update(current => ({
      ...current,
      [key]: value
    }));
    this.saveError.set(null);
    this.saveSuccess.set(false);
  }

  save(event: Event): void {
    event.preventDefault();

    if (!this.valid() || this.saving() || !this.hasChanges()) {
      return;
    }

    this.saving.set(true);
    this.saveError.set(null);
    this.saveSuccess.set(false);

    const request = { ...this.draft() };

    this.api.update(this.choirId, this.concertId, request).subscribe({
      next: saved => {
        const value = { ...saved };
        this.draft.set(value);
        this.confirmed.set(value);
        this.saving.set(false);
        this.saveSuccess.set(true);
      },
      error: () => {
        this.saving.set(false);
        this.saveError.set(
          'No pudimos guardar las preferencias. Tus últimos valores confirmados se mantienen.'
        );
      }
    });
  }
}
