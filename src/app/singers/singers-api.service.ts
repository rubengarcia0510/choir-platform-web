import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Singer } from './singer.model';

@Injectable({ providedIn: 'root' })
export class SingersApiService {
  private readonly http = inject(HttpClient);

  list(choirId: number): Observable<Singer[]> {
    return this.http.get<Singer[]>(
      `/api/choirs/${choirId}/singers`,
      { withCredentials: true }
    );
  }
}
