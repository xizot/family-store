import { Container, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import SideBar from "../components/SideBar/SideBar";
import Header from "./../components/Layout/Header";

const useStyles = makeStyles(() => ({
	root: {
		minHeight: "100vh",
	},
}));
const HomePage = () => {
	const classes = useStyles();
	useEffect(() => {
		document.title = "Family Store - Best for buy online";
	}, []);
	return (
		<div className={classes.root}>
			<Header />

			<Container>
				<SideBar />
				This is home page
			</Container>
		</div>
	);
};
export default HomePage;
