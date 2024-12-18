import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StockState = {
  [key: string]: number;
};

// const initialState: StockState = {
//   apple: 0,
//   orange: 0,
//   mango: 0,
// };

const initialState: StockState = {};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    reduceStock(state, action: PayloadAction<number>) {
      if (state[action.payload] > 0) {
        state[action.payload] -= 1;
      }
    },

    increaseStock(state, action: PayloadAction<{ id:number, quantity: number }>) {
      state[action.payload.id] += action.payload.quantity;
    },
    
    updateStock(state, action: PayloadAction<StockState>) {
      return action.payload; // Replace stock with fetched levels
    },
  },
});

export const { reduceStock, increaseStock, updateStock } = stockSlice.actions;
export default stockSlice.reducer;


