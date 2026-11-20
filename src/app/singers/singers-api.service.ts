import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Singer } from './singer.model';

export interface SingerRequest {
  displayName: string;
  email: string | null;
  voicePart: string | null;
  voiceSectionId: number | null;
  mobility: string | null;
  restrictions: string | null;
}

@Injectable({ providedIn: 'root' })
export class SingersApiService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  list(choirId: number, includeInactive = false): Observable<Singer[]> {
    const url = `/api/choirs/${choirId}/singers`;

    return this.http.get<Singer[]>(
      url,
      includeInactive
        ? { params: { includeInactive: true }, withCredentials: true }
        : { withCredentials: true }
    );
  }

  create(choirId: number, request: SingerRequest): Observable<Singer> {
    return this.auth.getCsrfToken().pipe(
      switchMap(token => this.http.post<Singer>(
        `/api/choirs/${choirId}/singers`,
        request,
        {
          headers: new HttpHeaders({ 'X-CSRF-TOKEN': token }),
          withCredentials: true
        }
      ))
    );
  }

  update(
    choirId: number,
    singerId: number,
    request: SingerRequest
  ): Observable<Singer> {
    return this.auth.getCsrfToken().pipe(
      switchMap(token => this.http.put<Singer>(
        `/api/choirs/${choirId}/singers/${singerId}`,
        request,
        {
          headers: new HttpHeaders({ 'X-CSRF-TOKEN': token }),
          withCredentials: true
        }
      ))
    );
  }

  deactivate(choirId: number, singerId: number): Observable<void> {
    return this.auth.getCsrfToken().pipe(
      switchMap(token => this.http.delete<void>(
        `/api/choirs/${choirId}/singers/${singerId}`,
        {
          headers: new HttpHeaders({ 'X-CSRF-TOKEN': token }),
          withCredentials: true
        }
      ))
    );
  }

  reactivate(choirId: number, singerId: number): Observable<Singer> {
    return this.auth.getCsrfToken().pipe(
      switchMap(token => this.http.post<Singer>(
        `/api/choirs/${choirId}/singers/${singerId}/reactivate`,
        {},
        {
          headers: new HttpHeaders({ 'X-CSRF-TOKEN': token }),
          withCredentials: true
        }
      ))
    );
  }
}
