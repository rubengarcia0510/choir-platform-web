import { Component } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, provideRouter } from '@angular/router';
import { filter, firstValueFrom, take } from 'rxjs';

import { AuthService, DirectorSession } from './auth.service';
import { authInterceptor } from './auth.interceptor';

@Component({ standalone: true, template: '' })
class TestPage {}

describe('authInterceptor', () => {
  let http: HttpTestingController;
  let client: HttpClient;
  let auth: AuthService;
  let router: Router;

  const director: DirectorSession = {
    id: 42,
    displayName: 'Directora de prueba',
    email: 'directora@example.com'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        provideRouter([
          {
            path: 'app',
            children: [
              { path: 'coro', component: TestPage }
            ]
          },
          { path: 'ingresar', component: TestPage }
        ])
      ]
    });

    http = TestBed.inject(HttpTestingController);
    client = TestBed.inject(HttpClient);
    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => http.verify());

  it('clears the session and redirects to login after a protected request returns 401', async () => {
    auth.loadSession().subscribe();
    http.expectOne('/api/auth/me').flush(director);

    await router.navigateByUrl('/app/coro');
    expect(router.url).toBe('/app/coro');
    expect(auth.isAuthenticated()).toBe(true);

    const navigation = firstValueFrom(
      router.events.pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd &&
            event.urlAfterRedirects === '/ingresar'
        ),
        take(1)
      )
    );

    client.get('/api/choir').subscribe({ error: () => undefined });

    http.expectOne('/api/choir').flush(
      { message: 'Unauthorized' },
      { status: 401, statusText: 'Unauthorized' }
    );

    await navigation;

    expect(auth.isAuthenticated()).toBe(false);
    expect(auth.currentDirector()).toBeNull();
    expect(router.url).toBe('/ingresar');
  });

  it('does not clear the session when the login endpoint returns 401', () => {
    auth.loadSession().subscribe();
    http.expectOne('/api/auth/me').flush(director);

    client.post('/api/auth/login', {}).subscribe({ error: () => undefined });

    http.expectOne('/api/auth/login').flush(
      { message: 'Unauthorized' },
      { status: 401, statusText: 'Unauthorized' }
    );

    expect(auth.isAuthenticated()).toBe(true);
    expect(auth.currentDirector()).toEqual(director);
  });
});
