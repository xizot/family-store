import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../reducers/ui";
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";
import SideBarTablet from "./SideBarTablet/SideBarTablet";

const useStyles = makeStyles((theme) => ({
	cateDesktop: {
		display: "block",
		position: "fixed",
		left: 0,
		top: 64,
		background: "#fff",
		height: "calc(100% - 64px)",
		width: 300,
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
}));

const SideBar = (props) => {
	const classes = useStyles();
	const isOpenSideBar = useSelector((state) => state.ui.isOpenSideBar);
	const dispatch = useDispatch();
	const toggleSideBarHandler = () => {
		dispatch(uiActions.toggleSideBar());
	};
	return (
		<>
			<div className={classes.cateDesktop}>
				<CategoriesMenu />
			</div>
			{isOpenSideBar && (
				<SideBarTablet onClose={toggleSideBarHandler}>
					<CategoriesMenu onClose={toggleSideBarHandler} />
				</SideBarTablet>
			)}
		</>
	);
};

export default SideBar;
