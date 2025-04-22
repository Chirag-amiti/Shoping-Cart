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
  // console.log(cart);
  const baseTotal = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  // console.log(baseTotal);

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
