// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './components/slices/cartSlice'; 
import authSlice from './features/auth/authSlice';
import authAdminSlice from './features/auth/authAdminSlice';
const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    authAdmin: authAdminSlice
  },
});

export default store;