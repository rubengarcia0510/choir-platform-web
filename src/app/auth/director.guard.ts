import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { AuthService } from './auth.service';

export const directorGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.loadSession().pipe(
    map(director =>
      director !== null
        ? true
        : router.createUrlTree(['/ingresar'])
    ),
    catchError(() => of(router.createUrlTree(['/ingresar'])))
  );
};
