import { configureStore } from "@reduxjs/toolkit";
import productSlice from './../features/Products/ProductSlice';
import categoriesSlice from './../features/categories/CategorySlice';
const store = configureStore({
    reducer: {
        products: productSlice,
        categories: categoriesSlice
    },
})

export default store;