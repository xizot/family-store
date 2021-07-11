import {
	Typography,
	AppBar,
	InputBase,
	makeStyles,
	alpha,
	IconButton,
	Badge,
	Toolbar,
} from "@material-ui/core";
import { Search, LocalMall, Person, Menu } from "@material-ui/icons";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
	root: {},
	toolBar: {
		width: "100%",
	},
	logo: {
		flex: 1,
		display: "flex",
		alignItems: "center",
	},
	menuButton: {
		display: "none",
		[theme.breakpoints.down("sm")]: {
			display: "block",
		},
	},

	title: {
		color: "inherit",
		textDecoration: "none",
		"&>h2": {
			[theme.breakpoints.down("sm")]: {
				fontSize: "1rem",
			},
		},
	},
	sectionDesktop: {
		flex: 1,
		display: "flex",
		justifyContent: "flex-end",
	},
	search: {
		flex: 3,
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
		width: "100%",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
	},
	navLink: {
		color: "inherit",
	},
	iconButton: {
		[theme.breakpoints.down("sm")]: {
			padding: "5px",
		},
	},
}));
const Header = () => {
	const classes = useStyles();
	return (
		<AppBar position="static" className={classes.root}>
			<Toolbar className={classes.toolBar}>
				<div className={classes.logo}>
					<IconButton
						aria-label="menu"
						color="inherit"
						className={`${classes.iconButton} ${classes.menuButton}`}
					>
						<Menu />
					</IconButton>
					<Link to="/" className={classes.title}>
						<Typography variant="h6" component="h2" noWrap>
							FAMILY STORE
						</Typography>
					</Link>
				</div>
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<Search />
					</div>
					<InputBase
						placeholder="What Are You Looking For?"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ "aria-label": "search" }}
					/>
				</div>

				<div className={classes.sectionDesktop}>
					<Link to="/account" className={classes.navLink}>
						<IconButton
							aria-label="my account"
							color="inherit"
							className={classes.iconButton}
						>
							<Person />
						</IconButton>
					</Link>
					<IconButton
						aria-label="show 4 products"
						color="inherit"
						className={classes.iconButton}
					>
						<Badge badgeContent={4} color="secondary">
							<LocalMall />
						</Badge>
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);
};
export default Header;
