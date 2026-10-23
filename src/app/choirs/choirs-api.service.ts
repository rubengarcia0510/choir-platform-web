import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Choir } from './choir.model';

export interface ChoirRequest {
  name: string;
  description: string | null;
}

@Injectable({ providedIn: 'root' })
export class ChoirsApiService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly baseUrl = '/api/choirs';

  list(): Observable<Choir[]> {
    return this.http.get<Choir[]>(this.baseUrl, {
      params: { includeArchived: true },
      withCredentials: true
    });
  }

  create(request: ChoirRequest): Observable<Choir> {
    return this.auth.getCsrfToken().pipe(
      switchMap(token => this.http.post<Choir>(this.baseUrl, request, {
        headers: new HttpHeaders({ 'X-CSRF-TOKEN': token }),
        withCredentials: true
      }))
    );
  }

  update(choirId: number, request: ChoirRequest): Observable<Choir> {
    return this.auth.getCsrfToken().pipe(
      switchMap(token => this.http.put<Choir>(
        `${this.baseUrl}/${choirId}`,
        request,
        {
          headers: new HttpHeaders({ 'X-CSRF-TOKEN': token }),
          withCredentials: true
        }
      ))
    );
  }

  archive(choirId: number): Observable<void> {
    return this.auth.getCsrfToken().pipe(
      switchMap(token => this.http.delete<void>(
        `${this.baseUrl}/${choirId}`,
        {
          headers: new HttpHeaders({ 'X-CSRF-TOKEN': token }),
          withCredentials: true
        }
      ))
    );
  }
}
