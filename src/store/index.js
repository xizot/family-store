import { configureStore } from '@reduxjs/toolkit';
import categorySlice from '../reducers/category';
import authSlice from '../reducers/auth';
import cartSlice from '../reducers/cart';
import langSlice from '../reducers/lang';
import uiSlice from '../reducers/ui';
import subcategorySlice from '../reducers/sub-category';
import adminProductSlice from '../reducers/product';
import userCategorySlice from '../reducers/user-category.reducer';
import userProductSlice from '../reducers/user-product.reducer';
import userCommentSlice from '../reducers/user-comment.reducer';
// import userCartSlice from '../reducers/user-cart.reducer';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    lang: langSlice.reducer,
    category: categorySlice.reducer,
    subCategory: subcategorySlice.reducer,
    product: adminProductSlice.reducer,
    userCategory: userCategorySlice.reducer,
    userProduct: userProductSlice.reducer,
    userComment: userCommentSlice.reducer,
    // userCart: userCartSlice.reducer,
  },
});
export default store;
