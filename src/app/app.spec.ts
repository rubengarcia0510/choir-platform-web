import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';

import { App } from './app';
import { routes } from './app.routes';
import { AuthService, DirectorSession } from './auth/auth.service';

describe('App shell - CHOIR-11 / CHOIR-64', () => {
  let session: DirectorSession | null;
  let sessionToRestore: DirectorSession | null;
  let loadSessionCalls: number;

  const testDirector: DirectorSession = {
    id: 1,
    displayName: 'Directora de prueba',
    email: 'directora@example.com'
  };

  beforeEach(async () => {
    session = null;
    sessionToRestore = null;
    loadSessionCalls = 0;

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        {
          provide: AuthService,
          useValue: {
            loadSession: () => {
              loadSessionCalls++;

              if (sessionToRestore !== null) {
                session = sessionToRestore;
              }

              return of(session);
            },
            currentDirector: () => session,
            isAuthenticated: () => session !== null,
            isLoading: () => false,
            logout: () => of(undefined),
            clearSession: () => {
              session = null;
            }
          }
        }
      ]
    }).compileComponents();
  });

  it('creates the application shell', () => {
    const fixture = TestBed.createComponent(App);

    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.querySelector('header.topbar')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('main#main-content')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('footer.footer')).toBeTruthy();
  });

  it('restores a valid director session on the public page', () => {
    sessionToRestore = testDirector;

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(loadSessionCalls).toBeGreaterThan(0);
    expect(element.querySelector('.login-link')?.textContent)
      .toContain('Mi espacio');
    expect(element.querySelector('.login-link')?.getAttribute('href'))
      .toBe('/app/coro');
  });

  it('shows public navigation outside the workspace', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const nav = element.querySelector('nav');

    expect(nav?.getAttribute('aria-label')).toBe('Navegación pública');
    expect(nav?.textContent).toContain('Inicio');
    expect(nav?.textContent).not.toContain('Mi coro');
    expect(element.querySelector('.login-link')?.getAttribute('href'))
      .toBe('/ingresar');
  });

  it('provides workspace links to an authenticated director', async () => {
    session = testDirector;

    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/app/coro');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const nav = element.querySelector('nav');

    expect(router.url).toBe('/app/coro');
    expect(nav?.getAttribute('aria-label'))
      .toBe('Navegación del espacio de trabajo');

    const links = Array.from(nav?.querySelectorAll('a') ?? []);
    expect(links.map(link => link.getAttribute('href'))).toEqual([
      '/app/coro',
      '/app/conciertos',
      '/app/formaciones'
    ]);
  });

  it('redirects an unauthenticated director away from the workspace', async () => {
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/app/formaciones');

    expect(router.url).toBe('/ingresar');
  });

  it('redirects /app to /app/coro for an authenticated director', async () => {
    session = testDirector;

    const router = TestBed.inject(Router);

    await router.navigateByUrl('/app');

    expect(router.url).toBe('/app/coro');
  });

  it('redirects unauthenticated /app access to login', async () => {
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/app');

    expect(router.url).toBe('/ingresar');
  });

  it('keeps the formations screen available to an authenticated director', async () => {
    session = testDirector;

    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/app/formaciones');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(router.url).toBe('/app/formaciones');
    expect(element.textContent).toContain('Formaciones');
    expect(element.querySelector('.formation-layout')).toBeTruthy();
    expect(element.querySelector('.stage')).toBeTruthy();
    expect(
      element.querySelector('.stage-skeleton') ||
      element.querySelector('.stage-empty') ||
      element.querySelector('.stage-person')
    ).toBeTruthy();
  });
});
