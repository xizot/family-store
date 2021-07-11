import { Container } from "@material-ui/core";
import { useEffect } from "react";
import Header from "./../components/Layout/Header";
const HomePage = () => {
	useEffect(() => {
		document.title = "Home Page";
	}, []);
	return (
		<div>
			<Header />
			<Container>this is home page</Container>
		</div>
	);
};
export default HomePage;
