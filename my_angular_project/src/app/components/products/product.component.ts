// src/app/components/product/product.component.ts
import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() product: any;

  constructor(private cartService: CartService) {}

  // Add product to cart
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
