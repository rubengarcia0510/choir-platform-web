import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { Singer } from './singer.model';
import { SingersStore } from './singers.store';

describe('SingersStore', () => {
  let store: InstanceType<typeof SingersStore>;
  let http: HttpTestingController;

  const singer: Singer = {
    id: 7,
    choirId: 10,
    displayName: 'Integrante de prueba',
    email: null,
    voicePart: 'Mezzosoprano',
    voiceSectionId: 3,
    mobility: null,
    restrictions: null,
    active: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    store = TestBed.inject(SingersStore);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('loads and caches singers for a choir', () => {
    store.loadSingers(10);

    const request = http.expectOne('/api/choirs/10/singers');
    expect(request.request.method).toBe('GET');
    expect(request.request.withCredentials).toBe(true);

    request.flush([singer]);

    expect(store.singersByChoir()['10']).toEqual([singer]);
    expect(store.loadedChoirIds()['10']).toBe(true);
    expect(store.loadingByChoir()['10']).toBe(false);

    store.loadSingers(10);
    http.expectNone('/api/choirs/10/singers');
  });

  it('keeps the cache isolated between choirs', () => {
    store.loadSingers(10);
    store.loadSingers(20);

    http.expectOne('/api/choirs/10/singers').flush([singer]);
    http.expectOne('/api/choirs/20/singers').flush([]);

    expect(store.singersByChoir()['10']).toEqual([singer]);
    expect(store.singersByChoir()['20']).toEqual([]);
  });

  it('does not send duplicate concurrent requests for the same choir', () => {
    store.loadSingers(10);
    store.loadSingers(10);

    const requests = http.match('/api/choirs/10/singers');
    expect(requests.length).toBe(1);

    requests[0].flush([singer]);
  });

  it('records a loading error and allows retrying', () => {
    store.loadSingers(10);

    http.expectOne('/api/choirs/10/singers').flush(
      { message: 'Error de prueba' },
      { status: 500, statusText: 'Server Error' }
    );

    expect(store.errorsByChoir()['10']).toBeTruthy();
    expect(store.loadingByChoir()['10']).toBe(false);
    expect(store.loadedChoirIds()['10']).toBeUndefined();

    store.loadSingers(10);

    http.expectOne('/api/choirs/10/singers').flush([singer]);

    expect(store.singersByChoir()['10']).toEqual([singer]);
    expect(store.errorsByChoir()['10']).toBeNull();
  });

  it('ignores invalid choir identifiers', () => {
    store.loadSingers(0);
    store.loadSingers(-1);

    http.expectNone((request) => request.url.includes('/singers'));
    expect(store.singersByChoir()).toEqual({});
  });
});
