import { configureStore } from '@reduxjs/toolkit';
import categorySlice from '../reducers/category';
import authSlice from '../reducers/auth';
import cartSlice from '../reducers/cart';
import langSlice from '../reducers/lang';
import uiSlice from '../reducers/ui';
import subcategorySlice from '../reducers/sub-category';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    lang: langSlice.reducer,
    category: categorySlice.reducer,
    subCategory: subcategorySlice.reducer,
  },
});
export default store;
