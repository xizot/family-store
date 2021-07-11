import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
	loading: {
		position: "fixed",
		zIndex: 999,
		height: "2em",
		width: "2em",
		overflow: "visible",
		margin: "auto",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		"&:before": {
			content: "''",
			display: "block",
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			backgroundColor: "rgba(0, 0, 0, 0.3)",
		},
		"&:after": {
			content: "''",
			display: "block",
			fontSize: 10,
			width: "1em",
			height: "1em",
			marginTop: "-0.5em",
			animation: "$spinner 1500ms infinite linear",
			borderRadius: " 0.5em",

			/* dot circle */
			boxShadow:
				"rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0",
		},
	},

	"@keyframes spinner": {
		"0%": {
			transform: "rotate(0deg)",
			color: "red",
		},
		"100%": {
			transform: "rotate(360deg)",
		},
	},
}));
const Loading = () => {
	const classes = useStyles();
	return <span className={classes.loading}></span>;
};
export default Loading;
