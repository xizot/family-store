import { Button, Grid, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
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
	const avatarClasses = useStyles();
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
						<input
							type="file"
							id="avatar"
							style={{ display: "none" }}
						/>
						<Button
							variant="contained"
							fullWidth
							component="label"
							htmlFor="avatar"
						>
							{t("profilepage.buttonBrowse")}
						</Button>
					</Grid>
				</Grid>
			</div>
			<Button
				variant="contained"
				color="primary"
				fullWidth
				type="submit"
				disabled={true}
			>
				{t("profilepage.buttonExecute")}
			</Button>
		</div>
	);
};

export default AvatarPanel;
