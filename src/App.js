import { createTheme, ThemeProvider } from "@material-ui/core";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import { ProtectedRoute } from "./components/Common/ProtectedRoute";
import Loading from "./components/Loading/Loading";
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const AccountPage = lazy(() => import("./pages/Account"));
const PageNotFound = lazy(() => import("./pages/404NotFound"));

const theme = createTheme({
	palette: {
		primary: {
			main: "#F39148",
			contrastText: "#fff",
		},
	},
});
function App() {
	const isOpenCart = useSelector((state) => state.ui.isOpenCart);
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
						path="/account"
						component={AccountPage}
					/>
					<Route exact path="/login">
						<LoginPage />
					</Route>
					<Route exact path="/register">
						<RegisterPage />
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
