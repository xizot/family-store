import { createTheme, ThemeProvider } from "@material-ui/core";
import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "./components/Loading/Loading";
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

const theme = createTheme({
	palette: {
		primary: {
			main: "#F39148",
			contrastText: "#fff",
		},
	},
});
function App() {
	return (
		<ThemeProvider theme={theme}>
			<Suspense fallback={<Loading />}>
				<Switch>
					<Route exact path="/">
						<HomePage title="Home Page" />
					</Route>
					<Route exact path="/login">
						<LoginPage title="Login Page" />
					</Route>
					<Route path="*">404 not found</Route>
				</Switch>
			</Suspense>
		</ThemeProvider>
	);
}

export default App;
