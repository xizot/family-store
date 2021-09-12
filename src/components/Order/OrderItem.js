import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		marginBottom: theme.spacing(1),
		height: "110px",
		borderBottom: `1px solid #D3D3D3`,
		padding: theme.spacing(1),
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: "50%",
		marginRight: theme.spacing(2),
	},
	name: {
		fontWeight: "bold",
		marginRight: theme.spacing(1),
	},
	status: {
		position: "absolute",
		right: "30px",
	},
	content: {
		flex: 1,
	},
	top: {
		display: "flex",
		flexWrap: "wrap",
		paddingBottom: "20px",
	},
	body: {
		display: "flex",
		flexWrap: "wrap",
	},
	total: {
		position: "absolute",
		right: "30px",
	},
}));

const ProductItem = ({ id, date, expected, status, total, img , detail}) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<img src={img} alt="" className={classes.image} />
			<div className={classes.content}>
				<div className={classes.top}>
					<Typography variant="body1" className={classes.name}>
						ORDER ID: {id}
					</Typography>
					<Typography variant="body1" className={classes.status}>
						Status: {status}
					</Typography>
				</div>
				<div className={classes.body}>
					<div>
						<Typography variant="body2">Date: {date}</Typography>
						<Typography variant="body2">
							Expected: {expected}
						</Typography>
					</div>
					<div className={classes.total}>
						<Typography variant="body2">
							Total: {total} VND
						</Typography>
						<Link to={`/reviews/${id}`}>
							<Typography
								variant="body2"
								style={{ float: "right", color: "#F39148" }}
							>
								Detail
							</Typography>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProductItem;
