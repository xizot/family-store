import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.primary.main,
		display: "flex",
		width: "fit-content",
		height: "fit-content",
		alignItems: "center",
		borderRadius: 5,
	},
	quantity: {
		padding: "0 20px",
		color: "#fff",
	},
	icon: {
		color: "#fff",
	},
}));
const NumericUpDown = ({ quantity, onAdd, onRemove }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<IconButton size="small" onClick={onRemove}>
				<Remove className={classes.icon} fontSize="small" />
			</IconButton>
			<Typography
				className={classes.quantity}
				variant="subtitle1"
				component="p"
			>
				{quantity}
			</Typography>
			<IconButton size="small" onClick={onAdd}>
				<Add className={classes.icon} fontSize="small" />
			</IconButton>
		</div>
	);
};

export default NumericUpDown;
