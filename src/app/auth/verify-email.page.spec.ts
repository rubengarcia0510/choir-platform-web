import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { VerifyEmailPage } from './verify-email.page';

describe('VerifyEmailPage', () => {
  let fixture: ComponentFixture<VerifyEmailPage>;
  let auth: {
    verifyEmail: ReturnType<typeof vi.fn>;
  };
  let token: string | null;

  beforeEach(async () => {
    token = 'token-de-prueba';
    auth = {
      verifyEmail: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [VerifyEmailPage],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: (name: string) => (name === 'token' ? token : null),
            }),
          },
        },
        { provide: AuthService, useValue: auth },
      ],
    }).compileComponents();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(VerifyEmailPage);
    fixture.detectChanges();
  }

  it('verifies the token received in the query string', () => {
    auth.verifyEmail.mockReturnValue(of({ message: 'email_verified' }));
    createComponent();

    expect(auth.verifyEmail).toHaveBeenCalledWith('token-de-prueba');
    expect(fixture.componentInstance.isVerified()).toBe(true);
    expect(fixture.componentInstance.isLoading()).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('Correo verificado');
    expect(fixture.nativeElement.querySelector('a[routerLink="/ingresar"]')).not.toBeNull();
  });

  it('shows an error and does not call the backend when the token is missing', () => {
    token = null;
    createComponent();

    expect(auth.verifyEmail).not.toHaveBeenCalled();
    expect(fixture.componentInstance.isVerified()).toBe(false);
    expect(fixture.componentInstance.isLoading()).toBe(false);
    expect(fixture.componentInstance.errorMessage()).toContain('no contiene un token');
  });

  it('shows an invalid or expired message when the backend returns 400', () => {
    auth.verifyEmail.mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: { error: 'invalid_or_expired_token' },
          }),
      ),
    );
    createComponent();

    expect(fixture.componentInstance.isVerified()).toBe(false);
    expect(fixture.componentInstance.isLoading()).toBe(false);
    expect(fixture.componentInstance.errorMessage()).toContain(
      'inválido, venció o ya fue utilizado',
    );
  });

  it('shows a connectivity message when the backend cannot be reached', () => {
    auth.verifyEmail.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 0 })));
    createComponent();

    expect(fixture.componentInstance.errorMessage()).toContain(
      'No pudimos conectar con el servidor',
    );
  });

  it('does not treat an unexpected successful response as verification', () => {
    auth.verifyEmail.mockReturnValue(of({ message: 'unexpected_response' }));
    createComponent();

    expect(fixture.componentInstance.isVerified()).toBe(false);
    expect(fixture.componentInstance.errorMessage()).toContain('No pudimos confirmar');
  });
});
