import {
	CardContent,
	makeStyles,
	Typography,
	Card,
	CardMedia,
	Box,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBasket } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		width: "100%",
		height: "100%",
	},

	link: {
		textDecoration: "none",
	},
	item: {
		height: "100%",
		"&:hover": {
			"& $title": {
				textDecoration: "underline",
			},
		},
	},
	iconAddToCart: {
		cursor: "pointer",
		position: "absolute",
		right: 10,
		top: 10,
		borderRadius: theme.shape.borderRadius,
		padding: "2px 7px",
		boxShadow: "0px 2px 4px rgba(0,0,0,0.4)",
		background: "#f3f3f3",
		transition: "color .4s",
		"&:hover": {
			color: theme.palette.primary.main,
		},
	},
	content: {
		padding: "10px !important",
	},
	media: {
		height: 0,
		paddingTop: "calc((9/16)*100%)",
		objectFit: "cover",
	},
	title: {
		display: "-webkit-box",
		"-webkit-line-clamp": 2,
		"-webkit-box-orient": "vertical",
		overflow: "hidden",
		textOverflow: "ellipsis",
		color: "#333",
	},
	hasSale: {
		textDecoration: "line-through",
		color: "#333 !important",
		opacity: 0.9,
		fontSize: "12px !important",
	},
	price: {
		color: theme.palette.primary.main,
	},
	description: {
		fontSize: 14,
		display: "-webkit-box",
		"-webkit-line-clamp": 4,
		"-webkit-box-orient": "vertical",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
}));

const ProductItem = ({
	id,
	title,
	image,
	price,
	salePrice,
	description,
	onAddToCart,
}) => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<Card className={classes.item}>
				<div onClick={onAddToCart} className={classes.iconAddToCart}>
					<ShoppingBasket fontSize="small" />
				</div>
				<Link to={`details/${id}`} className={classes.link}>
					<CardMedia
						className={classes.media}
						image={image}
						title={title}
					/>
					<CardContent className={classes.content}>
						<Typography className={classes.title} variant="body1">
							{title}
						</Typography>
						<Typography
							variant="body1"
							className={`${classes.price} ${
								salePrice ? classes.hasSale : ""
							}`}
						>
							{price} VND
						</Typography>
						{salePrice && (
							<Typography
								variant="body1"
								className={classes.price}
							>
								{salePrice} VND
							</Typography>
						)}

						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className={classes.description}
						>
							{description}
						</Typography>
					</CardContent>
				</Link>
			</Card>
		</Box>
	);
};
export default ProductItem;
