import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RegisterPostData, User } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUserDetails(email: string, password: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3000';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  /** 
   * Register a new user.
   * @param postData - User data to register.
   */
  registerUser(postData: RegisterPostData): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, postData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Login a user by verifying email and password.
   * @param email - User's email.
   * @param password - User's password.
   */
  login(email: string, password: string): Observable<User | null> {
    return this.http
      .get<User[]>(`${this.baseUrl}/users?email=${email}&password=${password}`)
      .pipe(
        map((users: User[]) => {
          if (users.length > 0) {
            const user = users[0];
            this.storeToken(user.token); // Store the token
            return user;
          }
          return null; // Login failed
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(() => new Error('Invalid email or password'));
        })
      );
  }
  /**
   * Logout the user by clearing the token.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Check if the user is logged in.
   * @returns true if token exists, otherwise false.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Get the stored token from local storage.
   * @returns The authentication token or null.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Helper method to store token in local storage.
   * @param token - The token to store.
   */
  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Handle HTTP errors.
   * @param error - The HTTP error response.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
