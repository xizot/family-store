import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../components/Layout/Footer";
import ProductItem from "../components/ProductItem/ProductItem";
import SideBar from "../components/SideBar/SideBar";
import { cartActions } from "../reducers/cart";
import Header from "./../components/Layout/Header";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "100vh",
	},
	main: {
		marginLeft: "auto",
		width: "calc(100% - 260px)",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
	mainContent: {
		padding: "80px 10px 65px",
		[theme.breakpoints.down("xs")]: {
			padding: "68px 10px 85px",
			width: "100%",
		},
	},
	topContent: {
		width: "92wh",
		height: "50vh",
		margin: "auto",
		borderRadius: theme.shape.borderRadius,
		backgroundImage: "URL(https://images.prismic.io/jamcart/eb389b58-aacb-4cd4-8295-3732c949ace8_Mask+Group+28.png)",
		backgroundPosition: "right bottom",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			backgroundPosition: "60% 100%" ,
		},
	},
	topContentTitle: {
		width: "40%",
		position: "relative",
		top: "20%",
		left: "5%",
		[theme.breakpoints.down("sm")]: {
			top: "8%",
			width: "60%",
		},
		[theme.breakpoints.down("xs")]: {
			top: "8%",
			fontSize: "38px",
		},
	},
	topContentQuotes: {
		width: "35%",
		position: "relative",
		top: "22%",
		left: "5%",
		[theme.breakpoints.down("sm")]: {
			top: "10%",
			fontSize: "22px",
			width: "50%",
		},
		[theme.breakpoints.down("xs")]: {
			top: "10%",
			fontSize: "18px",
		},
	},
	leftContent: {
		width: "99%",
		height: "auto",
		marginTop: "20px",
		float: "left",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "#FFF",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
		
	},
	rightContent: {
		width: "99%",
		height: "auto",
		marginTop: "20px",
		float: "right",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "#FFF",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
	bottomContent: {
		width: "92wh",
		height: "auto",
		margin: "20px 0px",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "#FFF",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			height: "auto",
		},
	},
	topSaleTitle: {
		width: "100%",
		padding: "15px",
		textAlign: "center",
		color: "#F39148",
		fontWeight: "500",
	},
	listSale: {
		width: "100%",
		margin: 0,
	},
}));
const itemTopLastWeek = [
	{
		id: 1,
		title: "Sữa đột biến gen",
		description: "Sữa chống toxic",
		image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_36.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 2,
		title: "Card: Summon Dom Toretto",
		description: "Sức mạnh của Family là vô đối",
		image: "https://media-assets-ggwp.s3.ap-southeast-1.amazonaws.com/2021/07/meme-dom-toretto-featured-320x180.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 3,
		title: "Bánh sinh nhật cắm thép",
		description: "Bánh sinh nhật Jiraiya cắm xuyên thép.",
		image: "https://cf.shopee.vn/file/74b80f97a5c85824da751190bffbc5db",
		price: "4.99",
		salePrice: "3.99",
	},
];
const itemTopLastMonth = [
	{
		id: 1,
		title: "Sữa đột biến gen",
		description: "Sữa chống toxic",
		image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_36.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 2,
		title: "Card: Summon Dom Toretto",
		description: "Sức mạnh của Family là vô đối",
		image: "https://media-assets-ggwp.s3.ap-southeast-1.amazonaws.com/2021/07/meme-dom-toretto-featured-320x180.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 3,
		title: "Bánh sinh nhật cắm thép",
		description: "Bánh sinh nhật Jiraiya cắm xuyên thép.",
		image: "https://cf.shopee.vn/file/74b80f97a5c85824da751190bffbc5db",
		price: "4.99",
		salePrice: "3.99",
	},
];
const itemsOnSale = [
	{
		id: 1,
		title: "Sữa đột biến gen",
		description: "Sữa chống toxic",
		image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_36.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 2,
		title: "Card: Summon Dom Toretto",
		description: "Sức mạnh của Family là vô đối",
		image: "https://media-assets-ggwp.s3.ap-southeast-1.amazonaws.com/2021/07/meme-dom-toretto-featured-320x180.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 3,
		title: "Bánh sinh nhật cắm thép",
		description: "Bánh sinh nhật Jiraiya cắm xuyên thép.",
		image: "https://cf.shopee.vn/file/74b80f97a5c85824da751190bffbc5db",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 4,
		title: "Card: Summon Dom Toretto",
		description: "Sức mạnh của Family là vô đối",
		image: "https://media-assets-ggwp.s3.ap-southeast-1.amazonaws.com/2021/07/meme-dom-toretto-featured-320x180.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
];
const saleList = [
	{
		id: 1,
		title: "Sữa đột biến gen",
		description: "Sữa chống toxic",
		image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_36.jpg",
		price: "4.99",
		salePrice: "2.99",
	},
	{
		id: 2,
		title: "Sữa đột biến gen",
		description: "Sữa chống toxic",
		image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_36.jpg",
		price: "3.99",
	},
	{
		id: 3,
		title: "Sữa đột biến gen",
		description: "Sữa chống toxic",
		image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_36.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 4,
		title: "Sữa đột biến gen",
		description: "Sữa chống toxic",
		image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_36.jpg",
		price: "4.99",
	},
	{
		id: 5,
		title: "Sữa đột biến gen",
		description: "Sữa chống toxic",
		image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_36.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 6,
		title: "Sữa đột biến gen",
		description: "Sữa chống toxic",
		image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_36.jpg",
		price: "9.99",
	},
	{
		id: 7,
		title: "Sữa đột biến gen",
		description: "Sữa chống toxic",
		image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_36.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 8,
		title: "Sữa đột biến gen",
		description: "Sữa chống toxic",
		image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_36.jpg",
		price: "4.99",
	},
];

const HomePage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const itemAddToCartHandler = (item) => {
		dispatch(cartActions.addItem({ ...item, quantity: 1 }));
	};
	useEffect(() => {
		document.title = "Family Store - Easy to buy online";
	}, []);
	return (
		<>
			<div className={classes.root}>
				<Header showMenu showCart />
				<SideBar />
				<div className={classes.main}>
					<div className={classes.mainContent}>
						<div className={classes.topContent}>
							<Typography variant="h3" className={classes.topContentTitle}>
								Stay home & delivered your daily need’s
							</Typography>
							<Typography variant="h5" className={classes.topContentQuotes}>
								Start your daily shopping with Family Store
							</Typography>
						</div>
						<Grid container spacing={0} >
							<Grid item xs={12} sm={12} md={6}>
								<div className={classes.leftContent}>
									<Typography variant="h5" className={classes.topSaleTitle}>
										TOP ITEMS SELLING LAST WEEK
									</Typography>
										<Grid container	spacing={3}	className={classes.listSale}>
										{itemTopLastWeek?.length > 0 &&
										itemTopLastWeek.map((item, index) => (
										<Grid item xs={12} sm={4} md={4} key={index}>
											<ProductItem
												id={item.id}
												title={item.title}
												description={item.description}
												image={item.image}
												price={item.price}
												salePrice={item.salePrice}
												onAddToCart={itemAddToCartHandler.bind(null,item)}
											/>
										</Grid>
										))}
									</Grid>
								</div>
							</Grid>	
							<Grid item xs={12} sm={12} md={6}>
								<div className={classes.rightContent}>
									<Typography variant="h5" className={classes.topSaleTitle}>
										TOP ITEMS SELLING LAST MONTH
									</Typography>
										<Grid container	spacing={3}	className={classes.listSale}>
										{itemTopLastMonth?.length > 0 &&
										itemTopLastMonth.map((item, index) => (
										<Grid item xs={12} sm={4} md={4} key={index}>
											<ProductItem
												id={item.id}
												title={item.title}
												description={item.description}
												image={item.image}
												price={item.price}
												salePrice={item.salePrice}
												onAddToCart={itemAddToCartHandler.bind(null,item)}
											/>
										</Grid>
										))}
									</Grid>
								</div>
							</Grid>
						</Grid>
						<div className={classes.bottomContent}>
							<Typography variant="h5" className={classes.topSaleTitle}>
								ITEMS ON SALE
							</Typography>
							<Grid container	spacing={3}	className={classes.listSale}>
								{itemsOnSale?.length > 0 &&
									itemsOnSale.map((item, index) => (
									<Grid item xs={12} sm={6} md={3} key={index}>
										<ProductItem
											id={item.id}
											title={item.title}
											description={item.description}
											image={item.image}
											price={item.price}
											salePrice={item.salePrice}
											onAddToCart={itemAddToCartHandler.bind(null,item)}
										/>
									</Grid>
								))}
							</Grid>
						</div>
					</div>
				</div>
			</div>
			<Footer hasSideBar />
		</>
	);
};
export default HomePage;
