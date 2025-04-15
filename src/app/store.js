import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});

// Subscribe to store updates to save cart state to sessionStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    const serializedCart = JSON.stringify(state.cart);
    sessionStorage.setItem('cart', serializedCart);
  } catch (e) {
    console.warn('Failed to save cart to sessionStorage:', e);
  }
});
