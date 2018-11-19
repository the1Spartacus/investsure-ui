import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export  class AuthenticationService {
  constructor(private http: HttpClient) { }

    AuthenticateRequest(RequestId: string): Observable<boolean> {
    return this.http.post<{token: string}>('/api/auth', {RequestId: RequestId})
      .pipe(
        map(result => {
          sessionStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  terminateSession() {
    sessionStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    return (sessionStorage.getItem('access_token') !== null);
  }
}
