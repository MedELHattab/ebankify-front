import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/auth/login'; // Backend URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const credentials = { email, password };
    return this.http.post<LoginResponse>(this.apiUrl, credentials);
  }
}
