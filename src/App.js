import { createTheme, ThemeProvider } from "@material-ui/core";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import { ProtectedRoute } from "./components/Common/ProtectedRoute";
import Loading from "./components/Loading/Loading";
import { useTranslation } from "react-i18next";
import { langActions } from "./reducers/lang";
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/forgotPassword"));
const RecoveryPasswordPage = lazy(() => import("./pages/recoveryPassword"));
const AccountActivationPage = lazy(() => import("./pages/accountActivation"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const PageNotFound = lazy(() => import("./pages/404NotFound"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const CollectionsPage = lazy(() => import("./pages/Collections"));

const theme = createTheme({
	palette: {
		primary: {
			main: "#F39148",
			contrastText: "#fff",
		},
	},
});
function App() {
	const dispatch = useDispatch();
	const { i18n } = useTranslation();
	const isOpenCart = useSelector((state) => state.ui.isOpenCart);
	useEffect(() => {
		const existingLang = localStorage.getItem("lang");
		if (!existingLang || (existingLang !== "vn" && existingLang !== "en"))
			return;

		dispatch(langActions.updateLang(existingLang));

		i18n.changeLanguage(existingLang);
	}, [i18n, dispatch]);
	return (
		<ThemeProvider theme={theme}>
			{isOpenCart && <Cart />}
			<Suspense fallback={<Loading />}>
				<Switch>
					<Route exact path="/">
						<HomePage />
					</Route>
					<ProtectedRoute
						exact
						path="/profile"
						component={ProfilePage}
					/>
					<ProtectedRoute
						exact
						path="/profile/:slug"
						component={ProfilePage}
					/>
					<Route exact path="/login">
						<LoginPage />
					</Route>
					<Route exact path="/register">
						<RegisterPage />
					</Route>
					<Route exact path="/forgot-password">
						<ForgotPasswordPage />
					</Route>
					<Route exact path="/recovery-password">
						<RecoveryPasswordPage />
					</Route>
					<Route exact path="/account-activation">
						<AccountActivationPage />
					</Route>
					<Route exact path="/search">
						<SearchPage />
					</Route>
					<Route exact path="/details/:productId">
						<ProductDetail />
					</Route>
					<Route exact path="/collections/:categoryId">
						<CollectionsPage />
					</Route>
					<Route exact path="/collections">
						<CollectionsPage />
					</Route>
					<Route path="*">
						<PageNotFound />
					</Route>
				</Switch>
			</Suspense>
		</ThemeProvider>
	);
}

export default App;
