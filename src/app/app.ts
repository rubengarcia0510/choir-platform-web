import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, signal, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import { filter, finalize } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly isWorkspace = signal(false);
  readonly isLoggingOut = signal(false);
  readonly logoutError = signal('');

  private readonly platformId = inject(PLATFORM_ID);

  constructor(
    private readonly router: Router,
    readonly auth: AuthService
  ) {
    this.updateLayout(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => this.updateLayout(event.urlAfterRedirects));

    if (isPlatformBrowser(this.platformId)) {
      this.auth.loadSession().subscribe(() => {
        this.updateLayout(this.router.url);
      });
    }
  }

  logout(): void {
    if (this.isLoggingOut()) {
      return;
    }

    this.isLoggingOut.set(true);
    this.logoutError.set('');

    this.auth.logout().pipe(
      finalize(() => this.isLoggingOut.set(false))
    ).subscribe({
      next: () => {
        void this.router.navigateByUrl('/');
      },
      error: () => {
        this.logoutError.set(
          'No se pudo confirmar el cierre de sesión con el servidor. Volvé a ingresar.'
        );
        void this.router.navigateByUrl('/');
      }
    });
  }

  private updateLayout(url: string): void {
    this.isWorkspace.set(
      url.startsWith('/app/') && this.auth.isAuthenticated()
    );
  }
}
