import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Singer } from './singer.model';
import { SingerRequest, SingersApiService } from './singers-api.service';

describe('SingersApiService', () => {
  let service: SingersApiService;
  let http: HttpTestingController;

  const singer: Singer = {
    id: 12,
    choirId: 7,
    displayName: 'Ana Prueba',
    email: 'ana@example.test',
    voicePart: 'Soprano',
    voiceSectionId: 3,
    mobility: null,
    restrictions: null,
    active: true
  };

  const requestBody: SingerRequest = {
    displayName: 'Ana Prueba',
    email: 'ana@example.test',
    voicePart: 'Soprano',
    voiceSectionId: 3,
    mobility: null,
    restrictions: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(SingersApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('lista integrantes activos por defecto', () => {
    let result: Singer[] | undefined;

    service.list(7).subscribe(value => result = value);

    const request = http.expectOne('/api/choirs/7/singers');

    expect(request.request.method).toBe('GET');
    expect(request.request.withCredentials).toBe(true);

    request.flush([singer]);

    expect(result).toEqual([singer]);
  });

  it('solicita integrantes inactivos explícitamente', () => {
    let result: Singer[] | undefined;

    service.list(7, true).subscribe(value => result = value);

    const request = http.expectOne(
      req => req.url === '/api/choirs/7/singers'
        && req.params.get('includeInactive') === 'true'
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.withCredentials).toBe(true);

    request.flush([singer]);

    expect(result).toEqual([singer]);
  });

  it('obtiene CSRF antes de crear un integrante', () => {
    let result: Singer | undefined;

    service.create(7, requestBody).subscribe(value => result = value);

    const csrf = http.expectOne('/api/auth/csrf');
    expect(csrf.request.method).toBe('GET');
    csrf.flush({ token: 'csrf-create' });

    const create = http.expectOne('/api/choirs/7/singers');

    expect(create.request.method).toBe('POST');
    expect(create.request.body).toEqual(requestBody);
    expect(create.request.headers.get('X-CSRF-TOKEN')).toBe('csrf-create');
    expect(create.request.withCredentials).toBe(true);

    create.flush(singer, { status: 201, statusText: 'Created' });

    expect(result).toEqual(singer);
  });

  it('obtiene CSRF antes de editar un integrante', () => {
    let result: Singer | undefined;

    service.update(7, 12, requestBody).subscribe(value => result = value);

    http.expectOne('/api/auth/csrf').flush({ token: 'csrf-update' });

    const update = http.expectOne('/api/choirs/7/singers/12');

    expect(update.request.method).toBe('PUT');
    expect(update.request.body).toEqual(requestBody);
    expect(update.request.headers.get('X-CSRF-TOKEN')).toBe('csrf-update');
    expect(update.request.withCredentials).toBe(true);

    update.flush(singer);

    expect(result).toEqual(singer);
  });

  it('obtiene CSRF antes de dar de baja lógicamente un integrante', () => {
    let completed = false;

    service.deactivate(7, 12).subscribe({
      complete: () => completed = true
    });

    http.expectOne('/api/auth/csrf').flush({ token: 'csrf-deactivate' });

    const deactivate = http.expectOne('/api/choirs/7/singers/12');

    expect(deactivate.request.method).toBe('DELETE');
    expect(deactivate.request.headers.get('X-CSRF-TOKEN'))
      .toBe('csrf-deactivate');
    expect(deactivate.request.withCredentials).toBe(true);

    deactivate.flush(null, { status: 204, statusText: 'No Content' });

    expect(completed).toBe(true);
  });

  it('obtiene CSRF antes de reactivar un integrante', () => {
    let result: Singer | undefined;

    service.reactivate(7, 12).subscribe(value => result = value);

    http.expectOne('/api/auth/csrf').flush({ token: 'csrf-reactivate' });

    const reactivate = http.expectOne(
      '/api/choirs/7/singers/12/reactivate'
    );

    expect(reactivate.request.method).toBe('POST');
    expect(reactivate.request.body).toEqual({});
    expect(reactivate.request.headers.get('X-CSRF-TOKEN'))
      .toBe('csrf-reactivate');
    expect(reactivate.request.withCredentials).toBe(true);

    reactivate.flush({ ...singer, active: true });

    expect(result).toEqual({ ...singer, active: true });
  });
});
