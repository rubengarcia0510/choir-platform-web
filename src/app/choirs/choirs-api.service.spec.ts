import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ChoirsApiService, ChoirRequest } from './choirs-api.service';
import { Choir } from './choir.model';

describe('ChoirsApiService', () => {
  let service: ChoirsApiService;
  let http: HttpTestingController;

  const requestBody: ChoirRequest = {
    name: 'Coro Aurora',
    description: 'Coro principal'
  };

  const choir: Choir = {
    id: 7,
    name: 'Coro Aurora',
    description: 'Coro principal',
    archived: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ChoirsApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('lista todos los coros incluyendo los archivados', () => {
    let result: Choir[] | undefined;

    service.list().subscribe(value => result = value);

    const request = http.expectOne(
      req => req.url === '/api/choirs'
        && req.params.get('includeArchived') === 'true'
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.withCredentials).toBe(true);
    request.flush([choir]);

    expect(result).toEqual([choir]);
  });

  it('obtiene CSRF antes de crear y envía el token', () => {
    let result: Choir | undefined;

    service.create(requestBody).subscribe(value => result = value);

    const csrf = http.expectOne('/api/auth/csrf');
    expect(csrf.request.method).toBe('GET');
    expect(csrf.request.withCredentials).toBe(true);
    csrf.flush({ token: 'csrf-create' });

    const create = http.expectOne('/api/choirs');
    expect(create.request.method).toBe('POST');
    expect(create.request.body).toEqual(requestBody);
    expect(create.request.headers.get('X-CSRF-TOKEN')).toBe('csrf-create');
    expect(create.request.withCredentials).toBe(true);
    create.flush(choir, { status: 201, statusText: 'Created' });

    expect(result).toEqual(choir);
  });

  it('obtiene CSRF antes de editar y envía el token', () => {
    let result: Choir | undefined;

    service.update(7, requestBody).subscribe(value => result = value);

    http.expectOne('/api/auth/csrf').flush({ token: 'csrf-update' });

    const update = http.expectOne('/api/choirs/7');
    expect(update.request.method).toBe('PUT');
    expect(update.request.body).toEqual(requestBody);
    expect(update.request.headers.get('X-CSRF-TOKEN')).toBe('csrf-update');
    expect(update.request.withCredentials).toBe(true);
    update.flush(choir);

    expect(result).toEqual(choir);
  });

  it('obtiene CSRF antes de archivar y envía el token', () => {
    let completed = false;

    service.archive(7).subscribe({
      complete: () => completed = true
    });

    http.expectOne('/api/auth/csrf').flush({ token: 'csrf-archive' });

    const archive = http.expectOne('/api/choirs/7');
    expect(archive.request.method).toBe('DELETE');
    expect(archive.request.headers.get('X-CSRF-TOKEN')).toBe('csrf-archive');
    expect(archive.request.withCredentials).toBe(true);
    archive.flush(null, { status: 204, statusText: 'No Content' });

    expect(completed).toBe(true);
  });
});
