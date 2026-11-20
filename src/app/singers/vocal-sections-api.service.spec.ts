import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import {
  VocalSectionRequest,
  VocalSectionsApiService
} from './vocal-sections-api.service';
import { VocalSection } from './vocal-section.model';

describe('VocalSectionsApiService', () => {
  let service: VocalSectionsApiService;
  let http: HttpTestingController;

  const section: VocalSection = {
    id: 3,
    choirId: 7,
    name: 'Sopranos',
    sortOrder: 0,
    active: true,
    createdAt: null
  };

  const requestBody: VocalSectionRequest = {
    name: 'Sopranos',
    sortOrder: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(VocalSectionsApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('lista secciones activas por defecto', () => {
    let result: VocalSection[] | undefined;

    service.list(7).subscribe(value => result = value);

    const request = http.expectOne(
      req => req.url === '/api/choirs/7/vocal-sections'
        && req.params.get('activeOnly') === 'true'
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.withCredentials).toBe(true);

    request.flush([section]);

    expect(result).toEqual([section]);
  });

  it('permite consultar también las secciones inactivas', () => {
    let result: VocalSection[] | undefined;

    service.list(7, false).subscribe(value => result = value);

    const request = http.expectOne(
      req => req.url === '/api/choirs/7/vocal-sections'
        && req.params.get('activeOnly') === 'false'
    );

    request.flush([section]);

    expect(result).toEqual([section]);
  });

  it('crea una sección con protección CSRF', () => {
    let result: VocalSection | undefined;

    service.create(7, requestBody).subscribe(value => result = value);

    http.expectOne('/api/auth/csrf').flush({ token: 'csrf-create' });

    const create = http.expectOne('/api/choirs/7/vocal-sections');

    expect(create.request.method).toBe('POST');
    expect(create.request.body).toEqual(requestBody);
    expect(create.request.headers.get('X-CSRF-TOKEN')).toBe('csrf-create');
    expect(create.request.withCredentials).toBe(true);

    create.flush(section, { status: 201, statusText: 'Created' });

    expect(result).toEqual(section);
  });

  it('actualiza una sección con protección CSRF', () => {
    let result: VocalSection | undefined;

    service.update(7, 3, {
      ...requestBody,
      active: true
    }).subscribe(value => result = value);

    http.expectOne('/api/auth/csrf').flush({ token: 'csrf-update' });

    const update = http.expectOne('/api/choirs/7/vocal-sections/3');

    expect(update.request.method).toBe('PUT');
    expect(update.request.body).toEqual({
      ...requestBody,
      active: true
    });
    expect(update.request.headers.get('X-CSRF-TOKEN')).toBe('csrf-update');

    update.flush(section);

    expect(result).toEqual(section);
  });

  it('desactiva una sección con protección CSRF', () => {
    let completed = false;

    service.deactivate(7, 3).subscribe({
      complete: () => completed = true
    });

    http.expectOne('/api/auth/csrf').flush({ token: 'csrf-delete' });

    const request = http.expectOne('/api/choirs/7/vocal-sections/3');

    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers.get('X-CSRF-TOKEN')).toBe('csrf-delete');
    expect(request.request.withCredentials).toBe(true);

    request.flush(null, { status: 204, statusText: 'No Content' });

    expect(completed).toBe(true);
  });
});
