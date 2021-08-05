import {
	makeStyles,
	Typography,
	Grid,
	Button,
	TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import GenerateStarV2 from "../GenerateStarV2/GenerateStarV2";

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: theme.spacing(1),
		height: "auto",
		width: "100%",
		borderBottom: `1px solid #D3D3D3`,
		padding: theme.spacing(2),
	},
	image: {
		width: 100,
		marginRight: theme.spacing(2),
		"& img": {
			width: "100%",
			height: "auto",
			maxHeight: "100%",
			borderRadius: theme.shape.borderRadius,
			border: `solid 1px #DDDDDD`,
		},
	},
	productInfo: {
		display: "flex",
	},
	nameAndQuantity: {
		flex: 1,
	},
	name: {
		fontWeight: "bold",
		width: "100%",
	},
	quantity: {
		width: "100%",
	},
	stars: {
		float: "right",
		marginBottom: theme.spacing(1),
	},
	textarea: {
		borderRadius: theme.shape.borderRadius,
		width: "100%",
		marginBottom: theme.spacing(2),
	},
	executeButton: {
		float: "right",
		marginBottom: theme.spacing(2),
	},
}));

const ReviewsOrderItem = ({ id, name, quantity, img, onReview }) => {
	const classes = useStyles();
	const [numOfStar, setNumOfStar] = useState(5);
	const [comment, setComment] = useState("");

	const commentHandler = (e) => {
		setComment(e.target.value);
	};
	const numOfStarHandler = (number) => {
		setNumOfStar(number);
	};
	const reviewHandler = () => {
		onReview({
			productId: id,
			numOfStar,
			comment,
		});
	};
	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item sm={12} md={6} className={classes.productInfo}>
					<div className={classes.image}>
						<img src={img} alt="Product Img" />
					</div>
					<div className={classes.nameAndQuantity}>
						<div className={classes.name}>
							<Typography
								variant="body1"
								className={classes.name}
							>
								{name}
							</Typography>
						</div>
						<div className={classes.quantity}>
							<div>
								<Typography variant="body2">
									x{quantity}
								</Typography>
							</div>
						</div>
					</div>
				</Grid>
				<Grid item xs={12} md={6} className={classes.actions}>
					<div className={classes.stars}>
						<GenerateStarV2
							numOfStar={numOfStar}
							onChangeStar={numOfStarHandler}
						/>
					</div>

					<TextField
						multiline
						rows={4}
						variant="filled"
						placeholder="Comment what you think about this product?"
						className={classes.textarea}
						value={comment}
						onChange={commentHandler}
					/>
					<Button
						variant="contained"
						color="primary"
						className={classes.executeButton}
						onClick={reviewHandler}
					>
						Review
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};
export default ReviewsOrderItem;
