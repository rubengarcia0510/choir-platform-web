import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
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

  it('keeps registration disabled while the flow is unavailable', () => {
    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector('.register-submit') as HTMLButtonElement;

    expect(button).not.toBeNull();
    expect(button.disabled).toBe(true);
    expect(element.querySelector('[role="status"]')?.textContent).toContain(
      'todavía no está habilitado',
    );
  });

  it('provides navigation links to home and login', () => {
    const element = fixture.nativeElement as HTMLElement;
    const links = Array.from(element.querySelectorAll('a'));

    expect(links.some((link) => link.getAttribute('href') === '/')).toBe(true);
    expect(links.some((link) => link.getAttribute('href') === '/ingresar')).toBe(true);
  });
});
