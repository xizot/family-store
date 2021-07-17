import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const vnTranslation = {
	title: "Family Store - Mua sắm online dễ dàng hơn",
	homepage: {
		bannerTitle: "Mua sắm ngay tại nhà",
		bannerDescription:
			'Vì sức khỏe cộng đồng "Kết nối không khoảng cách". An tâm shop tại nhà cùng Family Store',
		topTitle1: "Bán chạy nhất tuần",
		topTitle2: "Bán chạy nhất tháng",
		topTitle3: "Sản phẩm giá tốt",
	},
	loginpage: {
		title: "Family Store - Đăng Nhập",
		formTitle: "Đăng Nhập",
		email: "Email",
		emailInValid: "Địa chỉ email không hợp lệ",
		password: "Mật khẩu",
		passwordInValid: "Mật khẩu không hợp lệ",
		buttonLogin: "Đăng nhập",
		newMember: "Chưa có tài khoản?",
		forgotPassword: "Quên mật khẩu?",
		signUp: "Đăng kí",
	},
	searchPlaceHolder: "Tìm kiếm sản phẩm...",
};
const enTranslation = {
	title: "Family Store - Easy buy online",
	homepage: {
		bannerTitle: "Stay home & delivered your daily need’s",
		bannerDescription: "Start your daily shopping with Family Store",
		topTitle1: "Top items selling last week",
		topTitle2: "Top items selling last month",
		topTitle3: "Items on sale",
	},
	loginpage: {
		title: "Family Store - Login",
		formTitle: "Login",
		email: "Email",
		emailInValid: "Please enter a valid email.",
		password: "Password",
		passwordInValid: "Please enter a valid password.",
		buttonLogin: "Sign in",
		newMember: "New member?",
		forgotPassword: "Forgot passsword?",
		signUp: "Sign up",
	},
	searchPlaceHolder: "What are you looking for?",
};

const resources = {
	en: {
		translation: enTranslation,
	},
	vn: {
		translation: vnTranslation,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
