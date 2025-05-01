// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from '../services/poductsApi';
import { customerApi } from '../services/customerApi'; // fixed here

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(customerApi.middleware), 
});

setupListeners(store.dispatch);

