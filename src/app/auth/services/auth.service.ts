import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.baseUrl;
  private apiUrl = `${this.baseUrl}/auth`;
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(tap(res => {
        localStorage.setItem(this.tokenKey, res.access_token);
      }));
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }
}
