import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Choir } from './choir.model';

@Injectable({ providedIn: 'root' })
export class ChoirsApiService {
  private readonly http = inject(HttpClient);

  list(): Observable<Choir[]> {
    return this.http.get<Choir[]>('/api/choirs', {
      withCredentials: true
    });
  }
}
