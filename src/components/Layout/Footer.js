import { Container, makeStyles, Typography } from "@material-ui/core";
import { Email, Facebook, GitHub, Phone } from "@material-ui/icons";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
	root: {
		background: "#fff",
		minHeight: 65,
		marginTop: -65,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		paddingLeft: (props) => (props?.hasSideBar ? 300 : 0),
		[theme.breakpoints.down("xs")]: {
			minHeight: 85,
			marginTop: -85,
		},
		[theme.breakpoints.down("sm")]: {
			paddingLeft: "0 !important",
		},
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
const Footer = ({ hasSideBar }) => {
	const { t } = useTranslation();
	const classes = useStyles({ hasSideBar });
	return (
		<footer className={classes.root}>
			<Container className={classes.container}>
				<div className={classes.content}>
						<Typography variant="body1">
							{t('footer.copyright')} 
						</Typography>
					<div className={classes.contact}>
						<span>&nbsp;&nbsp;</span>
						<Typography variant="body1">{t('footer.contact')} </Typography>
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
