import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-18-primeng-app';
  constructor(public authService: AuthService) {}
  
  onSignIn(): void {
    const email = 'test@example.com';
    const password = '123456';
    this.authService.login(email, password).subscribe({
      next: (user) => {
        if (user) {
          alert(`Welcome, ${user.name}!`);
        } else {
          alert('Invalid email or password!');
        }
      },
      error: (err) => console.error(err),
    });
  }
}
