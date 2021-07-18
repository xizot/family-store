import { makeStyles, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { moneyFormat } from "../../helpers";
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
		display: "-webkit-box",
		"-webkit-line-clamp": 2,
		"-webkit-box-orient": "vertical",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	price: {
		opacity: 0.7,
	},
	hasSale: {
		textDecoration: "line-through",
		opacity: 0.8,
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
		flexFlow: "column wrap",
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
	image,
	title,
	description,
	price,
	salePrice,
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
				<img src={image} alt={title} loading="lazy" />
			</div>
			<div className={classes.description}>
				<div className={classes.detail}>
					<Typography variant="body1">{title}</Typography>
					<Typography variant="body2" className={classes.info}>
						{description}
					</Typography>
					<Typography
						variant="caption"
						className={`${classes.price} ${
							salePrice ? classes.hasSale : ""
						}`}
					>
						Unit Price {price && moneyFormat(price)} VND
					</Typography>
					{salePrice && (
						<Typography
							variant="subtitle2"
							className={classes.price}
						>
							Sale {salePrice && moneyFormat(salePrice)} VND
						</Typography>
					)}
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
