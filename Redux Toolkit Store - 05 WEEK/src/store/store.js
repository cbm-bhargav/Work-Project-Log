import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishListReducer from './wishListSlice';
import productReducer from './productSlice';
const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishList: wishListReducer,
        product: productReducer,
    },
});

export default store;