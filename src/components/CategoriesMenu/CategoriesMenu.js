import { alpha, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import CategoryItem from "./CategoryItem/CategoryItem";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		overflow: "auto",
	},
	top: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "30px 20px 10px",
	},
	iconClose: {
		display: "none",
		[theme.breakpoints.down("sm")]: {
			display: "block",
		},
	},
	title: {
		opacity: 0.4,
		fontWeight: "bold",
	},
	line: {
		width: "calc(100% - 40px)",
		display: "block",
		margin: "0 auto",
		height: 1,
		background: alpha("#000000", 0.2),
	},
}));

const categories = [
	{
		id: "vegetables",
		title: "Vegetables",
		items: [
			{ id: "herbs", title: "Herbs" },
			{ id: "packed-vegetables", title: "Packed Vegetables" },
			{ id: "fresh-vegetables", title: "Vegetables" },
		],
	},
	{
		id: "organic",
		title: "Organic",
		items: [
			{ id: "spice", title: "Spice" },
			{ id: "honey", title: "Honey" },
			{ id: "oil", title: "Oil" },
		],
	},
	{
		id: "snack-beverages",
		title: "Snack & Beverages",
		items: [
			{ id: "juice", title: "Juice" },
			{ id: "coffee", title: "Coffee" },
			{ id: "tea", title: "Tea" },
		],
	},
	{
		id: "snack-beverages",
		title: "Snack & Beverages",
		items: [
			{ id: "juice", title: "Juice" },
			{ id: "coffee", title: "Coffee" },
			{ id: "tea", title: "Tea" },
		],
	},
	{
		id: "snack-beverages",
		title: "Snack & Beverages",
		items: [
			{ id: "juice", title: "Juice" },
			{ id: "coffee", title: "Coffee" },
			{ id: "tea", title: "Tea" },
		],
	},
	{
		id: "snack-beverages",
		title: "Snack & Beverages",
		items: [
			{ id: "juice", title: "Juice" },
			{ id: "coffee", title: "Coffee" },
			{ id: "tea", title: "Tea" },
		],
	},
];
const CategoriesMenu = ({ onClose }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.top}>
				<Typography variant="h6" className={classes.title}>
					All Categories
				</Typography>
				<IconButton className={classes.iconClose} onClick={onClose}>
					<Close />
				</IconButton>
			</div>
			<span className={classes.line}></span>
			<ul>
				{categories?.length > 0 &&
					categories.map((item, index) => (
						<CategoryItem
							key={index}
							id={item.id}
							title={item.title}
							items={item.items}
						/>
					))}
			</ul>
		</div>
	);
};

export default CategoriesMenu;
