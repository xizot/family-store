import { makeStyles } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		position: "fixed",
		top: 0,
		left: 0,
		zIndex: 1300,
		width: "100%",
		height: "-webkit-fill-available",
		maxHeight: "100vh",
		background: "rgba(0,0,0,0.7)",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	modalOverLay: {
		position: "fixed",
		top: 0,
		left: 0,
		zIndex: 1310,
		width: "80%",
		overflowX: "hidden",
		height: "-webkit-fill-available",
		maxHeight: "100vh",
		background: "#fff",
		animation: "$slideIn .3s ease-in-out",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
		[theme.breakpoints.down("sm")]: {
			width: "60%",
		},
		[theme.breakpoints.down("xs")]: {
			width: "100%",
		},
	},
	"@keyframes slideIn": {
		"0%": {
			transform: "translateX(-100%)",
		},
		"100%": {
			transform: "translateX(0)",
		},
	},
}));

const Backdrop = ({ onClose }) => {
	const classes = useStyles();
	return <div className={classes.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = ({ children }) => {
	const classes = useStyles();
	return <div className={classes.modalOverLay}>{children}</div>;
};
const portalElement = document.getElementById("overlay2");

const SideBarTablet = ({ children, onClose }) => {
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClose={onClose} />,
				portalElement
			)}
			{ReactDOM.createPortal(
				<ModalOverlay>{children}</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default SideBarTablet;
