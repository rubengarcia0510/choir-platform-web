import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App shell - CHOIR-11', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)]
    }).compileComponents();
  });

  it('creates the application shell', () => {
    const fixture = TestBed.createComponent(App);

    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.querySelector('header.topbar')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('main#main-content')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('footer.footer')).toBeTruthy();
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

  it('provides links to choir, concerts and formations in workspace navigation', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/app/coro');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const nav = element.querySelector('nav');

    expect(nav?.getAttribute('aria-label'))
      .toBe('Navegación del espacio de trabajo');

    const links = Array.from(nav?.querySelectorAll('a') ?? []);
    expect(links.map(link => link.getAttribute('href'))).toEqual([
      '/app/coro',
      '/app/conciertos',
      '/app/formaciones'
    ]);
  });

  it('switches navigation when moving between public and workspace pages', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nav')?.getAttribute('aria-label'))
      .toBe('Navegación pública');

    await router.navigateByUrl('/app/formaciones');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nav')?.getAttribute('aria-label'))
      .toBe('Navegación del espacio de trabajo');

    await router.navigateByUrl('/ingresar');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nav')?.getAttribute('aria-label'))
      .toBe('Navegación pública');
  });

  it('redirects /app to /app/coro', async () => {
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/app');

    expect(router.url).toBe('/app/coro');
  });

  it('keeps the formations screen prepared for the visual editor', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/app/formaciones');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('Formaciones');
    expect(element.querySelector('.formation-layout')).toBeTruthy();
    expect(element.querySelector('.stage')).toBeTruthy();
    expect(element.textContent).toContain('Editor visual pendiente de implementación.');
  });
});
