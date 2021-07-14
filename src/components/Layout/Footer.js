import { Container, makeStyles, Typography } from "@material-ui/core";
import { Email, Facebook, GitHub, Phone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.primary.main,
		minHeight: 80,
		marginTop: -80,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		height: "100%",
	},
	content: {
		height: "100%",
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		alignItems: "center",
		color: "#fff",
		[theme.breakpoints.down("xs")]: {
			padding: "10px 0",
		},
	},
	contact: {
		display: "flex",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			marginTop: 10,
		},
		"& ul": {
			display: "flex",
			alignItems: "center",
			listStyle: "none",
			"& a": {
				marginLeft: 10,
			},
		},
	},
}));
const Footer = (props) => {
	const classes = useStyles();
	return (
		<footer className={classes.root}>
			<Container className={classes.container}>
				<div className={classes.content}>
					<Typography variant="body1">
						Copyright 2021 © Family market.
					</Typography>
					<div className={classes.contact}>
						<Typography variant="body1">Contact us at</Typography>
						<ul>
							<li>
								<a href="/" target="_blank">
									<Facebook style={{ color: "#000" }} />
								</a>
							</li>
							<li>
								<a href="/" target="_blank">
									<GitHub style={{ color: "#000" }} />
								</a>
							</li>
							<li>
								<a href="/" target="_blank">
									<Email style={{ color: "#000" }} />
								</a>
							</li>
							<li>
								<a href="/" target="_blank">
									<Phone style={{ color: "#000" }} />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
