interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  isAvailable: boolean;
  quantity: number;
}

class Product implements Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  isAvailable: boolean;
  quantity: number;


  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = 15;
    this.isAvailable = true;
    this.quantity = 1;
  }
}

let cart: Product[] = [];

let appliedCoupon: string | null = null;

const validCoupons: Record<string, number> = {
  'CHIRAG10': 0.10,
  'SAVE20': 0.20,
};

function addToCart(product: Product) {
  const existing = cart.find(p => p.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push(product);
  }

  renderCart();
}

function removeFromCart(productId: string) {
  const index = cart.findIndex(p => p.id === productId);
  if (index > -1) {
    cart[index].quantity--;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }

  renderCart();
}

function applyCoupon(code: string) {
  const discount = validCoupons[code.toUpperCase()];
  const msgElem = document.getElementById("couponMessage")!;
  
  if (discount) {
    appliedCoupon = code.toUpperCase();
    msgElem.textContent = `Coupon "${appliedCoupon}" applied!`;
    msgElem.style.color = "green";
  } else {
    appliedCoupon = null;
    msgElem.textContent = `Invalid coupon code.`;
    msgElem.style.color = "red";
  }

  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartContainer')!;
  container.innerHTML = '';

  cart.forEach(product => {
    const div = document.createElement('div');
    div.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 10px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 8px;
    `;

    div.innerHTML = `
      <span><strong>${product.name}</strong> (x${product.quantity})</span>
      <button class="removeBtn" data-id="${product.id}" style="
        background-color: #ff4d4d;
        color: white;
        border: none;
        padding: 6px 10px;
        border-radius: 5px;
        cursor: pointer;
      ">Remove</button>
    `;

    container.appendChild(div);
  });

  document.querySelectorAll('.removeBtn').forEach(button => {
    const id = (button as HTMLElement).getAttribute('data-id');
    button.addEventListener('click', () => {
      if (id) removeFromCart(id);
    });
  });

  updateTotal();
}

function updateTotal() {
  const totalElement = document.getElementById('cartTotal')! as HTMLElement;
  // console.log(totalElement);
  const dataValue = totalElement.getAttribute('data-value');
  // console.log(dataValue);
  console.log(cart);
  const baseTotal = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  console.log(baseTotal);

  const discount = appliedCoupon ? validCoupons[appliedCoupon] : 0;
  const finalTotal = baseTotal - baseTotal * discount;

  totalElement.textContent = finalTotal.toFixed(2);
}

// Apply coupon button
document.getElementById("applyCouponBtn")?.addEventListener("click", () => {
  const input = document.getElementById("couponInput") as HTMLInputElement;
  applyCoupon(input.value);
});

// Data fetch and object creation
document.querySelectorAll('.addToCartBtn').forEach((button) => {
  button.addEventListener('click', () => {
    const productDiv = button.closest('.products');
    if (!productDiv) return;

    const id = productDiv.getAttribute('data-id') || '';
    const name = productDiv.querySelector('.productName')?.textContent?.trim() || '';
    const priceStr = productDiv.querySelector('.productPrice')?.textContent?.trim() || '0';
    const cleanedPrice = priceStr.replace(/[^\d.]/g, "");
    const price = parseFloat(cleanedPrice);
    const existing = cart.find(p => p.id === id);

    if (existing) {
      if (existing.quantity < existing.stock) {
        existing.quantity++;
      } else {
        alert("🛑 Cannot add more. Product is out of stock.");
        return;
      }
    } else {
      // Create new product and push to cart
      const newProduct = new Product(id, name, price);
      cart.push(newProduct);
    }

    // if (existing) {
    //   existing.quantity++;
    // } else {
    //   const product = new Product(id, name, price);
    //   cart.push(product);
    // }

    renderCart();
  });
});

// cart toggle
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById('showCartBtn');
  const cartSection = document.getElementById('cartSection');

  cartBtn?.addEventListener('click', () => {
    cartSection?.classList.toggle('open');
  });
});






























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
