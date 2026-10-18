import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)]
    }).compileComponents();
  });

  it('should create the app shell', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render public navigation on the home page', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('CHOIR');
    expect(compiled.querySelector('nav')?.getAttribute('aria-label'))
      .toBe('Navegación pública');
    expect(compiled.querySelector('nav')?.textContent).toContain('Inicio');
    expect(compiled.querySelector('nav')?.textContent).not.toContain('Mi coro');
    expect(compiled.querySelector('.login-link')?.textContent).toContain('Ingresar');
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should render workspace navigation on workspace routes', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/app/coro');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav')?.getAttribute('aria-label'))
      .toBe('Navegación del espacio de trabajo');
    expect(compiled.querySelector('nav')?.textContent).toContain('Mi coro');
    expect(compiled.querySelector('nav')?.textContent).toContain('Conciertos');
    expect(compiled.querySelector('nav')?.textContent).toContain('Formaciones');
    expect(compiled.querySelector('.login-link')?.textContent).toContain('Sitio público');
  });

  it('should update navigation when moving between public and workspace routes', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/');
    fixture.detectChanges();

    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav')?.getAttribute('aria-label'))
      .toBe('Navegación pública');

    await router.navigateByUrl('/app/formaciones');
    fixture.detectChanges();

    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav')?.getAttribute('aria-label'))
      .toBe('Navegación del espacio de trabajo');
    expect(compiled.querySelector('nav')?.textContent).toContain('Formaciones');

    await router.navigateByUrl('/ingresar');
    fixture.detectChanges();

    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav')?.getAttribute('aria-label'))
      .toBe('Navegación pública');
    expect(compiled.querySelector('.login-link')?.textContent).toContain('Ingresar');
  });

  it('should redirect /app to the choir workspace', async () => {
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/app');

    expect(router.url).toBe('/app/coro');
  });
});
