import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isRequesting: false,
        regSuccessMessage: null,
        resErrorMessage: null,
    },
    reducers: {
        sendRequest(state) {
            state.isRequesting = true;
            state.resErrorMessage = null;
        },
        // verifiedToken(state) {
        //     state.isAuthenticated = true;
        //     state.accessToken = localStorage.getItem("accessToken");
        //     state.refreshToken = localStorage.getItem("refreshToken");
        //     state.resErrorMessage = null;
        // },
        loginSucceeded(state, action) {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            state.isAuthenticated = true;
            state.resErrorMessage = null;
            state.isRequesting = false;
        },
        responseError(state, action) {
            state.resErrorMessage = action.payload;
            state.isRequesting = false;
        },
        registerSucceeded(state, action) {
            state.regSuccessMessage = action.payload;
            state.isRequesting = false;
        },
        logout(state) {
            state.isAuthenticated = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
        resetError(state) {
            state.resErrorMessage = null;
        },
        resetState(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.registerSuccessMessage = null;
            state.resErrorMessage = null;
            state.isRequesting = false;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
