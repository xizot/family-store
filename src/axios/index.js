import axios from "axios";
import { history } from "../helpers";

const baseURL =
	"https://familystore.herokuapp.com" || process.env.REACT_APP_BASE_URL;

axios.defaults.baseURL = baseURL;

// Add a request interceptor
axios.interceptors.request.use(
	(config) => {
		const token = localStorage.accessToken;
		if (token) {
			config.headers["Authorization"] = "Bearer " + token;
		}
		// config.headers['Content-Type'] = 'application/json';
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

//Add a response interceptor
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const originalRequest = error.config;
		if (
			error.response.status === 401 &&
			originalRequest.url`${baseURL}/auth/refreshtoken`
		) {
			history.push("/login");
			return Promise.reject(error);
		}

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = localStorage.refreshToken();
			return axios
				.post(`${baseURL}/auth/refreshtoken`, {
					refreshToken: refreshToken,
				})
				.then((res) => {
					if (res.status === 201) {
						const {
							accessToken: newAccessToken,
							refreshToken: newRefreshToken,
						} = res.data;
						localStorage.setItem("accessToken", newAccessToken);
						localStorage.setItem("refreshToken", newRefreshToken);
						axios.defaults.headers.common["Authorization"] =
							"Bearer " + newAccessToken;
						return axios(originalRequest);
					}
				});
		}
		return Promise.reject(error);
	}
);

export default axios;
