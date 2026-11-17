import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  styleUrl: './register.page.scss',
  template: `
    <section class="register-page">
      <aside class="register-art" aria-label="Identidad de CHOIR">
        <a class="register-brand" routerLink="/">CHOIR</a>

        <div class="register-art-copy">
          <span class="register-eyebrow">PARA DIRECTORES DE CORO</span>
          <h1>
            Cada voz importa.
            <span>Cada detalle también.</span>
          </h1>
        </div>

        <div class="register-waves" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </aside>

      <section class="register-content">
        <a class="register-back" routerLink="/">
          <span aria-hidden="true">←</span>
          Volver al inicio
        </a>

        <div class="register-card">
          <header class="register-heading">
            <span class="register-eyebrow">NUEVO ESPACIO DE DIRECCIÓN</span>
            <h2>Empezá a organizar tu coro.</h2>
            <p>Un espacio pensado para que la planificación musical y la organización convivan.</p>
          </header>

          @if (successMessage()) {
            <div class="register-result" role="status">
              <p>{{ successMessage() }}</p>
            </div>
          } @else {
            <form
              class="register-form"
              aria-label="Formulario de registro"
              #registrationForm="ngForm"
              (ngSubmit)="submit()"
            >
              <div class="register-field">
                <label for="displayName">Nombre para mostrar</label>
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  autocomplete="name"
                  [(ngModel)]="displayName"
                  required
                  maxlength="160"
                  [disabled]="isSubmitting()"
                />
              </div>

              <div class="register-field">
                <label for="email">Correo electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  [(ngModel)]="email"
                  required
                  email
                  maxlength="254"
                  [disabled]="isSubmitting()"
                />
              </div>

              <div class="register-field">
                <label for="password">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                  [(ngModel)]="password"
                  required
                  minlength="12"
                  maxlength="200"
                  [disabled]="isSubmitting()"
                />
                <span class="register-hint">Usá al menos 12 caracteres.</span>
              </div>

              @if (errorMessage()) {
                <p class="register-error" role="alert">{{ errorMessage() }}</p>
              }

              <button
                class="register-submit"
                type="submit"
                [disabled]="registrationForm.invalid || isSubmitting()"
              >
                {{ isSubmitting() ? 'Enviando…' : 'Crear cuenta' }}
              </button>
            </form>
          }

          <footer class="register-footer">
            <span>¿Ya tenés una cuenta?</span>
            <a routerLink="/ingresar">Ingresá</a>
          </footer>
        </div>
      </section>
    </section>
  `,
})
export class RegisterPage {
  displayName = '';
  email = '';
  password = '';

  readonly isSubmitting = signal(false);
  readonly successMessage = signal('');
  readonly errorMessage = signal('');

  constructor(private readonly auth: AuthService) {}

  submit(): void {
    if (
      this.isSubmitting() ||
      !this.displayName.trim() ||
      !this.email.trim() ||
      !this.password ||
      this.password.length < 12 ||
      this.password.length > 200 ||
      this.displayName.trim().length > 160 ||
      this.email.trim().length > 254
    ) {
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('');
    this.isSubmitting.set(true);

    this.auth.register(this.displayName.trim(), this.email.trim(), this.password).subscribe({
      next: () => {
        this.successMessage.set(
          'Recibimos tu solicitud. Si los datos permiten crear la cuenta, vas a recibir un correo con los pasos para verificar tu dirección.',
        );
        this.isSubmitting.set(false);
      },
      error: (error: unknown) => {
        this.isSubmitting.set(false);

        if (error instanceof HttpErrorResponse) {
          if (error.status === 503) {
            this.errorMessage.set(
              'El registro no está disponible por el momento. Intentá nuevamente más tarde.',
            );
          } else if (error.status === 0) {
            this.errorMessage.set(
              'No se pudo conectar con el servidor. Revisá tu conexión e intentá nuevamente.',
            );
          } else if (error.status === 400 || error.status === 422) {
            this.errorMessage.set('Revisá los datos ingresados e intentá nuevamente.');
          } else {
            this.errorMessage.set('Ocurrió un error al procesar el registro. Intentá nuevamente.');
          }
        } else {
          this.errorMessage.set('Ocurrió un error al procesar el registro. Intentá nuevamente.');
        }
      },
    });
  }
}
