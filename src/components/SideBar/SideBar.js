import { makeStyles } from "@material-ui/core";
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "absolute",
		left: 0,
		top: 64,
		background: "#fff",
		height: "calc(100% - 80px - 64px)",
		width: 300,
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
}));

const SideBar = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<CategoriesMenu />
		</div>
	);
};

export default SideBar;
