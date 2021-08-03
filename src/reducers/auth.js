import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../apis/auth";

const initialState = {
	accessToken: null,
	refreshToken: null,
	isAuthenticated: false,
	loading: false,
	user: null,
	error: null,
};

export const login = createAsyncThunk(
	"user/Login",
	async ({ username, password }, { rejectWithValue }) => {
		try {
			const response = await authApi.login({ username, password });
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
export const register = createAsyncThunk(
	"user/Register",
	async (
		{ username, password, email, fullName, phoneNumber, role = "ADM" },
		{ rejectWithValue }
	) => {
		try {
			const response = await authApi.register({
				username,
				password,
				email,
				fullName,
				phoneNumber,
				role,
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout(state) {
			state.isAuthenticated = false;
			state.accessToken = null;
			state.user = null;
			localStorage.removeItem("accessToken");
			localStorage.removeItem("user");
		},
		loginVerified(state, action) {
			const { accessToken, user } = action.payload;
			state.isAuthenticated = true;
			state.accessToken = accessToken;
			state.user = user;
		},
	},
	extraReducers: {
		[login.pending]: (state) => {
			state.loading = true;
		},
		[login.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload.errorMessage;
		},
		[login.fulfilled]: (state, action) => {
			const { user, token } = action.payload.data;
			state.loading = false;
			state.accessToken = token;
			state.user = user;
			state.isAuthenticated = true;

			localStorage.setItem("accessToken", token);
			localStorage.setItem("user", JSON.stringify(user));
		},
		[register.pending]: (state) => {
			state.loading = true;
		},
		[register.rejected]: (state, action) => {
			state.loading = false;
			console.log(action.payload);
			state.error = action.payload.errorMessage;
		},
		[register.fulfilled]: (state) => {
			state.loading = false;
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice;
