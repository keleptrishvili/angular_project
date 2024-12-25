import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RegisterPostData, User } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Ensure this matches json-server's URL

  constructor(private http: HttpClient) {}

  /**
   * Register a new user.
   * @param postData - User data to register.
   */
  registerUser(postData: RegisterPostData): Observable<User> {
    console.log('Registering user with data:', postData); // Debug log
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
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}&password=${password}`).pipe( // Use query parameters to search for user
      map((users: User[]) => {
        if (users.length > 0) {
          return users[0]; // User found
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
