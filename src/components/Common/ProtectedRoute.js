import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated) {
                    return <Component />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};
