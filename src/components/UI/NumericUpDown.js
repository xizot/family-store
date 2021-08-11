import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
	root: {
		minWidth:'113px',
		background: theme.palette.primary.main,
		display: "flex",
		width: "fit-content",
		alignItems: "center",
		borderRadius: 5,
		alignSelf: (props) => props?.alignSelf || "flex-start",
		height: (props) => props?.height || "fit-content",
	},
	quantity: {
		padding: "0 20px",
		color: "#fff",
	},
	icon: {
		color: "#fff",
	},
}));
const NumericUpDown = ({ quantity, onAdd, onRemove, alignSelf, height }) => {
	const classes = useStyles({ alignSelf, height });
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
