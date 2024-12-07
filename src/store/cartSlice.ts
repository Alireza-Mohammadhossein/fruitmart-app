import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  total: number;
};

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
      state.total += action.payload.price;
    },
    removeItem(state, action: PayloadAction<string>) {
      const existingItem = state.items.find(item => item.name === action.payload);
      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity -= 1;
        state.total -= existingItem.price;
        if (existingItem.quantity === 0) {
          state.items = state.items.filter(item => item.name !== action.payload);
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
