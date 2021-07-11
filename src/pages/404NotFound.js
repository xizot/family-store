import { Container, makeStyles, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
		background: theme.palette.primary.main,
	},
	content: {
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		height: "100%",
	},
	text: {
		color: "#fff",
	},
}));
const PageNotFound = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Container className={classes.container}>
				<div className={classes.content}>
					<Typography
						variant="h2"
						component="p"
						className={classes.text}
					>
						404 Page Not Found
					</Typography>
				</div>
			</Container>
		</div>
	);
};

export default PageNotFound;
