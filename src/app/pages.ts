import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Choir } from './choirs/choir.model';
import { ChoirsApiService } from './choirs/choirs-api.service';
import { SingersStore } from './singers/singers.store';
import { FormationDraftsApiService } from './formations/formation-drafts-api.service';
import {
  Concert,
  ConcertRepertoireEntry,
  FormationDraft,
  FormationSummary
} from './formations/formation-draft.model';

function getSectionHue(key: string): number {
  let hash = 0;

  for (let index = 0; index < key.length; index++) {
    hash = (hash * 31 + key.charCodeAt(index)) >>> 0;
  }

  return hash % 360;
}


@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow"><span class="status-dot"></span> PARA DIRECTORES DE CORO</span>
        <h1>Cada voz importa.<br><span>Cada detalle también.</span></h1>
        <p class="hero-description">
          Organizá tu coro, planificá conciertos y prepará formaciones
          con una herramienta pensada para las decisiones reales de dirección.
        </p>
        <div class="hero-actions">
          <a class="button button-primary" routerLink="/registro">Comenzar <span>↗</span></a>
          <a class="button button-secondary" routerLink="/app/coro">Explorar la plataforma</a>
        </div>
        <p class="hero-note">Un espacio de trabajo para organizar tu próximo ensayo.</p>
      </div>

      <div class="hero-art" aria-label="Ilustración abstracta de voces y música">
        <div class="art-orbit orbit-one"></div>
        <div class="art-orbit orbit-two"></div>
        <div class="art-center">
          <span class="art-symbol">♫</span>
          <span class="art-caption">ARMONÍA<br>EN MOVIMIENTO</span>
        </div>
        <span class="voice voice-one">S</span>
        <span class="voice voice-two">A</span>
        <span class="voice voice-three">T</span>
        <span class="voice voice-four">B</span>
        <div class="art-label"><span class="status-dot"></span> Tu música, mejor organizada</div>
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <div>
          <span class="eyebrow">TU ESPACIO DE TRABAJO</span>
          <h2>Todo conectado.<br>Vos tomás las decisiones.</h2>
        </div>
        <p>La planificación acompaña tu criterio musical, no lo reemplaza.</p>
      </div>

      <div class="feature-grid">
        <a class="feature-card" routerLink="/app/coro">
          <span class="feature-number">01 / CORO</span>
          <span class="feature-icon">♬</span>
          <h3>Tu coro</h3>
          <p>Consultá y organizá la información de tu agrupación.</p>
          <span class="feature-link">Ver espacio <span>↗</span></span>
        </a>
        <a class="feature-card" routerLink="/app/conciertos">
          <span class="feature-number">02 / PLANIFICACIÓN</span>
          <span class="feature-icon">◷</span>
          <h3>Conciertos</h3>
          <p>Prepará las actividades y reuní la información de cada presentación.</p>
          <span class="feature-link">Ver conciertos <span>↗</span></span>
        </a>
        <a class="feature-card" routerLink="/app/formaciones">
          <span class="feature-number">03 / ESCENA</span>
          <span class="feature-icon">⌘</span>
          <h3>Formaciones</h3>
          <p>Prepará la distribución de cantantes y dejá espacio para diseñar la escena.</p>
          <span class="feature-link">Ver formaciones <span>↗</span></span>
        </a>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class HomePage {}

@Component({
  standalone: true,
  template: `
    <section class="page-wrap narrow-page">
      <a class="back-link" href="/" aria-label="Volver al inicio">← Volver al inicio</a>
      <span class="eyebrow">ACCESO DE DIRECTORES</span>
      <h1>Bienvenido de nuevo.</h1>
      <p class="page-lead">Ingresá a tu espacio de dirección.</p>
      <div class="notice-card">
        <span class="notice-icon">↗</span>
        <div>
          <h2>Acceso en preparación</h2>
          <p>La pantalla está preparada como punto de entrada. La autenticación y la verificación de credenciales deben integrarse con el backend antes de habilitar el acceso real.</p>
        </div>
      </div>
      <a class="button button-primary full-button" href="/">Volver al inicio</a>
    </section>
  `
})
export class LoginPage {}

@Component({
  standalone: true,
  template: `
    <section class="page-wrap narrow-page">
      <a class="back-link" href="/">← Volver al inicio</a>
      <span class="eyebrow">NUEVO ESPACIO DE DIRECCIÓN</span>
      <h1>Empezá a organizar tu coro.</h1>
      <p class="page-lead">Un espacio pensado para que la planificación musical y la organización convivan.</p>
      <div class="notice-card">
        <span class="notice-icon">＋</span>
        <div>
          <h2>Registro en preparación</h2>
          <p>El formulario de alta se incorporará cuando estén definidos e integrados los flujos de registro, verificación de correo y autenticación.</p>
        </div>
      </div>
      <a class="button button-primary full-button" href="/ingresar">Ir a ingresar</a>
    </section>
  `
})
export class RegisterPage {}

@Component({
  standalone: true,
  template: `
    <section class="page-wrap">
      <span class="eyebrow">ESPACIO DE DIRECCIÓN / 01</span>
      <div class="page-heading">
        <div>
          <h1>Mi coro</h1>
          <p class="page-lead">La información central de tu agrupación, en un solo lugar.</p>
        </div>
        <span class="pill-status">MÓDULO EN PREPARACIÓN</span>
      </div>
      <div class="dashboard-grid">
        <article class="panel panel-large">
          <span class="panel-kicker">AGRUPACIÓN</span>
          <div class="empty-illustration">♫</div>
          <h2>Tu próximo capítulo empieza acá.</h2>
          <p>Este espacio reunirá los datos del coro, sus integrantes y la información necesaria para organizar el trabajo.</p>
          <span class="muted-label">Los datos se mostrarán cuando se integre la API.</span>
        </article>
        <article class="panel">
          <span class="panel-kicker">ACCESO RÁPIDO</span>
          <h2>Seguí planificando</h2>
          <a class="quick-link" href="/app/conciertos">Conciertos <span>↗</span></a>
          <a class="quick-link" href="/app/formaciones">Formaciones <span>↗</span></a>
        </article>
      </div>
    </section>
  `
})
export class ChoirPage {}

@Component({
  standalone: true,
  template: `
    <section class="page-wrap">
      <span class="eyebrow">ESPACIO DE DIRECCIÓN / 02</span>
      <div class="page-heading">
        <div>
          <h1>Conciertos</h1>
          <p class="page-lead">Prepará tus presentaciones con la información que necesitás.</p>
        </div>
        <span class="pill-status">MÓDULO EN PREPARACIÓN</span>
      </div>
      <div class="panel empty-state">
        <span class="empty-illustration">◷</span>
        <h2>Tu próxima presentación</h2>
        <p>Acá vas a poder consultar y organizar los conciertos de tu coro. La lista, los detalles y las acciones estarán conectados al backend.</p>
        <span class="muted-label">Todavía no hay datos conectados.</span>
      </div>
    </section>
  `
})
export class ConcertsPage {}

@Component({
  standalone: true,
  template: `
    <section class="page-wrap">
      <span class="eyebrow">ESPACIO DE DIRECCIÓN / 03</span>
      <div class="page-heading">
        <div>
          <h1>Formaciones</h1>
          <p class="page-lead">
            Elegí el coro para consultar su elenco y preparar la distribución escénica.
          </p>
        </div>
        <span class="pill-status">EDITOR EN DESARROLLO</span>
      </div>

      @if (choirsLoading()) {
        <div class="panel" role="status">
          <h2>Cargando tus coros…</h2>
        </div>
      } @else if (choirsError()) {
        <div class="panel" role="alert">
          <h2>No pudimos cargar tus coros.</h2>
          <p>Revisá la conexión e intentá nuevamente.</p>
          <button class="button button-primary" type="button" (click)="loadChoirs()">
            Reintentar
          </button>
        </div>
      } @else if (choirs().length === 0) {
        <div class="panel empty-state">
          <span class="empty-illustration">♫</span>
          <h2>Todavía no tenés coros disponibles.</h2>
          <p>Cuando tengas un coro asociado a tu cuenta, vas a poder consultar su elenco acá.</p>
        </div>
      } @else {
        <section class="panel choir-selector">
          <label for="choir-selector">Coro</label>
          <select
            id="choir-selector"
            [value]="selectedChoirId() ?? ''"
            (change)="selectChoir($event)">
            <option value="" disabled>Elegí un coro</option>
            @for (choir of choirs(); track choir.id) {
              <option [value]="choir.id">{{ choir.name }}</option>
            }
          </select>
        </section>
      }

      @if (selectedChoirId() !== null && !choirsLoading() && !choirsError()) {
        <section class="panel formation-workflow">
          <span class="panel-kicker">PLANIFICACIÓN ESCÉNICA</span>
          <h2>Elegir qué formación editar</h2>

          <div class="formation-selectors">
            <label>
              Concierto
              <select
                aria-label="Concierto"
                [value]="selectedConcertId() ?? ''"
                [disabled]="concertsLoading() || concerts().length === 0"
                (change)="selectConcert($event)">
                <option value="">Elegí un concierto</option>
                @for (concert of concerts(); track concert.id) {
                  <option [value]="concert.id">
                    {{ concert.title }} · {{ concert.concertDate }}
                  </option>
                }
              </select>
            </label>

            <label>
              Obra del repertorio
              <select
                aria-label="Obra del repertorio"
                [value]="selectedRepertoireItemId() ?? ''"
                [disabled]="!selectedConcertId() || repertoireLoading() || repertoire().length === 0"
                (change)="selectRepertoireItem($event)">
                <option value="">Elegí una obra</option>
                @for (entry of repertoire(); track entry.repertoireItemId) {
                  <option [value]="entry.repertoireItemId">
                    {{ entry.title }}
                  </option>
                }
              </select>
            </label>

            <label>
              Formación
              <select
                aria-label="Formación"
                [value]="selectedFormationId() ?? ''"
                [disabled]="!selectedRepertoireItemId() || formationsLoading() || formations().length === 0"
                (change)="selectFormation($event)">
                <option value="">Elegí una formación</option>
                @for (formation of formations(); track formation.id) {
                  <option [value]="formation.id">{{ formation.name }}</option>
                }
              </select>
            </label>
          </div>

          @if (concertsLoading() || repertoireLoading() || formationsLoading() || draftLoading()) {
            <p role="status">Cargando datos de planificación…</p>
          }

          @if (workflowError()) {
            <div role="alert" class="formation-workflow-error">
              <p>{{ workflowError() }}</p>
              <button
                class="button button-secondary"
                type="button"
                (click)="retryWorkflow()">Reintentar</button>
            </div>
          }

          @if (selectedChoirId() !== null && !concertsLoading() && !workflowError() && concerts().length === 0) {
            <p>No hay conciertos disponibles para este coro.</p>
          }

          @if (selectedConcertId() !== null && !repertoireLoading() && repertoire().length === 0) {
            <p>Este concierto no tiene obras de repertorio disponibles.</p>
          }

          @if (selectedRepertoireItemId() !== null && !formationsLoading() && formations().length === 0) {
            <p>Esta obra todavía no tiene formaciones guardadas.</p>
          }

          @if (selectedDraft(); as draft) {
            <p>
              Editando <strong>{{ draft.name }}</strong>
              · versión {{ draft.versionNumber }}
              · estado {{ draft.status }}
            </p>
          }

          @if (saveError()) {
            <p role="alert">{{ saveError() }}</p>
          }

          @if (saveSuccess()) {
            <p role="status">Las posiciones se guardaron correctamente.</p>
          }

          <button
            class="button button-primary"
            type="button"
            [disabled]="!canSaveDraft() || savingDraft() || draftLoading()"
            (click)="savePositions()">
            {{ savingDraft() ? 'Guardando posiciones…' : 'Guardar posiciones' }}
          </button>
        </section>
      }

      <div class="formation-layout">
        <article class="panel formation-panel">
          <div class="formation-toolbar">
            <div>
              <span class="panel-kicker">VISTA PREVIA DEL ESCENARIO</span>
              <h2>{{ selectedChoirName() || 'Escenario' }}</h2>
            </div>
            <span class="stage-tag">ESCENARIO</span>
          </div>

          <div
            class="stage"
            aria-label="Vista previa del escenario"
            [attr.aria-busy]="choirsLoading() || (selectedChoirId() !== null && singersStore.loadingByChoir()[choirKey()])">
            <div class="stage-back"></div>

            <div
              class="stage-director"
              role="img"
              [attr.aria-label]="'Director del coro: ' + (auth.currentDirector()?.displayName || 'sin sesión identificada')">
              <span class="stage-director-avatar" aria-hidden="true">{{ auth.currentDirector()?.displayName?.trim()?.charAt(0)?.toLocaleUpperCase() || 'D' }}</span>
              <span class="stage-director-label">Dirección</span>
              @if (auth.currentDirector(); as director) {
                <span class="stage-director-name">{{ director.displayName }}</span>
              }
            </div>

            @if (choirsLoading() || (selectedChoirId() !== null && singersStore.loadingByChoir()[choirKey()])) {
              <div
                class="stage-skeleton"
                role="status"
                aria-label="Cargando vista previa del escenario"
                aria-busy="true">
                <div class="stage-skeleton-grid" aria-hidden="true">
                  @for (placeholder of [1, 2, 3, 4, 5, 6, 7, 8]; track placeholder) {
                    <span class="stage-skeleton-person">
                      <span class="stage-skeleton-avatar"></span>
                      <span class="stage-skeleton-line"></span>
                    </span>
                  }
                </div>
              </div>
            } @else if (
              selectedChoirId() !== null &&
              singersStore.errorsByChoir()[choirKey()]
            ) {
              <div class="stage-error" role="alert">
                <p>No pudimos cargar el elenco.</p>
                <button
                  class="button button-primary"
                  type="button"
                  (click)="retrySingers()">Reintentar</button>
              </div>
            } @else {
              @if (stageSingers().length === 0) {
                <div class="stage-empty">
                  <span>♪</span>
                  <p>Agregá integrantes al elenco para preparar la distribución escénica.</p>
                </div>
              } @else {
                <div class="stage-people" aria-label="Integrantes posicionados en el escenario">
                  @for (person of stageSingers(); track person.id) {
                    <button
                      type="button"
                      class="stage-person"
                      [class.stage-person-dragging]="dragSession()?.singerId === person.id"
                      [style.left.%]="person.x"
                      [style.top.%]="person.y"
                      [style.--section-hue]="person.sectionHue"
                      [attr.aria-label]="person.displayName + ', ' + person.sectionLabel + '. Arrastrar para cambiar la posición.'"
                      (pointerdown)="startDrag($event, person.id)"
                      (pointermove)="moveSinger($event)"
                      (pointerup)="endDrag($event)"
                      (pointercancel)="endDrag($event)"
                      (lostpointercapture)="endDrag($event)">
                      <span class="stage-person-avatar" aria-hidden="true">{{ person.displayName.charAt(0).toUpperCase() }}</span>
                      <span class="stage-person-name">{{ person.displayName }}</span>
                      <span class="stage-person-section">{{ person.sectionLabel }}</span>
                    </button>
                  }
                </div>
              }
            }

            <div class="stage-front"></div>
          </div>
        </article>

        <aside class="panel formation-details">
          <span class="panel-kicker">ELENCO DEL CORO</span>
          <h2>Integrantes</h2>
          @if (selectedChoirId() === null) {
            <p>Elegí un coro para consultar su elenco.</p>
          } @else if (singersStore.loadingByChoir()[choirKey()]) {
            <div
              class="singer-list-skeleton"
              role="status"
              aria-label="Cargando elenco"
              aria-busy="true">
              <span class="singer-skeleton-row" aria-hidden="true">
                <span class="singer-skeleton-avatar"></span>
                <span class="singer-skeleton-copy">
                  <span class="skeleton-line skeleton-line-primary"></span>
                  <span class="skeleton-line skeleton-line-secondary"></span>
                </span>
              </span>
              <span class="singer-skeleton-row" aria-hidden="true">
                <span class="singer-skeleton-avatar"></span>
                <span class="singer-skeleton-copy">
                  <span class="skeleton-line skeleton-line-primary"></span>
                  <span class="skeleton-line skeleton-line-secondary"></span>
                </span>
              </span>
              <span class="singer-skeleton-row" aria-hidden="true">
                <span class="singer-skeleton-avatar"></span>
                <span class="singer-skeleton-copy">
                  <span class="skeleton-line skeleton-line-primary"></span>
                  <span class="skeleton-line skeleton-line-secondary"></span>
                </span>
              </span>
              <span class="singer-skeleton-row" aria-hidden="true">
                <span class="singer-skeleton-avatar"></span>
                <span class="singer-skeleton-copy">
                  <span class="skeleton-line skeleton-line-primary"></span>
                  <span class="skeleton-line skeleton-line-secondary"></span>
                </span>
              </span>
              <span class="singer-skeleton-row" aria-hidden="true">
                <span class="singer-skeleton-avatar"></span>
                <span class="singer-skeleton-copy">
                  <span class="skeleton-line skeleton-line-primary"></span>
                  <span class="skeleton-line skeleton-line-secondary"></span>
                </span>
              </span>
            </div>
          } @else if (singersStore.errorsByChoir()[choirKey()]) {
            <p role="alert">{{ singersStore.errorsByChoir()[choirKey()] }}</p>
            <button
              class="button button-primary"
              type="button"
              (click)="retrySingers()">Reintentar</button>
          } @else {
            <p>
              {{ selectedSingers().length }}
              {{ selectedSingers().length === 1 ? 'integrante cargado' : 'integrantes cargados' }}.
            </p>
            @if (selectedSingers().length === 0) {
              <p class="muted-label">Este coro no tiene integrantes activos para mostrar.</p>
            } @else {
              <ul class="singer-list">
                @for (singer of selectedSingers(); track singer.id) {
                  <li>
                    <strong>{{ singer.displayName }}</strong>
                    <span>{{ singer.voicePart || 'Voz sin especificar' }}</span>
                  </li>
                }
              </ul>
            }
          }
          <p class="muted-label">
            Las voces se muestran según los datos del backend; no se presupone un catálogo fijo.
          </p>
        </aside>
      </div>
    </section>
  `,
  styles: [`
.stage-director {
  position: absolute;
  z-index: 2;
  top: 5%;
  left: 50%;
  display: grid;
  justify-items: center;
  gap: 3px;
  width: 76px;
  transform: translateX(-50%);
  pointer-events: none;
  user-select: none;
}

.stage-director-avatar {
  display: grid;
  place-items: center;
  width: 31px;
  height: 31px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  background: var(--ink);
  color: white;
  font-size: 13px;
  font-weight: 800;
}

.stage-director-label {
  padding: 2px 5px;
  border-radius: 4px;
  background: var(--ink);
  color: white;
  font-size: 9px;
  font-weight: 750;
}

.stage-director-name {
  max-width: 110px;
  overflow: hidden;
  color: var(--ink);
  font-size: 9px;
  font-weight: 750;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stage-people {
  position: absolute;
  inset: 12px 8px;
}

.stage-person {
  position: absolute;
  display: grid;
  justify-items: center;
  gap: 3px;
  width: 86px;
  padding: 5px 3px;
  border: 1px solid hsl(var(--section-hue) 42% 65%);
  border-radius: 12px;
  background: hsl(var(--section-hue) 65% 96%);
  color: var(--ink);
  box-shadow: 0 3px 9px #29271b12;
  transform: translate(-50%, -50%);
  cursor: grab;
  touch-action: none;
  user-select: none;
  z-index: 1;
}

.stage-person:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

.stage-person-dragging {
  z-index: 5;
  cursor: grabbing;
  box-shadow: 0 8px 20px #29271b24;
}

.stage-person-avatar {
  display: grid;
  place-items: center;
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background: hsl(var(--section-hue) 68% 84%);
  color: hsl(var(--section-hue) 52% 28%);
  font-size: 13px;
  font-weight: 800;
}

.stage-person-name {
  max-width: 100%;
  overflow: hidden;
  color: var(--ink);
  font-size: 10px;
  font-weight: 750;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stage-person-section {
  max-width: 100%;
  overflow: hidden;
  color: hsl(var(--section-hue) 48% 30%);
  font-size: 9px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stage-error {
  display: grid;
  justify-items: center;
  gap: 8px;
  max-width: 280px;
  padding: 20px;
  text-align: center;
}

.stage-error p {
  margin: 0;
  color: #a12c2c;
  font-size: 12px;
  line-height: 1.6;
}

.stage-empty {
  display: grid;
  justify-items: center;
  gap: 10px;
  max-width: 240px;
  padding: 20px;
  color: var(--muted);
  text-align: center;
}

.stage-empty > span {
  color: var(--accent);
  font-family: Georgia, serif;
  font-size: 34px;
}

.stage-empty p {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
}

@media (max-width: 560px) {
  .stage-person {
    width: 70px;
    padding: 4px 2px;
  }

  .stage-person-avatar {
    width: 27px;
    height: 27px;
  }

  .stage-person-name { font-size: 9px; }
  .stage-person-section { font-size: 8px; }
}
  `]
})
export class FormationsPage {
  readonly auth = inject(AuthService);
  private readonly choirsApi = inject(ChoirsApiService);
  private readonly formationDraftsApi = inject(FormationDraftsApiService);
  readonly singersStore = inject(SingersStore);

  readonly concerts = signal<Concert[]>([]);
  readonly repertoire = signal<ConcertRepertoireEntry[]>([]);
  readonly formations = signal<FormationSummary[]>([]);
  readonly selectedConcertId = signal<number | null>(null);
  readonly selectedRepertoireItemId = signal<number | null>(null);
  readonly selectedFormationId = signal<number | null>(null);
  readonly selectedDraft = signal<FormationDraft | null>(null);

  readonly concertsLoading = signal(false);
  readonly repertoireLoading = signal(false);
  readonly formationsLoading = signal(false);
  readonly draftLoading = signal(false);
  readonly savingDraft = signal(false);
  readonly workflowError = signal<string | null>(null);
  readonly saveError = signal<string | null>(null);
  readonly saveSuccess = signal(false);

  readonly canSaveDraft = computed(
    () => this.selectedDraft() !== null
      && this.selectedFormationId() !== null
      && this.selectedConcertId() !== null
      && this.selectedRepertoireItemId() !== null
      && this.selectedChoirId() !== null
  );

  readonly choirs = signal<Choir[]>([]);
  readonly choirsLoading = signal(true);
  readonly choirsError = signal(false);
  readonly selectedChoirId = signal<number | null>(null);

  readonly choirKey = computed(() => String(this.selectedChoirId() ?? ''));
  readonly selectedChoirName = computed(
    () => this.choirs().find(choir => choir.id === this.selectedChoirId())?.name ?? ''
  );
  readonly selectedSingers = computed(
    () => this.singersStore.singersByChoir()[this.choirKey()] ?? []
  );

  readonly singerPositions = signal<Record<number, { x: number; y: number }>>({});
  readonly dragSession = signal<{
    singerId: number;
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  readonly stageSingers = computed(() => {
    const singers = this.selectedSingers();
    const positions = this.singerPositions();
    const groups = new Map<string, (typeof singers)[number][]>();

    for (const singer of singers) {
      const voicePart = singer.voicePart?.trim().toLocaleLowerCase() || '';
      const key = singer.voiceSectionId !== null
        ? `section:${singer.voiceSectionId}`
        : `voice:${voicePart || 'unknown'}`;
      const group = groups.get(key) ?? [];
      group.push(singer);
      groups.set(key, group);
    }

    const groupEntries = Array.from(groups.entries());
    const groupColumns = Math.min(
      3,
      Math.max(1, Math.ceil(Math.sqrt(groupEntries.length)))
    );
    const groupRows = Math.ceil(groupEntries.length / groupColumns);
    const cellWidth = 76 / groupColumns;
    const cellHeight = 64 / groupRows;
    const initialPositions = new Map<number, { x: number; y: number }>();

    groupEntries.forEach(([, members], groupIndex) => {
      const groupRow = Math.floor(groupIndex / groupColumns);
      const groupColumn = groupIndex % groupColumns;
      const memberColumns = Math.min(
        3,
        Math.max(1, Math.ceil(Math.sqrt(members.length)))
      );
      const memberRows = Math.ceil(members.length / memberColumns);

      members.forEach((singer, memberIndex) => {
        const row = Math.floor(memberIndex / memberColumns);
        const column = memberIndex % memberColumns;
        const rowLength = Math.min(
          memberColumns,
          members.length - row * memberColumns
        );

        initialPositions.set(singer.id, {
          x: 12 + groupColumn * cellWidth
            + (column + 0.5) * cellWidth / rowLength,
          y: 18 + groupRow * cellHeight
            + (row + 0.5) * cellHeight / memberRows
        });
      });
    });

    return singers.map((singer) => {
      const initial = initialPositions.get(singer.id)!;
      const position = positions[singer.id];
      const sectionLabel = singer.voicePart?.trim()
        || 'Sección sin especificar';
      const sectionKey = singer.voiceSectionId !== null
        ? `section:${singer.voiceSectionId}`
        : `voice:${singer.voicePart?.trim().toLocaleLowerCase() || 'unknown'}`;

      return {
        ...singer,
        x: position?.x ?? initial.x,
        y: position?.y ?? initial.y,
        sectionLabel,
        sectionHue: getSectionHue(sectionKey)
      };
    });
  });

  constructor() {
    this.loadChoirs();
  }

  loadChoirs(): void {
    this.choirsLoading.set(true);
    this.choirsError.set(false);

    this.choirsApi.list().subscribe({
      next: choirs => {
        this.choirs.set(choirs);
        this.choirsLoading.set(false);

        const currentId = this.selectedChoirId();
        if (currentId !== null && choirs.some(choir => choir.id === currentId)) {
          this.singersStore.loadSingers(currentId);
        } else if (choirs.length === 1) {
          this.chooseChoir(choirs[0].id);
        } else {
          this.selectedChoirId.set(null);
        }
      },
      error: () => {
        this.choirsError.set(true);
        this.choirsLoading.set(false);
      }
    });
  }

  selectChoir(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const choirId = Number(value);

    if (!Number.isSafeInteger(choirId) || choirId <= 0) {
      this.selectedChoirId.set(null);
      this.resetWorkflow();
      return;
    }

    this.chooseChoir(choirId);
  }

  selectConcert(event: Event): void {
    const concertId = this.parseSelection(event);
    this.selectedConcertId.set(concertId);
    this.selectedRepertoireItemId.set(null);
    this.selectedFormationId.set(null);
    this.selectedDraft.set(null);
    this.repertoireLoading.set(false);
    this.formationsLoading.set(false);
    this.draftLoading.set(false);
    this.savingDraft.set(false);
    this.repertoire.set([]);
    this.formations.set([]);
    this.singerPositions.set({});
    this.clearWorkflowMessages();

    const choirId = this.selectedChoirId();
    if (choirId === null || concertId === null) {
      return;
    }

    this.repertoireLoading.set(true);
    this.formationDraftsApi.listConcertRepertoire(choirId, concertId)
      .subscribe({
        next: entries => {
          if (this.selectedChoirId() !== choirId
            || this.selectedConcertId() !== concertId) {
            return;
          }
          this.repertoire.set(entries);
          this.repertoireLoading.set(false);
        },
        error: () => {
          if (this.selectedChoirId() !== choirId
            || this.selectedConcertId() !== concertId) {
            return;
          }
          this.repertoireLoading.set(false);
          this.workflowError.set('No se pudo cargar el repertorio del concierto.');
        }
      });
  }

  selectRepertoireItem(event: Event): void {
    const repertoireItemId = this.parseSelection(event);
    this.selectedRepertoireItemId.set(repertoireItemId);
    this.selectedFormationId.set(null);
    this.selectedDraft.set(null);
    this.formationsLoading.set(false);
    this.draftLoading.set(false);
    this.savingDraft.set(false);
    this.formations.set([]);
    this.singerPositions.set({});
    this.clearWorkflowMessages();

    const choirId = this.selectedChoirId();
    const concertId = this.selectedConcertId();

    if (choirId === null || concertId === null || repertoireItemId === null) {
      return;
    }

    this.formationsLoading.set(true);
    this.formationDraftsApi.listFormations(
      choirId, concertId, repertoireItemId
    ).subscribe({
      next: formations => {
        if (this.selectedChoirId() !== choirId
          || this.selectedConcertId() !== concertId
          || this.selectedRepertoireItemId() !== repertoireItemId) {
          return;
        }
        this.formations.set(formations);
        this.formationsLoading.set(false);
      },
      error: () => {
        if (this.selectedChoirId() !== choirId
          || this.selectedConcertId() !== concertId
          || this.selectedRepertoireItemId() !== repertoireItemId) {
          return;
        }
        this.formationsLoading.set(false);
        this.workflowError.set('No se pudieron cargar las formaciones de esta obra.');
      }
    });
  }

  selectFormation(event: Event): void {
    const formationId = this.parseSelection(event);
    this.selectedFormationId.set(formationId);
    this.selectedDraft.set(null);
    this.draftLoading.set(false);
    this.savingDraft.set(false);
    this.singerPositions.set({});
    this.clearWorkflowMessages();

    const choirId = this.selectedChoirId();
    const concertId = this.selectedConcertId();
    const repertoireItemId = this.selectedRepertoireItemId();

    if (choirId === null || concertId === null
      || repertoireItemId === null || formationId === null) {
      return;
    }

    this.loadSelectedDraft(
      choirId, concertId, repertoireItemId, formationId
    );
  }

  savePositions(): void {
    const choirId = this.selectedChoirId();
    const concertId = this.selectedConcertId();
    const repertoireItemId = this.selectedRepertoireItemId();
    const formationId = this.selectedFormationId();
    const draft = this.selectedDraft();

    if (choirId === null || concertId === null
      || repertoireItemId === null || formationId === null || draft === null
      || this.savingDraft()) {
      return;
    }

    const request = {
      positions: this.stageSingers().map(person => ({
        singerId: person.id,
        x: person.x,
        y: person.y
      }))
    };

    this.savingDraft.set(true);
    this.saveError.set(null);
    this.saveSuccess.set(false);

    this.formationDraftsApi.saveDraftPositions(
      choirId,
      concertId,
      repertoireItemId,
      formationId,
      draft.draftVersionId,
      request
    ).subscribe({
      next: savedDraft => {
        if (this.selectedChoirId() !== choirId
          || this.selectedConcertId() !== concertId
          || this.selectedRepertoireItemId() !== repertoireItemId
          || this.selectedFormationId() !== formationId) {
          return;
        }

        this.selectedDraft.set(savedDraft);
        this.applyDraftPositions(savedDraft);
        this.savingDraft.set(false);
        this.saveSuccess.set(true);
      },
      error: () => {
        if (this.selectedChoirId() !== choirId
          || this.selectedConcertId() !== concertId
          || this.selectedRepertoireItemId() !== repertoireItemId
          || this.selectedFormationId() !== formationId) {
          return;
        }

        this.savingDraft.set(false);
        this.saveError.set(
          'No se pudieron guardar las posiciones. Tus cambios siguen en pantalla; podés reintentar.'
        );
      }
    });
  }

  retryWorkflow(): void {
    this.workflowError.set(null);

    const choirId = this.selectedChoirId();
    const concertId = this.selectedConcertId();
    const repertoireItemId = this.selectedRepertoireItemId();
    const formationId = this.selectedFormationId();

    if (choirId === null) {
      return;
    }

    if (concertId === null) {
      this.loadConcerts(choirId);
    } else if (repertoireItemId === null) {
      this.selectConcert({
        target: { value: String(concertId) }
      } as unknown as Event);
    } else if (formationId === null) {
      this.selectRepertoireItem({
        target: { value: String(repertoireItemId) }
      } as unknown as Event);
    } else {
      this.loadSelectedDraft(
        choirId, concertId, repertoireItemId, formationId
      );
    }
  }

  retrySingers(): void {
    const choirId = this.selectedChoirId();
    if (choirId !== null) {
      this.singersStore.loadSingers(choirId, true);
    }
  }

  startDrag(event: PointerEvent, singerId: number): void {
    const person = this.stageSingers().find((singer) => singer.id === singerId);
    const stage = (event.currentTarget as HTMLElement).closest('.stage');

    if (!person || !(stage instanceof HTMLElement)) {
      return;
    }

    event.preventDefault();
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);

    this.dragSession.set({
      singerId,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: person.x,
      originY: person.y
    });
  }

  moveSinger(event: PointerEvent): void {
    const drag = this.dragSession();

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const stage = (event.currentTarget as HTMLElement).closest('.stage');

    if (!(stage instanceof HTMLElement)) {
      return;
    }

    const bounds = stage.getBoundingClientRect();

    if (bounds.width <= 0 || bounds.height <= 0) {
      return;
    }

    const x = Math.max(5, Math.min(95,
      drag.originX + (event.clientX - drag.startX) / bounds.width * 100));
    const y = Math.max(8, Math.min(92,
      drag.originY + (event.clientY - drag.startY) / bounds.height * 100));

    this.singerPositions.update((positions) => ({
      ...positions,
      [drag.singerId]: { x, y }
    }));
  }

  endDrag(event: PointerEvent): void {
    const drag = this.dragSession();

    if (drag && drag.pointerId === event.pointerId) {
      this.dragSession.set(null);
    }
  }

  private chooseChoir(choirId: number): void {
    this.selectedChoirId.set(choirId);
    this.resetWorkflow();
    this.singersStore.loadSingers(choirId);
    this.loadConcerts(choirId);
  }

  private loadConcerts(choirId: number): void {
    this.concertsLoading.set(true);
    this.workflowError.set(null);

    this.formationDraftsApi.listConcerts(choirId).subscribe({
      next: concerts => {
        if (this.selectedChoirId() !== choirId) {
          return;
        }
        this.concerts.set(concerts);
        this.concertsLoading.set(false);
      },
      error: () => {
        if (this.selectedChoirId() !== choirId) {
          return;
        }
        this.concertsLoading.set(false);
        this.workflowError.set('No se pudieron cargar los conciertos del coro.');
      }
    });
  }

  private loadSelectedDraft(
    choirId: number,
    concertId: number,
    repertoireItemId: number,
    formationId: number
  ): void {
    this.draftLoading.set(true);

    this.formationDraftsApi.getDraft(
      choirId, concertId, repertoireItemId, formationId
    ).subscribe({
      next: draft => {
        if (this.selectedChoirId() !== choirId
          || this.selectedConcertId() !== concertId
          || this.selectedRepertoireItemId() !== repertoireItemId
          || this.selectedFormationId() !== formationId) {
          return;
        }
        this.selectedDraft.set(draft);
        this.applyDraftPositions(draft);
        this.draftLoading.set(false);
      },
      error: () => {
        if (this.selectedChoirId() !== choirId
          || this.selectedConcertId() !== concertId
          || this.selectedRepertoireItemId() !== repertoireItemId
          || this.selectedFormationId() !== formationId) {
          return;
        }
        this.draftLoading.set(false);
        this.workflowError.set('No se pudo cargar el borrador de la formación.');
      }
    });
  }

  private applyDraftPositions(draft: FormationDraft): void {
    const positions: Record<number, { x: number; y: number }> = {};

    for (const position of draft.positions) {
      positions[position.singerId] = {
        x: position.x,
        y: position.y
      };
    }

    this.singerPositions.set(positions);
  }

  private parseSelection(event: Event): number | null {
    const value = (event.target as HTMLSelectElement).value;
    const id = Number(value);
    return value !== '' && Number.isSafeInteger(id) && id > 0 ? id : null;
  }

  private clearWorkflowMessages(): void {
    this.workflowError.set(null);
    this.saveError.set(null);
    this.saveSuccess.set(false);
  }

  private resetWorkflow(): void {
    this.concerts.set([]);
    this.repertoire.set([]);
    this.formations.set([]);
    this.selectedConcertId.set(null);
    this.selectedRepertoireItemId.set(null);
    this.selectedFormationId.set(null);
    this.selectedDraft.set(null);
    this.singerPositions.set({});
    this.concertsLoading.set(false);
    this.repertoireLoading.set(false);
    this.formationsLoading.set(false);
    this.draftLoading.set(false);
    this.savingDraft.set(false);
    this.clearWorkflowMessages();
    this.workflowError.set(null);
  }
}

@Component({
  standalone: true,
  template: `
    <section class="page-wrap not-found">
      <span class="eyebrow">ERROR 404</span>
      <h1>Esta página no existe.</h1>
      <p class="page-lead">Volvé al inicio para seguir explorando CHOIR.</p>
      <a class="button button-primary" href="/">Ir al inicio ↗</a>
    </section>
  `
})
export class NotFoundPage {}
