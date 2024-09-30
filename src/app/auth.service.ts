import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient, private router: Router) { }

  // Mock user auth
  login(username: string, password: string): Observable<any> {
    const mockResponse = { token: 'fake-jwt-token', username};
    this.isAuthenticated.next(true);
    localStorage.setItem('user', JSON.stringify(mockResponse));
    return this.isAuthenticated;
  }

  register(username: string, password: string): Observable<any> {
    // sim registration
    const mockResponse = { success: true, message: 'Registration successful'};
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  logout() {
    this.isAuthenticated.next(false);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
