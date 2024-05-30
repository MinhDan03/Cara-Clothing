import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {listProduct: [],},
  reducers: {
    addToCart: (state, action) => {
        const { id, name, price, img,  quantity } = action.payload;
        // console.log(id, name, price, quantity, img);
        const existingProduct = state.listProduct.find(item => item.id === id);
  
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          state.listProduct.push({
            id,
            name,
            price,
            img,
            quantity,
          });
        }
      },
      updateQuantity: (state, action) => {
        const { productId, newQuantity } = action.payload;
        const product = state.listProduct.find(item => item.id === productId);
        if (product) {
          product.quantity = newQuantity;
        }
      },
      removeFromCart: (state, action) => {
        const productId = action.payload;
        state.listProduct = state.listProduct.filter(item => item.id !== productId);
      },
      clearCart: (state) => {
        state.listProduct = [];
      },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;