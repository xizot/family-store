import {
	Typography,
	AppBar,
	makeStyles,
	IconButton,
	Badge,
	Toolbar,
	Select,
	MenuItem,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import {
	LocalMall,
	Person,
	Menu,
	ExitToApp,
	Translate,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authActions } from "../../reducers/auth";
import { uiActions } from "../../reducers/ui";
import SearchInput from "../UI/SearchInput";
import { langActions } from "../../reducers/lang";
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

	home: {
		color: "inherit",
		textDecoration: "none",
		display: "flex",
		alignItems: "center",
		"& img": {
			width: 24,
			marginRight: 10,
			height: "auto",
			maxHeight: "100%",
			[theme.breakpoints.down("sm")]: {
				display: "none",
			},
		},
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
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},

	navLink: {
		color: "inherit",
	},
	iconButton: {
		[theme.breakpoints.down("sm")]: {
			padding: "5px",
		},
	},
	selectLanguage: {
		color: "#fff",
		margin: "0 12px",
		"& svg": {
			color: "#fff",
		},
		"&:before": {
			border: "none !important",
		},
	},
	bump: {
		animation: "$bump 300ms ease-out",
	},
	"@keyframes bump": {
		"0%": {
			transform: "scale(1)",
		},
		"10%": {
			transform: "scale(0.9)",
		},
		"30%": {
			transform: "scale(1.1)",
		},
		"500%": {
			transform: "scale(1.15)",
		},
		"100%": {
			transform: "scale(1)",
		},
	},
}));
const Header = ({ showMenu, showCart }) => {
	const { i18n } = useTranslation();
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const cartItems = useSelector((state) => state.cart.data);
	const lang = useSelector((state) => state.lang.current);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [btnIsHightlighted, setBtnIsHightlighted] = useState(false);

	const numberOfCartItems = cartItems.reduce((cartNumber, item) => {
		return cartNumber + item.quantity;
	}, 0);

	const toggleCartModalHandler = () => {
		dispatch(uiActions.toggleCartModal());
	};

	const toggleSideBarHandler = () => {
		dispatch(uiActions.toggleSideBar());
	};

	const logoutHandler = () => {
		dispatch(authActions.logout());
		history.push("/login");
	};

	const languageChangeHandler = (e) => {
		const langSelected = e.target.value;
		i18n.changeLanguage(langSelected);
		dispatch(langActions.updateLang(langSelected));
	};

	const btnCart = `${classes.iconButton} ${
		btnIsHightlighted ? classes.bump : ""
	}`;
	useEffect(() => {
		if (cartItems?.length === 0) {
			return;
		}

		setBtnIsHightlighted(true);
		setTimeout(() => {
			setBtnIsHightlighted(false);
		}, 300);
	}, [cartItems]);

	return (
		<AppBar position="fixed" className={classes.root}>
			<Toolbar className={classes.toolBar}>
				<div className={classes.logo}>
					{showMenu && (
						<IconButton
							aria-label="menu"
							color="inherit"
							className={`${classes.iconButton} ${classes.menuButton}`}
							onClick={toggleSideBarHandler}
						>
							<Menu />
						</IconButton>
					)}

					<Link to="/" className={classes.home}>
						<img
							src={`${process.env.PUBLIC_URL}/img/store-icon.png`}
							alt="store icon"
						/>
						<Typography variant="h6" component="h2" noWrap>
							FAMILY STORE
						</Typography>
					</Link>
				</div>
				<div className={classes.search}>
					<SearchInput />
				</div>

				<div className={classes.sectionDesktop}>
					<Select
						onChange={languageChangeHandler}
						value={lang}
						displayEmpty
						className={classes.selectLanguage}
						inputProps={{ "aria-label": "Without label" }}
						IconComponent={Translate}
					>
						<MenuItem value="en">English</MenuItem>
						<MenuItem value="vn">Vietnamese</MenuItem>
					</Select>
					<Link to="/profile" className={classes.navLink}>
						<IconButton
							aria-label="My profile"
							color="inherit"
							className={classes.iconButton}
						>
							<Person />
						</IconButton>
					</Link>

					{isAuthenticated && (
						<IconButton
							aria-label="My profile"
							color="inherit"
							className={classes.iconButton}
							onClick={logoutHandler}
						>
							<ExitToApp />
						</IconButton>
					)}
					{showCart && (
						<IconButton
							aria-label="show number products"
							color="inherit"
							className={btnCart}
							onClick={toggleCartModalHandler}
						>
							<Badge
								badgeContent={numberOfCartItems}
								color="secondary"
							>
								<LocalMall />
							</Badge>
						</IconButton>
					)}
				</div>
			</Toolbar>
		</AppBar>
	);
};
export default Header;
