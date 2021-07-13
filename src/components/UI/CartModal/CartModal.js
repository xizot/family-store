import { makeStyles } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		position: "fixed",
		zIndex: 20,
		width: "100%",
		height: "100vh",
		background: "rgba(0,0,0,0.7)",
	},
	modalOverLay: {
		position: "fixed",
		right: 0,
		zIndex: 30,
		width: "40%",
		height: "100vh",
		overflow: "auto",
		background: "white",
		animation: "$slideIn .3s ease-in-out",
		[theme.breakpoints.down("sm")]: {
			width: "60%",
		},
		[theme.breakpoints.down("xs")]: {
			width: "100%",
		},
	},
	"@keyframes slideIn": {
		"0%": {
			transform: "translateX(100%)",
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
const portalElement = document.getElementById("overlay");

const CartModal = ({ children, onClose }) => {
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

export default CartModal;
