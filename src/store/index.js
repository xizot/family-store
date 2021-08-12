import { configureStore } from '@reduxjs/toolkit';
import adminCategorySlice from '../reducers/admin-category';
import authSlice from '../reducers/auth';
import cartSlice from '../reducers/cart';
import langSlice from '../reducers/lang';
import uiSlice from '../reducers/ui';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    lang: langSlice.reducer,
    adminCategory: adminCategorySlice.reducer,
  },
});
export default store;
