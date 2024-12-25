import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private router = inject(Router);

  userName: string = '';

  constructor() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userName = user.name || 'Guest'; // Default to 'Guest' if no user data is found
  } 
  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userName = user.name; // or whichever property you need
  }  
  
  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  products = [
    { name: 'Product 1', image: 'photo.png' },
    { name: 'Product 2', image: 'Rectangle 28.png' },
    { name: 'Product 3', image: 'Rectangle 28 (1).png' },
    { name: 'Product 4', image: 'Rectangle 28 (2).png' },
  ];
}
