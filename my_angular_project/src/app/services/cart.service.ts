// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = []; // Cart array to hold products

  constructor() {}

  // Add product to cart
  addToCart(product: any) {
    this.cart.push(product);
    this.saveCart();
  }

  // Remove product from cart
  removeFromCart(productId: number) {
    this.cart = this.cart.filter((product) => product.id !== productId);
    this.saveCart();
  }

  // Get all cart items
  getCartItems() {
    return this.cart;
  }

  // Save cart to sessionStorage
  private saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // Load cart from sessionStorage
  loadCart() {
    const cart = sessionStorage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart);
    }
  }
}
