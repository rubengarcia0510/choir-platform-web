import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { VocalSection } from './vocal-section.model';

export interface VocalSectionRequest {
  name: string;
  sortOrder: number;
}

export interface UpdateVocalSectionRequest extends VocalSectionRequest {
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class VocalSectionsApiService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  list(choirId: number, activeOnly = true): Observable<VocalSection[]> {
    return this.http.get<VocalSection[]>(
      `/api/choirs/${choirId}/vocal-sections`,
      {
        params: { activeOnly },
        withCredentials: true
      }
    );
  }

  create(
    choirId: number,
    request: VocalSectionRequest
  ): Observable<VocalSection> {
    return this.auth.getCsrfToken().pipe(
      switchMap(token => this.http.post<VocalSection>(
        `/api/choirs/${choirId}/vocal-sections`,
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
    sectionId: number,
    request: UpdateVocalSectionRequest
  ): Observable<VocalSection> {
    return this.auth.getCsrfToken().pipe(
      switchMap(token => this.http.put<VocalSection>(
        `/api/choirs/${choirId}/vocal-sections/${sectionId}`,
        request,
        {
          headers: new HttpHeaders({ 'X-CSRF-TOKEN': token }),
          withCredentials: true
        }
      ))
    );
  }

  deactivate(choirId: number, sectionId: number): Observable<void> {
    return this.auth.getCsrfToken().pipe(
      switchMap(token => this.http.delete<void>(
        `/api/choirs/${choirId}/vocal-sections/${sectionId}`,
        {
          headers: new HttpHeaders({ 'X-CSRF-TOKEN': token }),
          withCredentials: true
        }
      ))
    );
  }
}
