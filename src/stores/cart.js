import { writable, derived } from 'svelte/store';

const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
export const cart = writable(storedCart);

cart.subscribe(value => {
  localStorage.setItem('cart', JSON.stringify(value));
});

// Contar el número total de productos (considerando cantidades)
export const totalProducts = derived(cart, $cart =>
  $cart.reduce((total, item) => total + item.quantity, 0)
);

// Contar el número de productos diferentes en el carrito
export const productCount = derived(cart, $cart => $cart.length);

export function addToCart(producto) {
  cart.update(items => {
    const existingItem = items.find(item => item.id === producto.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({ ...producto, quantity: 1 });
    }
    return items;
  });
}

export function incrementQuantity(productoId) {
  cart.update(items => {
    const item = items.find(item => item.id === productoId);
    if (item) {
      item.quantity += 1;
    }
    return items;
  });
}

export function decrementQuantity(productoId) {
  cart.update(items => {
    let itemsUpdated = items;
    const item = items.find(item => item.id === productoId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    } else {
      itemsUpdated = items.filter(item => item.id !== productoId);
    }
    return itemsUpdated;
  });
}

export function vaciarCarrito() {
  localStorage.removeItem('cart');
  cart.set([]);
}
