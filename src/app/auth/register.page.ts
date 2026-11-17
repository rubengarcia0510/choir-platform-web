import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink],
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

          <form class="register-form" aria-label="Formulario de registro">
            <div class="register-field">
              <label for="displayName">Nombre para mostrar</label>
              <input id="displayName" name="displayName" type="text" autocomplete="name" />
            </div>

            <div class="register-field">
              <label for="email">Correo electrónico</label>
              <input id="email" name="email" type="email" autocomplete="email" />
            </div>

            <div class="register-field">
              <label for="password">Contraseña</label>
              <input id="password" name="password" type="password" autocomplete="new-password" />
            </div>

            <button class="register-submit" type="button" disabled>Crear cuenta</button>

            <p class="register-unavailable" role="status">
              El registro todavía no está habilitado desde esta pantalla.
            </p>
          </form>

          <footer class="register-footer">
            <span>¿Ya tenés una cuenta?</span>
            <a routerLink="/ingresar">Ingresá</a>
          </footer>
        </div>
      </section>
    </section>
  `,
})
export class RegisterPage {}
