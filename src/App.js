import { createTheme, ThemeProvider } from "@material-ui/core";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components/Common/ProtectedRoute";
import { useTranslation } from "react-i18next";
import { langActions } from "./reducers/lang";
import { authActions } from "./reducers/auth";
import { routes } from "./config/routes";
import Loading from "./components/Loading/Loading";
import Cart from "./components/Cart/Cart";
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

	useEffect(() => {
		try {
			const user =
				localStorage.getItem("user") &&
				JSON.parse(localStorage.getItem("user"));
			const accessToken = localStorage.getItem("accessToken");
			if (!user || !accessToken) return;
			dispatch(
				authActions.loginVerified({
					user,
					accessToken,
				})
			);
			console.log(user);
		} catch (err) {}
	}, [dispatch]);

	return (
		<ThemeProvider theme={theme}>
			{isOpenCart && <Cart />}
			<Suspense fallback={<Loading />}>
				<Switch>
					{routes.map((route, index) => {
						return (
							<Route
								key={index}
								path={route.path}
								exact={route.exact}
								render={(props) => {
									if (route.protected) {
										return (
											<ProtectedRoute
												{...props}
												roles={route.roles}
											>
												<route.component
													{...route.props}
												/>
											</ProtectedRoute>
										);
									}
									return (
										<route.component
											{...props}
											{...route.props}
										/>
									);
								}}
							/>
						);
					})}
					<Route path="*">
						<PageNotFound />
					</Route>
				</Switch>
			</Suspense>
		</ThemeProvider>
	);
}

export default App;
