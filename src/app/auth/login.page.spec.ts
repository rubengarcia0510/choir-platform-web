import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AuthService, DirectorSession } from './auth.service';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let component: LoginPage;
  let auth: {
    isLoading: ReturnType<typeof signal<boolean>>;
    login: ReturnType<typeof vi.fn>;
  };
  let router: Router;

  const director: DirectorSession = {
    id: 42,
    displayName: 'Directora de prueba',
    email: 'directora@example.com'
  };

  beforeEach(async () => {
    auth = {
      isLoading: signal(false),
      login: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: auth }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture.detectChanges();
  });

  it('logs in with the trimmed email and navigates to the workspace', () => {
    auth.login.mockReturnValue(of(director));
    component.email = '  directora@example.com  ';
    component.password = 'clave-segura';

    component.submit();

    expect(auth.login).toHaveBeenCalledWith(
      'directora@example.com',
      'clave-segura'
    );
    expect(router.navigateByUrl).toHaveBeenCalledWith('/app/coro');
    expect(component.errorMessage()).toBe('');
  });

  it('shows a useful message when credentials are rejected', () => {
    auth.login.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 401 }))
    );
    component.email = 'directora@example.com';
    component.password = 'incorrecta';

    component.submit();
    fixture.detectChanges();

    expect(component.errorMessage()).toContain(
      'Verificá el correo, la contraseña'
    );
    expect(fixture.nativeElement.querySelector('[role="alert"]'))
      .not.toBeNull();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('does not submit empty credentials', () => {
    component.email = '  ';
    component.password = '';

    component.submit();

    expect(auth.login).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });
});
