import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export const ProtectedRoute = (props) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	if (!isAuthenticated) {
		return (
			<Redirect
				to={{
					pathname: "/login",
					state: { from: props.location },
				}}
			/>
		);
	}
	return <>{props.children}</>;
};
