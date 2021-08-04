import { makeStyles, Typography, Grid, TextareaAutosize, Button } from '@material-ui/core';
import GenerateStar from "../GenerateStar/GenerateStar";
import React from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: theme.spacing(1),
		height: 'auto',
		width: '100%',
		borderBottom: `1px solid #D3D3D3`,
		padding: theme.spacing(2)
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: theme.shape.borderRadius,
		marginRight: theme.spacing(2),
		border: `solid 1px #DDDDDD`
	},
	nameAndQuantity :{
		float:"left",
		marginLeft: theme.spacing(2)
	},
	name: {
		fontWeight: 'bold',
		width: '100%'
	},
	quantity: {
		width: '100%'
	},
	stars: {
		float: "right",
		marginBottom: theme.spacing(2),
		[theme.breakpoints.down("sm")]: {
			float:"none",
			marginLeft:"40%"
		},
		[theme.breakpoints.down("xs")]: {
			
		},
	},
	textarea: {
		borderColor: '#DDDDDD',
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(1),
		width: '100%',
		marginBottom: theme.spacing(2)
	},
	executeButton: {
		float: 'right',
		marginBottom: theme.spacing(2)
	}
}));

const ReviewsOrderItem = ({ name, quantity, img }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={6} sm={6} md={1}>
					<img src={img} alt="Product Img" className={classes.image} />
				</Grid>
				<Grid item xs={6} sm={6} md={5}>
					<div className={classes.nameAndQuantity}>
						<div className={classes.name}>
							<Typography variant="body1" className={classes.name}>
								{name}
							</Typography>
						</div>
						<div className={classes.quantity}>
							<div>
								<Typography variant="body2">x{quantity}</Typography>
							</div>
						</div>
					</div>
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<div className={classes.stars}>
						<GenerateStar
							numOfStar={5}
							rootCustom={classes.starReviewed}
						/>
					</div>
					<TextareaAutosize
						maxRows={4}
						minRows={4}
						aria-label=""
						placeholder="Comment what you think about this product?"
						defaultValue=""
						className={classes.textarea}
					/>
					<Button variant="contained" color="primary" className={classes.executeButton}>
						Done
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};
export default ReviewsOrderItem;
