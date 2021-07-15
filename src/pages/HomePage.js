import { Grid, makeStyles } from "@material-ui/core";
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
		padding: "74px 10px 65px",
		[theme.breakpoints.down("xs")]: {
			padding: "56px 0 85px",
		},
	},
	listSale: {
		width: "100%",
		margin: 0,
	},
}));

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
		document.title = "Family Store - Easy buy online";
	}, []);
	return (
		<>
			<div className={classes.root}>
				<Header showMenu showCart />
				<SideBar />
				<div className={classes.main}>
					<div className={classes.mainContent}>
						<Grid
							container
							spacing={3}
							className={classes.listSale}
						>
							{saleList?.length > 0 &&
								saleList.map((item, index) => (
									<Grid item xs={6} sm={4} md={3} key={index}>
										<ProductItem
											id={item.id}
											title={item.title}
											description={item.description}
											image={item.image}
											price={item.price}
											salePrice={item.salePrice}
											onAddToCart={itemAddToCartHandler.bind(
												null,
												item
											)}
										/>
									</Grid>
								))}
						</Grid>
					</div>
				</div>
			</div>
			<Footer hasSideBar />
		</>
	);
};
export default HomePage;
