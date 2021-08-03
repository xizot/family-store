import axios from "../axios/index";

const login = async ({ username, password }) => {
	return axios.post("/api/authentication/login", {
		userName: username,
		passWord: password,
	});
};

const register = async ({
	username,
	password,
	email,
	fullName,
	phoneNumber,
	role = "ADM",
}) => {
	return axios.post("/api/authentication/register", {
		userName: username,
		passWord: password,
		email,
		fullName,
		phoneNumber,
		role,
	});
};
const authApi = {
	login,
	register,
};
export default authApi;
