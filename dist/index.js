"use strict";
console.log("hey");
// // model ts file or types file
// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   stock: number;
//   isAvailable: boolean;
//   quantity: number;
// }
// export type CouponCode = "AMITI10" | "WELCOME15" | "CHIRAG25";
// export const Coupons: Record<CouponCode, number> = {
//   AMITI10: 10,
//   WELCOME15: 15,
//   CHIRAG25: 25,
// };
// // cart ts file
// import { Product, CouponCode, Coupons } from "../models/types";
// export class Cart {
//   private items: CartItem[] = [];
//   private discount: number = 0;
//   addProduct(product: Product, quantity: number = 1): void {
//     if (!product.isAvailable || product.stock < quantity) {
//       console.warn("Product not available or out of stock.");
//       return;
//     }
//     const existingItem = this.items.find(item => item.product.id === product.id);
//     if (existingItem) {
//       this.updateQuantity(product.id, existingItem.quantity + quantity);
//     } else {
//       this.items.push({ product, quantity });
//     }
//   }
//   updateQuantity(productId: string, quantity: number): void {
//     const item = this.items.find(item => item.product.id === productId);
//     if (!item) return;
//     if (quantity <= 0) {
//       this.removeProduct(productId);
//     } else if (item.product.stock >= quantity) {
//       item.quantity = quantity;
//     } else {
//       console.warn("Not enough stock.");
//     }
//   }
//   removeProduct(productId: string): void {
//     this.items = this.items.filter(item => item.product.id !== productId);
//   }
//   applyCoupon(code: string): void {
//     if (code in Coupons) {
//       this.discount = Coupons[code as CouponCode];
//     } else {
//       console.warn("Invalid coupon code.");
//       this.discount = 0;
//     }
//   }
//   getTotal(): number {
//     const subtotal = this.items.reduce((total, item) =>
//       total + item.product.price * item.quantity, 0);
//     return subtotal * (1 - this.discount / 100);
//   }
//   viewCart(): CartItem[] {
//     return this.items;
//   }
// }
// // indexedDB.ts file
// import { Cart } from "./cart/cart";
// import { Product } from "./models/types";
// const product1: Product = {
//   id: "p1",
//   name: "Sneakers",
//   price: 100,
//   stock: 10,
//   isAvailable: true,
// };
// const product2: Product = {
//   id: "p2",
//   name: "Hat",
//   price: 25,
//   stock: 5,
//   isAvailable: true,
// };
// const cart = new Cart();
// cart.addProduct(product1, 2);
// cart.addProduct(product2, 1);
// cart.updateQuantity("p2", 3);
// cart.applyCoupon("WELCOME15");
// console.log(cart.viewCart());
// console.log("Total:", cart.getTotal());
