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
    reduceStock(state, action: PayloadAction<string>) {
      if (state[action.payload] > 0) {
        state[action.payload] -= 1;
      }
    },
    increaseStock(state, action: PayloadAction<{ name: string; quantity: number }>) {
      state[action.payload.name] += action.payload.quantity;
    },
    resetStock() {
      return initialState;
    },
    updateStock(state, action: PayloadAction<StockState>) {
      return action.payload; // Replace stock with fetched levels
    },
  },
});

export const { reduceStock, increaseStock, resetStock, updateStock } = stockSlice.actions;
export default stockSlice.reducer;


