import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { AuthService, DirectorSession } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  const director: DirectorSession = {
    id: 42,
    displayName: 'Directora de prueba',
    email: 'directora@example.com'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('restores the authenticated director from /me', () => {
    let result: DirectorSession | null | undefined;

    service.loadSession().subscribe(value => result = value);

    const request = http.expectOne('/api/auth/me');
    expect(request.request.method).toBe('GET');
    expect(request.request.withCredentials).toBe(true);
    request.flush(director);

    expect(result).toEqual(director);
    expect(service.currentDirector()).toEqual(director);
    expect(service.isAuthenticated()).toBe(true);
  });

  it('clears the session when /me returns 401', () => {
    let result: DirectorSession | null | undefined;

    service.loadSession().subscribe(value => result = value);

    http.expectOne('/api/auth/me').flush(
      { message: 'Unauthorized' },
      { status: 401, statusText: 'Unauthorized' }
    );

    expect(result).toBeNull();
    expect(service.currentDirector()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('fetches a CSRF token before logging in', () => {
    let result: DirectorSession | undefined;

    service.login('directora@example.com', 'clave-segura')
      .subscribe(value => result = value);

    const csrf = http.expectOne('/api/auth/csrf');
    expect(csrf.request.method).toBe('GET');
    expect(csrf.request.withCredentials).toBe(true);
    csrf.flush({ token: 'csrf-login' });

    const login = http.expectOne('/api/auth/login');
    expect(login.request.method).toBe('POST');
    expect(login.request.body).toEqual({
      email: 'directora@example.com',
      password: 'clave-segura'
    });
    expect(login.request.headers.get('X-CSRF-TOKEN')).toBe('csrf-login');
    expect(login.request.withCredentials).toBe(true);
    login.flush(director);

    expect(result).toEqual(director);
    expect(service.currentDirector()).toEqual(director);
    expect(service.isAuthenticated()).toBe(true);
  });

  it('clears the local session after a successful CSRF-protected logout', () => {
    service.clearSession();

    let completed = false;
    service.logout().subscribe({ complete: () => completed = true });

    const csrf = http.expectOne('/api/auth/csrf');
    csrf.flush({ token: 'csrf-logout' });

    const logout = http.expectOne('/api/auth/logout');
    expect(logout.request.method).toBe('POST');
    expect(logout.request.headers.get('X-CSRF-TOKEN')).toBe('csrf-logout');
    expect(logout.request.withCredentials).toBe(true);
    logout.flush(null, { status: 204, statusText: 'No Content' });

    expect(completed).toBe(true);
    expect(service.currentDirector()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('does not authenticate when login credentials are rejected', () => {
    let status = 0;

    service.login('directora@example.com', 'incorrecta').subscribe({
      error: error => status = error.status
    });

    http.expectOne('/api/auth/csrf').flush({ token: 'csrf-invalid' });

    http.expectOne('/api/auth/login').flush(
      { message: 'Unauthorized' },
      { status: 401, statusText: 'Unauthorized' }
    );

    expect(status).toBe(401);
    expect(service.currentDirector()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });
});
