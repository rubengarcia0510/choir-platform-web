import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Concert,
  ConcertRepertoireEntry,
  CreateFormationRequest,
  CreateFormationResponse,
  FormationDraft,
  FormationSummary,
  SaveFormationDraftPositionsRequest
} from './formation-draft.model';

@Injectable({ providedIn: 'root' })
export class FormationDraftsApiService {
  private readonly http = inject(HttpClient);

  listConcerts(choirId: number): Observable<Concert[]> {
    return this.http.get<Concert[]>(
      `/api/choirs/${choirId}/concerts`,
      { withCredentials: true }
    );
  }

  listConcertRepertoire(
    choirId: number,
    concertId: number
  ): Observable<ConcertRepertoireEntry[]> {
    return this.http.get<ConcertRepertoireEntry[]>(
      `/api/choirs/${choirId}/concerts/${concertId}/repertoire`,
      { withCredentials: true }
    );
  }

  listFormations(
    choirId: number,
    concertId: number,
    repertoireItemId: number
  ): Observable<FormationSummary[]> {
    return this.http.get<FormationSummary[]>(
      this.repertoireFormationsUrl(choirId, concertId, repertoireItemId),
      { withCredentials: true }
    );
  }

  createFormation(
    choirId: number,
    concertId: number,
    repertoireItemId: number,
    request: CreateFormationRequest
  ): Observable<CreateFormationResponse> {
    return this.http.post<CreateFormationResponse>(
      this.repertoireFormationsUrl(choirId, concertId, repertoireItemId),
      request,
      { withCredentials: true }
    );
  }

  getDraft(
    choirId: number,
    concertId: number,
    repertoireItemId: number,
    formationId: number
  ): Observable<FormationDraft> {
    return this.http.get<FormationDraft>(
      `${this.repertoireFormationsUrl(choirId, concertId, repertoireItemId)}/${formationId}/draft`,
      { withCredentials: true }
    );
  }

  saveDraftPositions(
    choirId: number,
    concertId: number,
    repertoireItemId: number,
    formationId: number,
    versionId: number,
    request: SaveFormationDraftPositionsRequest
  ): Observable<FormationDraft> {
    return this.http.put<FormationDraft>(
      `${this.repertoireFormationsUrl(choirId, concertId, repertoireItemId)}/${formationId}/versions/${versionId}/positions`,
      request,
      { withCredentials: true }
    );
  }

  private repertoireFormationsUrl(
    choirId: number,
    concertId: number,
    repertoireItemId: number
  ): string {
    return `/api/choirs/${choirId}/concerts/${concertId}/repertoire/${repertoireItemId}/formations`;
  }
}
