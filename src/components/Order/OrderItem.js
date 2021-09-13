import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

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
		fontWeight: "bold",
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
	const { t } = useTranslation();

	return (
		<div className={classes.root}>
			<img src={img} alt="" className={classes.image} />
			<div className={classes.content}>
				<div className={classes.top}>
					<Typography variant="body1" className={classes.name}>
						{t("ordersPage.item.orderId")} {id}
					</Typography>
					<Typography variant="body1" className={classes.status}>
						{t("ordersPage.item.status")} {status.toUpperCase()}
					</Typography>
				</div>
				<div className={classes.body}>
					<div>
						<Typography variant="body2"> {t("ordersPage.item.createdDate")} {date}</Typography>
						<Typography variant="body2">
							{t("ordersPage.item.deliveryDate")} {expected}
						</Typography>
					</div>
					<div className={classes.total}>
						<Typography variant="body2">
							{t("ordersPage.item.totalPayment")} {total} VNĐ
						</Typography>
						<Link to={`/reviews/${id}`}>
							<Typography
								variant="body2"
								style={{ float: "right", color: "#F39148" }}
							>
								{t("generalButtons.seeDetails")}
							</Typography>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProductItem;
