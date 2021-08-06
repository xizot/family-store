import axios from "../axios/index";

const login = ({ email, password }) => {
	return axios.post("/api/authentication/login", {
		email,
		passWord: password,
	});
};

const register = ({ username, password, email, fullName, phoneNumber }) => {
	return axios.post("/api/authentication/register", {
		userName: username,
		passWord: password,
		email,
		fullName,
		phoneNumber,
	});
};

const verifyEmail = ({ userId, accessToken }) => {
	return axios.post("/api/authentication/verification-email", {
		accId: userId,
		accToken: accessToken,
	});
};

const forgotPassword = (email) => {
	return axios.post("/api/authentication/forgot-password", {
		email,
	});
};

const changePassword = ({ userId, newPassword }) => {
	return axios.post("/api/authentication/new-password", {
		accId: userId,
		accPassword: newPassword,
	});
};

const getUserInfoById = (userId) => {
	return axios.get(`/api/authentication/verification-email/${userId}`);
};
const authApi = {
	login,
	register,
	verifyEmail,
	forgotPassword,
	changePassword,
	getUserInfoById,
};
export default authApi;
