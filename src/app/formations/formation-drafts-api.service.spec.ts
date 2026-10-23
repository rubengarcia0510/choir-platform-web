import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { FormationDraftsApiService } from './formation-drafts-api.service';

describe('FormationDraftsApiService', () => {
  let service: FormationDraftsApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(FormationDraftsApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('lista los conciertos del coro', () => {
    service.listConcerts(10).subscribe();

    const request = http.expectOne('/api/choirs/10/concerts');

    expect(request.request.method).toBe('GET');
    expect(request.request.withCredentials).toBe(true);

    request.flush([]);
  });

  it('lista las obras del concierto seleccionado', () => {
    service.listConcertRepertoire(10, 20).subscribe();

    const request = http.expectOne(
      '/api/choirs/10/concerts/20/repertoire'
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.withCredentials).toBe(true);

    request.flush([]);
  });

  it('lista formaciones de una inclusión concreta del repertorio', () => {
    service.listFormations(10, 20, 30).subscribe();

    const request = http.expectOne(
      '/api/choirs/10/concerts/20/repertoire/30/formations'
    );

    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('crea una formación dentro de la inclusión seleccionada', () => {
    const body = {
      name: 'Distribución inicial',
      description: 'Borrador de prueba'
    };

    service.createFormation(10, 20, 30, body).subscribe();

    const request = http.expectOne(
      '/api/choirs/10/concerts/20/repertoire/30/formations'
    );

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(body);

    request.flush({
      id: 40,
      name: body.name,
      description: body.description,
      draftVersionId: 50,
      versionNumber: 1,
      status: 'DRAFT'
    });
  });

  it('carga el borrador de la formación', () => {
    service.getDraft(10, 20, 30, 40).subscribe();

    const request = http.expectOne(
      '/api/choirs/10/concerts/20/repertoire/30/formations/40/draft'
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.withCredentials).toBe(true);

    request.flush({
      formationId: 40,
      name: 'Distribución inicial',
      description: null,
      draftVersionId: 50,
      versionNumber: 1,
      status: 'DRAFT',
      notes: null,
      createdAt: null,
      positions: []
    });
  });

  it('guarda las posiciones usando el identificador de versión', () => {
    const body = {
      positions: [
        {
          singerId: 7,
          positionLabel: 'Centro',
          x: 25,
          y: 60
        }
      ]
    };

    service.saveDraftPositions(
      10, 20, 30, 40, 50, body
    ).subscribe();

    const request = http.expectOne(
      '/api/choirs/10/concerts/20/repertoire/30/formations/40/versions/50/positions'
    );

    expect(request.request.method).toBe('PUT');
    expect(request.request.withCredentials).toBe(true);
    expect(request.request.body).toEqual(body);

    request.flush({
      formationId: 40,
      name: 'Distribución inicial',
      description: null,
      draftVersionId: 50,
      versionNumber: 1,
      status: 'DRAFT',
      notes: null,
      createdAt: null,
      positions: [
        {
          id: 60,
          singerId: 7,
          singerNameSnapshot: 'Ana',
          voicePartSnapshot: 'Soprano',
          voiceSectionIdSnapshot: null,
          voiceSectionNameSnapshot: null,
          divisionNumberSnapshot: null,
          positionLabel: 'Centro',
          x: 25,
          y: 60
        }
      ]
    });
  });
});
