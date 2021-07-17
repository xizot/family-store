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
		id: "it1",
		title: "Lốc 5 gói mì xào Koreno vị gà 118g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2565/222735/bhx/loc-5-goi-mi-xao-koreno-volcano-vi-ga-118g-202103040211554701_300x300.jpg",
		price: "54000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it2",
		title: "Cháo lươn đậu xanh Cây Thị 260g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2564/200035/bhx/chao-tuoi-luon-dau-xanh-cay-thi-goi-260g-202102251707320901_300x300.jpg",
		price: "22500",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it3",
		title: "Cháo tươi thịt heo Cây Thị 260g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2564/200036/bhx/chao-tuoi-thit-heo-cay-thi-goi-260g-202102251711586607_300x300.jpg",
		price: "19000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it4",
		title: "Cháo tươi rau củ Cây Thị gói 260g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2564/200028/bhx/chao-tuoi-rau-cu-thap-cam-cay-thi-goi-260g-202102251707400258_300x300.jpg",
		price: "20000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it5",
		title: "Lốc 6 gói mì Jomo xốt bò hầm 78g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2565/227760/bhx/loc-6-goi-mi-jomo-vi-xot-bo-ham-78g-202102282051044085_300x300.jpg",
		price: "26000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it6",
		title: "Thùng 6 lốc mì Jomo xốt bò hầm 78g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2565/227769/bhx/thung-6-loc-mi-jomo-vi-xot-bo-ham-78g-202103032327578370_300x300.jpg",
		price: "156000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it7",
		title: "Mì tương đen Bắc Kinh Ottogi 83g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2565/200245/bhx/mi-tuong-den-bac-kinh-ottogi-goi-83g-202102282139048980_300x300.jpg",
		price: "9600",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it8",
		title: "Chả quế dạng que mini C.P gói 300g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/7169/227963/bhx/cha-que-mini-cp-goi-300g-202104270802397830_300x300.jpg",
		price: "36000",
		salePrice: null,
		cateId: null,
	},
];

const itemTopLastMonth = [
	{
		id: "it9",
		title: "Pizza Manna phô mai HT Food 120g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/8359/211616/bhx/pizza-manna-pho-mai-ht-food-120g-202103021522373011_300x300.jpg",
		price: "40000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it10",
		title: "Táo Fuji Nam Phi 1kg (5-7 trái)",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/7578/223866/bhx/tao-fuji-nhap-khau-nam-phi-hop-1kg-8-9-trai-202105130857033513_300x300.jpeg",
		price: "65000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it11",
		title: "Táo Gala nhập khẩu New Zealand 1kg",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/7578/202932/bhx/tao-gala-nhap-khau-new-zealand-tui-1kg-6-7-trai-202103041505372826_300x300.jpg",
		price: "65000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it12",
		title: "Cam vàng Valencia Úc túi 1kg",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/7578/202933/bhx/cam-vang-valencia-uc-hop-1kg-4-5-trai-202101271643141394_300x300.jpg",
		price: "64.500",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it13",
		title: "Sữa tươi có đường Vinamilk 1 lít",
		description: "",
		image: "https://cdn.tgdd.vn/bachhoaxanh/themes-combo/54.Mobile.jpg",
		price: "30400",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it14",
		title: "Sữa trái cây Nutriboost dâu 1 lít",
		description: "",
		image: "https://cdn.tgdd.vn/bachhoaxanh/themes-combo/47.Mobile.jpg",
		price: "22300",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it15",
		title: "6 chai trà chanh dây FuzeTea 450ml",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/8938/118083/bhx/6-chai-tra-chanh-day-va-hat-chia-fuze-tea-450ml-202103312239243567_300x300.jpg",
		price: "39000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it16",
		title: "6 chai nước tinh khiết Lama 350ml",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2563/227259/bhx/loc-6-chai-nuoc-tinh-khiet-lama-350ml-202103032306223804_300x300.jpg",
		price: "18000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it17",
		title: "6 chai nước Mirinda đá me 390ml",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2443/229525/bhx/loc-6-chai-nuoc-ngot-mirinda-da-me-390ml-202103312237572579_300x300.jpg",
		price: "34000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it18",
		title: "6 lon bia Carlsberg Smooth 330ml",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2282/195963/bhx/6-lon-bia-carlsberg-smooth-draught-330ml-202103191328328045_300x300.jpg",
		price: "85000",
		salePrice: null,
		cateId: null,
	},
];

const itemsOnSale = [
	{
		id: "it19",
		title: "6 chai nước tăng lực Compact 330ml",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3226/209444/bhx/6-chai-nuoc-tang-luc-compact-vi-cherry-330ml-202103272202222181_300x300.jpg",
		price: "54000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it20",
		title: "Nước ép xoài Yooh lon cao 240ml",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3265/209407/bhx/nuoc-ep-xoai-yooh-240ml-202103271538009854_300x300.jpg",
		price: "9000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it21",
		title: "6 chai nước Wake Up 247 330ml",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3226/195239/bhx/6-chai-nuoc-tang-luc-wake-up-247-vi-ca-phe-330ml-202103272152303718_300x300.jpg",
		price: "53000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it22",
		title: "Lốc 6 gói mì Jomo xốt bò hầm 78g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2565/227760/bhx/loc-6-goi-mi-jomo-vi-xot-bo-ham-78g-202102282051044085_300x300.jpg",
		price: "26000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it23",
		title: "Hạt nêm thịt xương tuỷ Knorr 1,2kg",
		description: "",
		image: "https://cdn.tgdd.vn/bachhoaxanh/themes-combo/7.Mobile.jpg",
		price: "93000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it24",
		title: "Dầu đậu nành Janbee can 5 lít",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2286/211351/bhx/dau-dau-nanh-tinh-luyen-janbee-can-5-lit-202104141650195418_300x300.jpg",
		price: "225000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it25",
		title: "Nước tương đậm đặc Maggi 700ml",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2683/76548/bhx/nuoc-tuong-dau-nanh-dam-dac-maggi-chai-700ml-202104191414162279_300x300.jpg",
		price: "30400",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it26",
		title: "Đánh răng PS than hoạt tính 180g",
		description: "",
		image: "https://cdn.tgdd.vn/bachhoaxanh/themes-combo/18.Mobile.jpg",
		price: "28000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it27",
		title: "Nước rửa tay Lifebuoy túi 443ml",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2486/76494/bhx/nuoc-rua-tay-lifebuoy-bao-ve-vuot-troi-tui-443ml-202103022351568988_300x300.jpg",
		price: "46000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it28",
		title: "Rửa tay Antabax sảng khoái 450ml",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2486/232977/bhx/nuoc-rua-tay-khang-khuan-antabax-sang-khoai-tui-450ml-202103030020563210_300x300.jpg",
		price: "29000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it30",
		title: "Rửa tay Antabax bảo vệ da 450ml",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2486/232976/bhx/nuoc-rua-tay-khang-khuan-antabax-bao-ve-da-tui-450ml-202103030016274557_300x300.jpg",
		price: "31000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it31",
		title: "Bộ 3 bàn chải Colgate Highdensity",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2491/235665/bhx/bo-3-ban-chai-danh-rang-colgate-highdensity-than-hoat-tinh-202103110859522363_300x300.jpg",
		price: "62000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it32",
		title: "Khăn giấy rút Puri 3 lớp 100 tờ",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3004/230824/bhx/khan-giay-puri-3-lop-hop-100-to-giao-mau-ngau-nhien-202104231321532369_300x300.jpg",
		price: "18000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it33",
		title: "Xà phòng bảo vệ da Antabax cục 85g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2485/233092/bhx/xa-phong-khang-khuan-antabax-bao-ve-da-85g-202103031130475883_300x300.jpg",
		price: "7000",
		salePrice: null,
		cateId: null,
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
