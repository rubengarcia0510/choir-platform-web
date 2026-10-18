import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, finalize, map, of, switchMap, tap, throwError } from 'rxjs';

export interface DirectorSession {
  id: number;
  displayName: string;
  email: string;
}

interface CsrfResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = '/api/auth';

  readonly currentDirector = signal<DirectorSession | null>(null);
  readonly isAuthenticated = signal(false);
  readonly isLoading = signal(false);

  constructor(private readonly http: HttpClient) {}

  loadSession(): Observable<DirectorSession | null> {
    this.isLoading.set(true);

    return this.http.get<DirectorSession>(`${this.apiUrl}/me`, {
      withCredentials: true
    }).pipe(
      tap(director => this.setDirector(director)),
      catchError((error: HttpErrorResponse) => {
        this.setDirector(null);
        return of(null);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }

  login(email: string, password: string): Observable<DirectorSession> {
    this.isLoading.set(true);

    return this.fetchCsrfToken().pipe(
      switchMap(token =>
        this.http.post<DirectorSession>(
          `${this.apiUrl}/login`,
          { email, password },
          {
            headers: new HttpHeaders({ 'X-CSRF-TOKEN': token }),
            withCredentials: true
          }
        )
      ),
      tap(director => this.setDirector(director)),
      finalize(() => this.isLoading.set(false))
    );
  }

  logout(): Observable<void> {
    this.isLoading.set(true);

    return this.fetchCsrfToken().pipe(
      switchMap(token =>
        this.http.post<void>(
          `${this.apiUrl}/logout`,
          {},
          {
            headers: new HttpHeaders({ 'X-CSRF-TOKEN': token }),
            withCredentials: true
          }
        )
      ),
      tap(() => this.setDirector(null)),
      finalize(() => this.isLoading.set(false)),
      catchError(error => {
        this.setDirector(null);
        return throwError(() => error);
      })
    );
  }

  private fetchCsrfToken(): Observable<string> {
    return this.http.get<CsrfResponse>(`${this.apiUrl}/csrf`, {
      withCredentials: true
    }).pipe(
      map(response => {
        if (!response.token) {
          throw new Error('El backend no devolvió el token CSRF.');
        }
        return response.token;
      })
    );
  }

  clearSession(): void {
    this.setDirector(null);
  }

  private setDirector(director: DirectorSession | null): void {
    this.currentDirector.set(director);
    this.isAuthenticated.set(director !== null);
  }
}
