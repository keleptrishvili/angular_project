import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login = {
    email: '',
    password: '',
  };

  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  onLogin() {
    const { email, password } = this.login;
    if (!email || !password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Missing Information',
        detail: 'Please provide both email and password',
      });
      return;
    }

    this.authService.login(email, password).subscribe({
      next: (response) => {
        if (response) {
          console.log('Login successful:', response);
          sessionStorage.setItem('user', JSON.stringify(response)); // Save user info
          this.router.navigate(['home']); // Navigate to the home page
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Invalid Credentials',
            detail: 'The email or password you entered is incorrect.',
          });
          console.log('Invalid credentials');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'An error occurred while trying to log you in. Please try again.',
        });
      },
    });
  }
}
