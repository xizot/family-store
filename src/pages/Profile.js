import {
	Box,
	Button,
	Container,
	FormControl,
	FormHelperText,
	Grid,
	makeStyles,
	Paper,
	Tab,
	Tabs,
	TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useHistory, useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "100vh",
		padding: "20vh 0 65px",
	},
	tabPanel: {
		background: "#fff",
	},
	tabs: {
		borderBottom: "1px solid #ddd",
	},
	tabActive: {
		background: theme.palette.primary.main,
	},
	label: {
		color: "#fff",
	},
}));

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
};

const basicStyles = makeStyles((theme) => ({
	form: {
		width: "30rem",
		background: "#fff",
		maxWidth: "100%",
		margin: "0 auto",
		padding: "50px 25px",
		[theme.breakpoints.down("xs")]: {
			padding: "35px 15px",
		},
	},
	formControl: {
		display: "block",
		marginBottom: 15,
	},
	button: {
		"&:disabled": {
			cursor: "not-allowed",
			pointerEvents: "all !important",
		},
	},
}));

const BasicProfilePanel = () => {
	const classes = basicStyles();
	const { t } = useTranslation();
	return (
		<form noValidate autoComplete="off" className={classes.form}>
			<FormControl className={classes.formControl}>
				<TextField
					// error
					error={false}
					label={t("profilepage.fullName")}
					type="text"
					helperText={false && "Please enter a valid name."}
					fullWidth
					size="small"
					variant="outlined"
				/>
			</FormControl>
			<FormControl className={classes.formControl}>
				<TextField
					error={false}
					label={t("profilepage.email")}
					type="email"
					helperText={false && "Please enter a valid email."}
					fullWidth
					size="small"
					variant="outlined"
				/>
			</FormControl>
			<FormControl className={classes.formControl}>
				<PhoneInput
					inputStyle={{
						height: "40px",
						width: "100%",
					}}
					inputClass={false && classes.inputInvalid}
					country={"vn"}
					label="Phone Number"
					placeholder="Enter phone number"
				/>
				{false && (
					<FormHelperText
						variant="outlined"
						className={classes.formHelperText}
					>
						Please enter a valid phone number
					</FormHelperText>
				)}
			</FormControl>
			<FormControl className={classes.formControl}>
				<TextField
					error={false}
					label={t("profilepage.address")}
					helperText={false && "Please enter a valid address."}
					fullWidth
					size="small"
					variant="outlined"
					multiline
					rows={4}
				/>
			</FormControl>
			<Button variant="contained" color="primary" fullWidth type="submit">
				{t("profilepage.buttonExecute")}
			</Button>
		</form>
	);
};
const ChangePasswordPanel = () => {
	const classes = basicStyles();
	const { t } = useTranslation();
	return (
		<form noValidate autoComplete="off" className={classes.form}>
			<FormControl className={classes.formControl}>
				<TextField
					// error
					error={false}
					label={t("profilepage.currentPassword")}
					type="text"
					fullWidth
					size="small"
					variant="outlined"
				/>
			</FormControl>
			<FormControl className={classes.formControl}>
				<TextField
					error={false}
					label={t("profilepage.newPassword")}
					type="text"
					fullWidth
					size="small"
					variant="outlined"
				/>
			</FormControl>
			<FormControl className={classes.formControl}>
				<TextField
					error={false}
					label={t("profilepage.confirmNewPassword")}
					helperText={false && "Confirm password is not match"}
					fullWidth
					size="small"
					variant="outlined"
				/>
			</FormControl>
			<Button variant="contained" color="primary" fullWidth type="submit">
				{t("profilepage.buttonExecute")}
			</Button>
		</form>
	);
};

const avatarPanelStyles = makeStyles((theme) => ({
	root: {
		width: "30rem",
		background: "#fff",
		maxWidth: "100%",
		margin: "0 auto",
		padding: "50px 25px",
		[theme.breakpoints.down("xs")]: {
			padding: "35px 15px",
		},
	},
	top: {
		width: 200,
		margin: "0 auto 30px",
	},
	image: {
		width: "100%",
		position: "relative",
		paddingTop: "calc((3/4)*100%)",
		marginBottom: 10,
		"& img": {
			position: "absolute",
			top: 0,
			width: "100%",
			height: "100%",
		},
	},
}));
const AvatarPanel = () => {
	const { t } = useTranslation();
	const avatarClasses = avatarPanelStyles();
	return (
		<div className={avatarClasses.root}>
			<div className={avatarClasses.top}>
				<div className={avatarClasses.image}>
					<img
						src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Diana_26.jpg"
						alt="avatar"
					/>
				</div>

				<Grid container spacing={1} className={avatarClasses.actions}>
					<Grid item xs={6}>
						<Button variant="contained" color="primary" fullWidth>
							{t("profilepage.buttonRemove")}
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button variant="contained" fullWidth>
							{t("profilepage.buttonBrowse")}
						</Button>
					</Grid>
				</Grid>
			</div>
			<Button variant="contained" color="primary" fullWidth type="submit">
				{t("profilepage.buttonExecute")}
			</Button>
		</div>
	);
};

const Profile = (props) => {
	const history = useHistory();
	let { slug } = useParams();
	const classes = useStyles();
	const [tabValue, setTabValue] = useState(0);
	const { t } = useTranslation();

	const indexToTabName = {
		0: 'basic',
		1: 'password',
		2: 'avatar'
	};
	const tabChangeHandler = (event, newValue) => {
		history.push(`/profile/${indexToTabName[newValue]}`);
		setTabValue(newValue);
	};

	useEffect(() => {
		const tabNameToIndex = {
			basic: 0,
			password: 1,
			avatar: 2,
		};
		setTabValue(tabNameToIndex[slug || "basic"]);
	}, [slug]);

	useEffect(() => {
		document.title = t("profilepage.title");
	}, [t]);
	return (
		<>
			<div className={classes.root}>
				<Header showCart />
				<Container>
					<Paper>
						<Tabs
							indicatorColor="primary"
							value={tabValue}
							onChange={tabChangeHandler}
							variant="fullWidth"
							className={classes.tabs}
							TabIndicatorProps={{ className: classes.tabActive }}
						>
							<Tab label={t("profilepage.tabTitle.1")} />
							<Tab label={t("profilepage.tabTitle.2")} />
							<Tab label={t("profilepage.tabTitle.3")} />
						</Tabs>
					</Paper>
					<TabPanel
						value={tabValue}
						index={0}
						className={classes.tabPanel}
					>
						<BasicProfilePanel />
					</TabPanel>
					<TabPanel
						value={tabValue}
						index={1}
						className={classes.tabPanel}
					>
						<ChangePasswordPanel />
					</TabPanel>
					<TabPanel
						value={tabValue}
						index={2}
						className={classes.tabPanel}
					>
						<AvatarPanel />
					</TabPanel>
				</Container>
			</div>
			<Footer />
		</>
	);
};

export default Profile;
