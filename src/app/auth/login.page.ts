import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <section class="page-wrap narrow-page login-page">
      <a class="back-link" routerLink="/">← Volver al inicio</a>
      <span class="eyebrow">ESPACIO DE DIRECTORES</span>
      <h1>Ingresá a tu <span>espacio.</span></h1>
      <p class="page-lead">
        Organizá tu coro, prepará conciertos y gestioná tus formaciones.
      </p>

      <form class="login-form" (ngSubmit)="submit()">
        <label for="email">Correo electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="username"
          [(ngModel)]="email"
          required
          email
          [disabled]="auth.isLoading()"
        />

        <label for="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          [(ngModel)]="password"
          required
          [disabled]="auth.isLoading()"
        />

        @if (errorMessage()) {
          <p class="login-error" role="alert">{{ errorMessage() }}</p>
        }

        <button
          class="button button-primary full-button"
          type="submit"
          [disabled]="auth.isLoading() || !email.trim() || !password"
        >
          {{ auth.isLoading() ? 'Ingresando…' : 'Ingresar' }}
        </button>
      </form>

      <p class="login-register">
        ¿Todavía no tenés una cuenta?
        <a routerLink="/registro">Registrate</a>
      </p>
    </section>
  `,
  styles: [`
    .login-form {
      display: grid;
      gap: 10px;
      margin-top: 30px;
    }

    .login-form label {
      margin-top: 8px;
      color: var(--ink);
      font-size: 12px;
      font-weight: 700;
    }

    .login-form input {
      box-sizing: border-box;
      width: 100%;
      min-height: 47px;
      padding: 12px 14px;
      color: var(--ink);
      border: 1px solid var(--line);
      border-radius: 10px;
      background: var(--surface);
      font: inherit;
    }

    .login-form input:focus {
      outline: 2px solid var(--accent-soft);
      border-color: var(--accent);
    }

    .login-form input:disabled { opacity: .65; }

    .login-error {
      margin: 8px 0 0;
      color: #a12c2c;
      font-size: 12px;
      line-height: 1.6;
    }

    .login-register {
      margin-top: 24px;
      color: var(--muted);
      font-size: 12px;
    }

    .login-register a {
      color: var(--accent);
      font-weight: 700;
    }
  `]
})
export class LoginPage {
  email = '';
  password = '';
  readonly errorMessage = signal('');

  constructor(
    readonly auth: AuthService,
    private readonly router: Router
  ) {}

  submit(): void {
    if (!this.email.trim() || !this.password || this.auth.isLoading()) {
      return;
    }

    this.errorMessage.set('');

    this.auth.login(this.email.trim(), this.password).subscribe({
      next: () => {
        void this.router.navigateByUrl('/app/coro');
      },
      error: (error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 403) {
            this.errorMessage.set(
              'No se pudo iniciar sesión. Verificá el correo, la contraseña y que el correo esté verificado.'
            );
          } else if (error.status === 0) {
            this.errorMessage.set(
              'No se pudo conectar con el servidor. Intentá nuevamente.'
            );
          } else {
            this.errorMessage.set(
              'Ocurrió un error al ingresar. Intentá nuevamente.'
            );
          }
        } else {
          this.errorMessage.set(
            'Ocurrió un error al ingresar. Intentá nuevamente.'
          );
        }
      }
    });
  }
}
