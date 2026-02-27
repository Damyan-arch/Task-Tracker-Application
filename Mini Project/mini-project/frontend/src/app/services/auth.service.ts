import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private platformId = inject(PLATFORM_ID); // Inject the platform ID

  constructor(private http: HttpClient) {}

  signUp(credentials: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/signup`, credentials);
  }

  signIn(credentials: any): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/signin`, credentials)
      .pipe(
        tap((response) => {
          // Save the token to browser storage
          localStorage.setItem('token', response.accessToken);
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Only access localStorage if we are in the browser
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false; // Default to false if running on the server
  }
}
