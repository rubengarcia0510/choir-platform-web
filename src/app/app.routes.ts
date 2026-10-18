import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages').then((m) => m.HomePage)
  },
  {
    path: 'ingresar',
    loadComponent: () =>
      import('./pages').then((m) => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages').then((m) => m.RegisterPage)
  },
  {
    path: 'app',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'coro'
      },
      {
        path: 'coro',
        loadComponent: () =>
          import('./pages').then((m) => m.ChoirPage)
      },
      {
        path: 'conciertos',
        loadComponent: () =>
          import('./pages').then((m) => m.ConcertsPage)
      },
      {
        path: 'formaciones',
        loadComponent: () =>
          import('./pages').then((m) => m.FormationsPage)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages').then((m) => m.NotFoundPage)
  }
];
