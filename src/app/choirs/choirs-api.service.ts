import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Choir } from './choir.model';

export interface ChoirRequest {
  name: string;
  description: string | null;
}

@Injectable({ providedIn: 'root' })
export class ChoirsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/choirs';

  list(): Observable<Choir[]> {
    return this.http.get<Choir[]>(this.baseUrl, {
      params: { includeArchived: true },
      withCredentials: true
    });
  }

  create(request: ChoirRequest): Observable<Choir> {
    return this.http.post<Choir>(this.baseUrl, request, {
      withCredentials: true
    });
  }

  update(choirId: number, request: ChoirRequest): Observable<Choir> {
    return this.http.put<Choir>(`${this.baseUrl}/${choirId}`, request, {
      withCredentials: true
    });
  }

  archive(choirId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${choirId}`, {
      withCredentials: true
    });
  }
}
