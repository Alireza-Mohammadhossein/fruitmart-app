import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import stockReducer from './stockSlice';


const store = configureStore ({
  reducer: {
    cart: cartReducer,
    stock: stockReducer
  }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
