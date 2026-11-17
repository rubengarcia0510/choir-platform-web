import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let fixture: ComponentFixture<RegisterPage>;
  let component: RegisterPage;

  const auth = {
    register: vi.fn(),
    isLoading: signal(false),
  };

  beforeEach(async () => {
    auth.register.mockReset();

    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [provideRouter([]), { provide: AuthService, useValue: auth }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the registration fields with their expected types', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('input[name="displayName"]')?.getAttribute('type')).toBe('text');
    expect(element.querySelector('input[name="email"]')?.getAttribute('type')).toBe('email');
    expect(element.querySelector('input[name="password"]')?.getAttribute('type')).toBe('password');

    expect(element.querySelector('label[for="displayName"]')?.textContent).toContain(
      'Nombre para mostrar',
    );
    expect(element.querySelector('label[for="email"]')?.textContent).toContain(
      'Correo electrónico',
    );
    expect(element.querySelector('label[for="password"]')?.textContent).toContain('Contraseña');
  });

  it('submits the trimmed name and email and displays a neutral success message', () => {
    auth.register.mockReturnValue(
      of({
        message: 'If registration is available, a verification email will be sent.',
      }),
    );

    component.displayName = '  Directora de prueba  ';
    component.email = '  directora@example.com  ';
    component.password = 'clave-segura-de-12';

    component.submit();
    fixture.detectChanges();

    expect(auth.register).toHaveBeenCalledWith(
      'Directora de prueba',
      'directora@example.com',
      'clave-segura-de-12',
    );
    expect(component.successMessage()).toContain('Recibimos tu solicitud');
    expect(component.successMessage()).not.toContain('correo enviado');
    expect(component.isSubmitting()).toBe(false);
    expect(fixture.nativeElement.querySelector('[role="status"]')).not.toBeNull();
  });

  it('shows an unavailable message when the backend returns 503', () => {
    auth.register.mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 503,
            error: { error: 'registration_unavailable' },
          }),
      ),
    );

    component.displayName = 'Directora';
    component.email = 'directora@example.com';
    component.password = 'clave-segura-de-12';

    component.submit();
    fixture.detectChanges();

    expect(component.errorMessage()).toContain('no está disponible');
    expect(component.isSubmitting()).toBe(false);
    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
  });

  it('shows a connectivity message when the request cannot reach the server', () => {
    auth.register.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 0 })));

    component.displayName = 'Directora';
    component.email = 'directora@example.com';
    component.password = 'clave-segura-de-12';

    component.submit();

    expect(component.errorMessage()).toContain('No se pudo conectar');
  });

  it('does not submit when required data is missing or invalid', () => {
    component.displayName = 'Directora';
    component.email = 'directora@example.com';
    component.password = 'corta';

    component.submit();

    expect(auth.register).not.toHaveBeenCalled();
  });

  it('does not submit an invalid email even when submit is invoked directly', () => {
    component.displayName = 'Directora';
    component.email = 'correo-invalido';
    component.password = 'clave-segura-de-12';

    component.submit();
    fixture.detectChanges();

    expect(auth.register).not.toHaveBeenCalled();
    expect(component.errorMessage()).toBe('Ingresá un correo electrónico válido.');
    expect(component.isSubmitting()).toBe(false);
    expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toContain(
      'correo electrónico válido',
    );
  });

  it('does not submit twice while a request is in progress', () => {
    auth.register.mockReturnValue(
      of({
        message: 'accepted',
      }),
    );

    component.displayName = 'Directora';
    component.email = 'directora@example.com';
    component.password = 'clave-segura-de-12';

    component['isSubmitting'].set(true);
    component.submit();

    expect(auth.register).not.toHaveBeenCalled();
  });

  it('provides navigation links to home and login', () => {
    const element = fixture.nativeElement as HTMLElement;
    const links = Array.from(element.querySelectorAll('a'));

    expect(links.some((link) => link.getAttribute('href') === '/')).toBe(true);
    expect(links.some((link) => link.getAttribute('href') === '/ingresar')).toBe(true);
  });
});
