import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Choir } from './choirs/choir.model';
import { ChoirsApiService } from './choirs/choirs-api.service';
import { SingersStore } from './singers/singers.store';

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

      <div class="formation-layout">
        <article class="panel formation-panel">
          <div class="formation-toolbar">
            <div>
              <span class="panel-kicker">VISTA PREVIA DEL ESCENARIO</span>
              <h2>{{ selectedChoirName() || 'Escenario' }}</h2>
            </div>
            <span class="stage-tag">ESCENARIO</span>
          </div>

          <div class="stage" aria-label="Vista previa ilustrativa del escenario">
            <div class="stage-back"></div>
            <div class="stage-center">
              <span>♪</span>
              <p>El editor visual de posiciones<br>se implementará en el siguiente paso<br>Editor visual pendiente de implementación.</p>
            </div>
            <div class="stage-front"></div>
          </div>
        </article>

        <aside class="panel formation-details">
          <span class="panel-kicker">ELENCO DEL CORO</span>
          <h2>Integrantes</h2>
          @if (selectedChoirId() === null) {
            <p>Elegí un coro para consultar su elenco.</p>
          } @else if (singersStore.loadingByChoir()[choirKey()]) {
            <p role="status">Cargando elenco…</p>
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
  `
})
export class FormationsPage {
  private readonly choirsApi = inject(ChoirsApiService);
  readonly singersStore = inject(SingersStore);

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
      return;
    }

    this.chooseChoir(choirId);
  }

  retrySingers(): void {
    const choirId = this.selectedChoirId();
    if (choirId !== null) {
      this.singersStore.loadSingers(choirId, true);
    }
  }

  private chooseChoir(choirId: number): void {
    this.selectedChoirId.set(choirId);
    this.singersStore.loadSingers(choirId);
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
