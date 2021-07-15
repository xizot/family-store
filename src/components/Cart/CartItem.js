import { makeStyles, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import NumericUpDown from "../UI/NumericUpDown";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		padding: "20px 0",
		borderBottom: "1px solid #ddd",
	},
	remove: {
		position: "absolute",
		zIndex: 1,
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		background: "rgba(0,0,0,0.7)",
		cursor: "pointer",
		opacity: 0,
		transition: ".3s all",
	},
	image: {
		position: "relative",
		height: 100,
		width: 80,
		background: "#ddd",
		marginRight: 15,
		"& img": {
			width: "100%",
			height: "100%",
			objectFit: "cover",
		},
		"&:hover": {
			"& $remove": {
				opacity: 1,
			},
		},
	},
	description: {
		marginTop: 10,
		display: "flex",
		flex: 1,
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
	},
	detail: {
		flex: 1,
		marginRight: 15,
		[theme.breakpoints.down("xs")]: {
			paddingRight: 0,
		},
	},
	info: {
		marginTop: 5,
		opacity: 0.9,
	},
	price: {
		opacity: 0.7,
	},
	totalPrice: {
		textAlign: "right",
		fontWeight: "bold",
		[theme.breakpoints.down("xs")]: {
			textAlign: "left",
			paddingRight: 15,
		},
	},
	actions: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		marginRight: 10,
		[theme.breakpoints.down("xs")]: {
			marginTop: 15,
			flexDirection: "row",
			justifyContent: "flex-start",
		},
	},
}));

const CartItem = ({
	id,
	imgSrc,
	title,
	info,
	price,
	totalPrice,
	quantity,
	onAdd,
	onRemove,
	onClear,
}) => {
	const classes = useStyles();

	return (
		<li className={classes.root} id={id}>
			<div className={classes.image}>
				<span onClick={onClear} className={classes.remove}>
					<Close style={{ color: "#fff" }} />
				</span>
				<img src={imgSrc} alt={title} />
			</div>
			<div className={classes.description}>
				<div className={classes.detail}>
					<Typography variant="body1">{title}</Typography>
					<Typography variant="body2" className={classes.info}>
						{info}
					</Typography>
					<Typography variant="caption" className={classes.price}>
						Unit Price {price} VND
					</Typography>
				</div>
				<div className={classes.actions}>
					<Typography variant="body1" className={classes.totalPrice}>
						{totalPrice} VND
					</Typography>
					<NumericUpDown
						quantity={quantity}
						onAdd={onAdd}
						onRemove={onRemove}
					/>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
