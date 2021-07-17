import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../components/Layout/Footer";
import ProductItem from "../components/ProductItem/ProductItem";
import SideBar from "../components/SideBar/SideBar";
import { cartActions } from "../reducers/cart";
import Header from "./../components/Layout/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
		padding: `80px ${theme.spacing(2)}px 65px`,
		[theme.breakpoints.down("xs")]: {
			padding: `68px ${theme.spacing(2)}px 85px`,
			width: "100%",
		},
	},

	topContent: {
		height: "50vh",
		borderRadius: theme.shape.borderRadius,
		padding: 45,
		backgroundImage:
			"URL(https://images.prismic.io/jamcart/eb389b58-aacb-4cd4-8295-3732c949ace8_Mask+Group+28.png)",
		backgroundPosition: "right bottom",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			backgroundPosition: "60% 100%",
		},
		marginBottom: theme.spacing(2),
		[theme.breakpoints.down("sm")]: {
			padding: 30,
		},
		[theme.breakpoints.down("xs")]: {
			padding: 15,
		},
	},

	topContentTitle: {
		width: "60%",
		marginBottom: theme.spacing(2),
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
		[theme.breakpoints.down("xs")]: {
			fontSize: "38px",
		},
	},

	topContentQuotes: {
		width: "60%",
		[theme.breakpoints.down("sm")]: {
			fontSize: "22px",
			width: "100%",
		},
		[theme.breakpoints.down("xs")]: {
			fontSize: "18px",
		},
	},
	sliderBox: {
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "#FFF",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
	saleContent: {
		marginBottom: theme.spacing(1),
	},
	bottomContent: {
		marginBottom: theme.spacing(2),
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

	sliderCustom: {
		width: "auto",
		height: "auto",
		padding: "0px 30px 15px",
	},

	sliderCustomArrowPrev: {
		cursor: "pointer",
		position: "absolute",
		top: "45%",
		left: 5,
	},

	sliderCustomArrowNext: {
		cursor: "pointer",
		position: "absolute",
		top: "45%",
		right: 5,
	},

	listSale: {
		width: "100%",
		margin: 0,
	},
}));

const CustomArrowPrev = (props) => {
	const classes = useStyles();
	const { onClick } = props;
	return (
		<div className={classes.sliderCustomArrowPrev} onClick={onClick}>
			<img
				style={{ height: "24px" }}
				src={`${process.env.PUBLIC_URL}/img/arrow-jump-left.png`}
				alt="Prev icon"
			/>
		</div>
	);
};

const CustomArrowNext = (props) => {
	const classes = useStyles();
	const { onClick } = props;
	return (
		<div className={classes.sliderCustomArrowNext} onClick={onClick}>
			<img
				style={{ height: "24px" }}
				src={`${process.env.PUBLIC_URL}/img/arrow-jump-right.png`}
				alt="Prev icon"
			/>
		</div>
	);
};

const sliderSettings = {
	dots: false,
	infinite: true,
	slidesToShow: 3, //number of page to show per slide
	slidesToScroll: 3, //number of pages gonna jump per click
	initialSize: 0,
	autoplay: true,
	autoplaySpeed: 5000,
	cssEase: "linear",
	pauseOnHover: true,
	nextArrow: <CustomArrowNext />,
	prevArrow: <CustomArrowPrev />,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 2, //number of items to show per slide
				slidesToScroll: 2, //number of items gonna jump per click
			},
		},
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 3, //number of items to show per slide
				slidesToScroll: 3, //number of items gonna jump per click
				initialSize: 0,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2, //number of items to show per slide
				slidesToScroll: 2, //number of items gonna jump per click
				initialSize: 0,
			},
		},
		{
			breakpoint: 360,
			settings: {
				slidesToShow: 1, //number of items to show per slide
				slidesToScroll: 1, //number of items gonna jump per click
				initialSize: 0,
			},
		},
	],
};

const itemTopLastWeek = [
	{
		id: 1,
		title: "Rau salad tươi 500g",
		description: "Rau salada tươi từ Đà Lạt",
		image: "https://wna.cdnxbvn.com/wp-content/uploads/2019/03/xa-lach.jpg",
		price: "20.000",
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
		title: "Card: Đảo chiều/phản toàn bộ",
		description: "Phản toàn bộ sát thương và hiệu ứng xấu.",
		image: "https://m.media-amazon.com/images/I/515EBaHdMoL._AC_SL1000_.jpg",
		price: "4.99",
		salePrice: "1.99",
	},
	{
		id: 5,
		title: "Card: Tĩnh mịch",
		description: "Làm cho đối phương bị câm nít, bất động.",
		image: "https://ih1.redbubble.net/image.975426852.6322/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 6,
		title: "Nước tăng động",
		description: "Giúp bạn +200% tăng động, +1000% bại não.",
		image: "http://bizweb.dktcdn.net/thumb/large/100/232/204/products/red-blue.jpg?v=1567174449490",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 7,
		title: "Gương chiếu yêu",
		description: "Trừ gian diệt tà",
		image: "https://tranhdaquyhoangthu.com/wp-content/uploads/2020/06/g%C6%B0%C6%A1ng-chieu-yeu-tranh-da-quy3.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 8,
		title: "Gậy bắt ma",
		description: "Bắt ma hiệu quả +200%.",
		image: "https://www.thietbithuy.vn/image/cache/catalog/cable-pig-catcher-500x500.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
];

const itemTopLastMonth = [
	{
		id: 1,
		title: "Rau salad tươi 500g",
		description: "Rau salada tươi từ Đà Lạt",
		image: "https://wna.cdnxbvn.com/wp-content/uploads/2019/03/xa-lach.jpg",
		price: "20.000",
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
		title: "Card: Đảo chiều/phản toàn bộ",
		description: "Phản toàn bộ sát thương và hiệu ứng xấu.",
		image: "https://m.media-amazon.com/images/I/515EBaHdMoL._AC_SL1000_.jpg",
		price: "4.99",
		salePrice: "1.99",
	},
	{
		id: 5,
		title: "Card: Tĩnh mịch",
		description: "Làm cho đối phương bị câm nít, bất động.",
		image: "https://ih1.redbubble.net/image.975426852.6322/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 6,
		title: "Nước tăng động",
		description: "Giúp bạn +200% tăng động, +1000% bại não.",
		image: "http://bizweb.dktcdn.net/thumb/large/100/232/204/products/red-blue.jpg?v=1567174449490",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 7,
		title: "Gương chiếu yêu",
		description: "Trừ gian diệt tà",
		image: "https://tranhdaquyhoangthu.com/wp-content/uploads/2020/06/g%C6%B0%C6%A1ng-chieu-yeu-tranh-da-quy3.jpg",
		price: "4.99",
		salePrice: "3.99",
	},
	{
		id: 8,
		title: "Gậy bắt ma",
		description: "Bắt ma hiệu quả +200%.",
		image: "https://www.thietbithuy.vn/image/cache/catalog/cable-pig-catcher-500x500.jpg",
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
							<Typography
								variant="h3"
								className={classes.topContentTitle}
							>
								Stay home & delivered your daily need’s
							</Typography>
							<Typography
								variant="h5"
								className={classes.topContentQuotes}
							>
								Start your daily shopping with Family Store
							</Typography>
						</div>
						<Grid
							container
							spacing={2}
							className={classes.saleContent}
						>
							<Grid item xs={12} sm={12} md={6}>
								<div className={classes.sliderBox}>
									<Typography
										variant="h5"
										className={classes.topSaleTitle}
									>
										TOP ITEMS SELLING LAST WEEK
									</Typography>
									<Slider
										{...sliderSettings}
										className={classes.sliderCustom}
									>
										{itemTopLastWeek?.length > 0 &&
											itemTopLastWeek.map(
												(item, index) => (
													<ProductItem
														key={index}
														size="small"
														id={item.id}
														title={item.title}
														description={
															item.description
														}
														image={item.image}
														price={item.price}
														salePrice={
															item.salePrice
														}
														onAddToCart={itemAddToCartHandler.bind(
															null,
															item
														)}
													/>
												)
											)}
									</Slider>
								</div>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<div className={classes.sliderBox}>
									<Typography
										variant="h5"
										className={classes.topSaleTitle}
									>
										TOP ITEMS SELLING LAST MONTH
									</Typography>
									<Slider
										{...sliderSettings}
										className={classes.sliderCustom}
									>
										{itemTopLastMonth?.length > 0 &&
											itemTopLastMonth.map(
												(item, index) => (
													<ProductItem
														key={index}
														size="small"
														id={item.id}
														title={item.title}
														description={
															item.description
														}
														image={item.image}
														price={item.price}
														salePrice={
															item.salePrice
														}
														onAddToCart={itemAddToCartHandler.bind(
															null,
															item
														)}
													/>
												)
											)}
									</Slider>
								</div>
							</Grid>
						</Grid>
						<div className={classes.bottomContent}>
							<Typography
								variant="h5"
								className={classes.topSaleTitle}
							>
								ITEMS ON SALE
							</Typography>
							<Grid
								container
								spacing={3}
								className={classes.listSale}
							>
								{itemsOnSale?.length > 0 &&
									itemsOnSale.map((item, index) => (
										<Grid
											item
											xs={12}
											sm={6}
											md={3}
											key={index}
										>
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
			</div>
			<Footer hasSideBar />
		</>
	);
};
export default HomePage;
