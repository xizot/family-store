import axios from "axios";
import { history } from "../helpers";
const baseURL = process.env.REACT_APP_BASE_URL;

axios.defaults.baseURL = baseURL;

// Add a request interceptor
axios.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.accessToken;
		if (accessToken) {
			config.headers["Authorization"] = accessToken;
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
		if (error.response.status === 401 || error.response.status === 403) {
			console.log("Your access token is expired. Please log in again");
			history.push("/login");
		}

		return Promise.reject(error);
	}
);

export default axios;
