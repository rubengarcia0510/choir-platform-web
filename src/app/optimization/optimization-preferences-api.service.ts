import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import {
  OptimizationPreferences,
  UpdateOptimizationPreferencesRequest
} from './optimization-preferences.model';

@Injectable({ providedIn: 'root' })
export class OptimizationPreferencesApiService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  get(choirId: number, concertId: number): Observable<OptimizationPreferences> {
    return this.http.get<OptimizationPreferences>(
      this.url(choirId, concertId),
      { withCredentials: true }
    );
  }

  update(
    choirId: number,
    concertId: number,
    request: UpdateOptimizationPreferencesRequest
  ): Observable<OptimizationPreferences> {
    return this.auth.getCsrfToken().pipe(
      switchMap(token => this.http.put<OptimizationPreferences>(
        this.url(choirId, concertId),
        request,
        {
          headers: new HttpHeaders({ 'X-CSRF-TOKEN': token }),
          withCredentials: true
        }
      ))
    );
  }

  private url(choirId: number, concertId: number): string {
    return `/api/choirs/${choirId}/concerts/${concertId}/optimization-preferences`;
  }
}
