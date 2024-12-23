import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { passwordMismatchValidator } from '../../shared/password-mismatch.directive';
import { AuthService } from '../../services/auth.service';
import { RegisterPostData } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private registerService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  // Reactive form for user registration
  registerForm = new FormGroup(
    {
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/),
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: passwordMismatchValidator, // Custom validator for password mismatch
    }
  );

  // Method to handle user registration
  onRegister() {
    if (this.registerForm.valid) {
      // Prepare form data for submission
      const postData = { ...this.registerForm.value };
      delete postData.confirmPassword; // Remove confirmPassword field
      console.log('Sending registration data:', postData);

      // Call the AuthService to register the user
      this.registerService.registerUser(postData as RegisterPostData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registered successfully',
          });
          this.router.navigate(['login']); // Navigate to login page
        },
        error: (err) => {
          console.error('Registration failed:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong',
          });
        },
      });
    } else {
      console.log('Form is invalid:', this.registerForm.value);
    }
  }

  // Getters for form controls (used in template for validation messages)
  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
}
