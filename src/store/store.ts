import { configureStore } from '@reduxjs/toolkit';
import { Reducer } from 'redux';
import cartReducer from './cartSlice';
import stockReducer from './stockSlice';

const STORE_STORAGE_KEY = 'fruitmart_state';

const loadPersistedState = () => {
  try {
    const serializedState = localStorage.getItem(STORE_STORAGE_KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Failed to load persisted state from localStorage:', error);
    return undefined;
  }
};

const savePersistedState = (state: unknown) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORE_STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Failed to save persisted state to localStorage:', error);
  }
};

type CartState = ReturnType<typeof cartReducer>;
type StockState = ReturnType<typeof stockReducer>;

type PersistedState = {
  cart: CartState;
  stock: StockState;
};

const reducer: {
  cart: Reducer<CartState | undefined, any>;
  stock: Reducer<StockState | undefined, any>;
} = {
  cart: cartReducer as Reducer<CartState | undefined, any>,
  stock: stockReducer as Reducer<StockState | undefined, any>,
};

const preloadedState = loadPersistedState() as Partial<PersistedState> | undefined;

const store = configureStore({
  reducer,
  preloadedState,
});

store.subscribe(() => {
  const { cart, stock } = store.getState();
  savePersistedState({ cart, stock });
});

export type RootState = PersistedState;
export type AppDispatch = typeof store.dispatch;

export default store;
