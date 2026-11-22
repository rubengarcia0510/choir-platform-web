import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { take } from 'rxjs';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-verify-email-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-wrap narrow-page verification-page">
      <a class="back-link" routerLink="/">← Volver al inicio</a>

      <span class="eyebrow">VERIFICACIÓN DE CUENTA</span>

      @if (isLoading()) {
        <h1>Verificando tu <span>correo.</span></h1>
        <p class="page-lead" role="status">Estamos comprobando el enlace. Un momento, por favor.</p>
      } @else if (isVerified()) {
        <h1>¡Correo <span>verificado!</span></h1>
        <p class="page-lead" role="status">
          Tu dirección de correo fue verificada correctamente. Ya podés ingresar a CHOIR.
        </p>
        <a class="button button-primary full-button" routerLink="/ingresar">Ir a ingresar</a>
      } @else {
        <h1>No pudimos verificar tu <span>correo.</span></h1>
        <p class="page-lead" role="alert">{{ errorMessage() }}</p>
        <a class="button button-primary full-button" routerLink="/ingresar">Ir a ingresar</a>
      }
    </section>
  `,
  styles: [
    `
      .verification-page {
        display: grid;
        gap: 18px;
      }

      .verification-page .full-button {
        display: inline-flex;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 48px;
        margin-top: 12px;
        text-decoration: none;
      }
    `,
  ],
})
export class VerifyEmailPage {
  readonly isLoading = signal(true);
  readonly isVerified = signal(false);
  readonly errorMessage = signal('');

  constructor(route: ActivatedRoute, auth: AuthService) {
    route.queryParamMap.pipe(take(1)).subscribe((params) => {
      const token = params.get('token');

      if (!token) {
        this.isLoading.set(false);
        this.errorMessage.set(
          'El enlace no contiene un token de verificación. Revisá que hayas abierto el enlace completo del correo.',
        );
        return;
      }

      auth.verifyEmail(token).subscribe({
        next: (response) => {
          if (response.message === 'email_verified') {
            this.isVerified.set(true);
          } else {
            this.errorMessage.set(
              'No pudimos confirmar la verificación. El enlace puede haber vencido o ya haber sido utilizado.',
            );
          }
          this.isLoading.set(false);
        },
        error: (error: unknown) => {
          this.isLoading.set(false);

          if (error instanceof HttpErrorResponse && error.status === 400) {
            this.errorMessage.set(
              'El enlace es inválido, venció o ya fue utilizado. Solicitá un nuevo registro si todavía no verificaste tu cuenta.',
            );
          } else if (error instanceof HttpErrorResponse && error.status === 0) {
            this.errorMessage.set(
              'No pudimos conectar con el servidor. Revisá tu conexión e intentá nuevamente abriendo el enlace.',
            );
          } else {
            this.errorMessage.set(
              'Ocurrió un error al verificar tu correo. Intentá nuevamente más tarde.',
            );
          }
        },
      });
    });
  }
}
