import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(request).pipe(
    catchError((error: unknown) => {
      const isLoginRequest = request.url.endsWith('/api/auth/login');
      const isCsrfRequest = request.url.endsWith('/api/auth/csrf');
      const isLogoutRequest = request.url.endsWith('/api/auth/logout');

      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !isLoginRequest &&
        !isCsrfRequest &&
        !isLogoutRequest
      ) {
        auth.clearSession();

        if (router.url.startsWith('/app')) {
          void router.navigateByUrl('/ingresar');
        }
      }

      return throwError(() => error);
    })
  );
};
