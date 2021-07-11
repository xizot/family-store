import { Container } from "@material-ui/core";
import { useEffect } from "react";
import Header from "../components/Layout/Header";

const Account = (props) => {
	useEffect(() => {
		document.title = "My Account";
	}, []);
	return (
		<div>
			<Header />
			<Container>this is account page</Container>
		</div>
	);
};

export default Account;
