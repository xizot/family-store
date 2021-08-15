import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isOpenCart: false,
    isOpenSideBar: false,
  },
  reducers: {
    toggleCartModal(state) {
      state.isOpenSideBar = false;
      state.isOpenCart = !state.isOpenCart;
    },
    toggleSideBar(state) {
      state.isOpenCart = false;
      state.isOpenSideBar = !state.isOpenSideBar;
    },
    hideModal(state) {
      state.isOpenCart = false;
      state.isOpenSideBar = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
