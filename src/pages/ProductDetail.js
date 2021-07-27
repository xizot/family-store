import {
	alpha,
	Button,
	IconButton,
	makeStyles,
	Typography,
	Select,
	FormControl,
	MenuItem,
} from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import CustomArrowNext from "../components/CustomArrow/CustomArrowNext";
import CustomArrowPrev from "../components/CustomArrow/CustomArrowPrev";
import Header from "../components/Layout/Header";
import ProductItem from "../components/ProductItem/ProductItem";
import SideBar from "../components/SideBar/SideBar";
import { cartActions } from "../reducers/cart";
import NumericUpDown from "../components/UI/NumericUpDown";
import { moneyFormat } from "../helpers";
import Footer from "../components/Layout/Footer";
import { useTranslation } from "react-i18next";

const productItem = {
	id: "it1",
	title: "Lốc 5 gói mì xào Koreno vị gà 118g",
	description: `Đột phá với nước súp tôm thịt ngọt thanh ngọt đậm đà hợp khẩu vị người Việt Nam. Sợi mì dai, thơm, màu vàng đẹp mắt hòa quyện trong làn nước súp 3 Miền tròn vị tạo ra mì 3 Miền Gold chua cay Thái 75g cực hấp dẫn, là lựa chọn số một cho những bữa ăn nhanh gọn đơn giản mà vẫn đầy đủ dưỡng chất.</br>
				Loại mì Mì nước</br>
				Vị mì Chua cay Thái</br>
				Sợi mì Sợi tròn, nhỏ</br>
				Khối lượng 75g</br>
				Thành phần VẮT MÌ - Bột mì, shortening, phẩm màu (curcumin).</br>
				GÓI GIA VỊ - Bột tôm (40 g/kg), muối, đường, chất điều chỉnh độ acid (acid citric), điều vị (monosodium glutamate, disodium 5'-inosinate, disodium 5'-guanylate).</br>
				GÓI SÚP - Dầu thực vật, bột ớt.</br></br>

				GÓI RAU - Hành lá sấy, ngò gai sấy.</br>
				Cách dùng Cho vắt mì và các gói gia vị vào tô. Chế 400ml nước sôi vào tô mì, đậy kín và chờ trong 3 phút. Mở nắp, trộn đều và bắt đầu thưởng thức.</br>
				Bảo quản Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Không để gần hóa chất hoặc sản phẩm có mùi mạnh.</br>
				Thương hiệu 3 Miền (Việt Nam)</br>
				Sản xuất tại Việt Nam</br>`,
	images: [
		"https://cdn.tgdd.vn/Products/Images/2565/222735/bhx/loc-5-goi-mi-xao-koreno-volcano-vi-ga-118g-202103040211554701_300x300.jpg",
		"https://cdn.tgdd.vn/Products/Images/2564/200035/bhx/chao-tuoi-luon-dau-xanh-cay-thi-goi-260g-202102251707320901_300x300.jpg",
		"https://cdn.tgdd.vn/Products/Images/2565/222735/bhx/loc-5-goi-mi-xao-koreno-volcano-vi-ga-118g-202103040211554701_300x300.jpg",
		"https://cdn.tgdd.vn/Products/Images/2564/200035/bhx/chao-tuoi-luon-dau-xanh-cay-thi-goi-260g-202102251707320901_300x300.jpg",
		"https://cdn.tgdd.vn/Products/Images/2565/222735/bhx/loc-5-goi-mi-xao-koreno-volcano-vi-ga-118g-202103040211554701_300x300.jpg",
		"https://cdn.tgdd.vn/Products/Images/2564/200035/bhx/chao-tuoi-luon-dau-xanh-cay-thi-goi-260g-202102251707320901_300x300.jpg",
	],
	price: "54000",
	salePrice: null,
	cateId: null,
};

const suggestList = [
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

const districts = [
	{
		id: "QBT",
		title: "Quận Bình Thạnh",
	},
	{
		id: "Q1",
		title: "Quận 1",
	},
	{
		id: "Q2",
		title: "Quận 2",
	},
	{
		id: "Q3",
		title: "Quận 3",
	},
	{
		id: "Q4",
		title: "Quận 4",
	},
	{
		id: "Q5",
		title: "Quận 5",
	},
	{
		id: "Q9",
		title: "Quận 9",
	},
	{
		id: "Q10",
		title: "Quận 10",
	},
];

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

	top: {
		background: theme.palette.common.white,
		display: "flex",
		padding: "20px 30px",
		borderRadius: theme.shape.borderRadius,
		marginBottom: theme.spacing(2),
		[theme.breakpoints.down("sm")]: {
			flexWrap: "wrap",
			padding: theme.spacing(2),
		},
	},
	productImage: {
		width: "40%",
		overflow: "hidden",
		padding: "0 4px",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			marginBottom: theme.spacing(2),
		},
	},
	productInfo: {
		paddingLeft: theme.spacing(3),
		width: "60%",
		[theme.breakpoints.down("sm")]: {
			paddingLeft: 0,
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
	},
	districtSelector: {
		borderRadius: theme.shape.borderRadius,
		background: theme.palette.primary.main,
		padding: `0 ${theme.spacing(1)}px`,
		color: theme.palette.common.white,
		"& svg": { color: theme.palette.common.white },
		"&:before,&:after ": {
			display: "none",
		},
	},
	menuPaper: {
		maxHeight: 200,
	},
	thumbnail: {
		position: "relative",
		overflow: "hidden",
		margin: "0 auto",
		marginBottom: theme.spacing(1),

		width: 370,
		maxWidth: "100%",
		"& .slick-slide ": {
			padding: `0  35px`,
		},
		"& .slick-slide $sliderImage img": {
			padding: theme.spacing(1),
			border: `1px solid #ddd`,
			borderRadius: theme.shape.borderRadius,
		},
		"& .slick-current $sliderImage img": {
			borderRadius: theme.shape.borderRadius,
			borderColor: theme.palette.primary.main,
		},
	},
	slider: {
		position: "relative",

		"& .slick-slide $sliderImage img": {
			padding: theme.spacing(0.5),
			border: `1px solid #ddd`,
			borderRadius: theme.shape.borderRadius,
		},
		"& .slick-current $sliderImage img": {
			borderColor: theme.palette.primary.main,
		},
	},
	sliderControl: {
		maxWidth: "100%",
		[theme.breakpoints.down("sm")]: {
			width: 500,
			margin: "0 auto",
		},
		"& .slick-track": {
			margin: "auto",
		},
	},
	thumbnailImage: {
		"& img": {
			width: "100%",
			height: "100%",
		},
	},
	sliderImage: {
		"& img": {
			width: "100%",
			height: "100%",
		},
	},
	description: {
		borderRadius: theme.shape.borderRadius,
		background: theme.palette.common.white,
		padding: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	descriptionText: {
		position: "relative",
		marginBottom: theme.spacing(2),
	},
	isLess: {
		height: 100,
		overflow: "hidden",
		"&:before": {
			content: "''",
			position: "absolute",
			left: 0,
			bottom: 1,
			zIndex: 10,
			width: "100%",
			height: 70,
			boxShadow: `0px 3px 10px ${alpha(theme.palette.primary.main, 0.5)}`,
			background: `linear-gradient(to bottom, rgba(193, 193, 193,.3), ${theme.palette.primary.main})`,
			marginBottom: 1,
		},
	},
	title: {
		color: theme.palette.primary.main,
		marginBottom: theme.spacing(2),
		textAlign: "center",
		[theme.breakpoints.down("xs")]: {
			fontSize: "1.25rem",
		},
	},
	imgShowLess: {
		transform: "rotate(90deg)",
	},
	imgShowMore: {
		transform: "rotate(-90deg)",
	},
	btnToggleDescription: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},

	price: {
		fontWeight: "bold",
		marginBottom: theme.spacing(4),
		[theme.breakpoints.down("sm")]: {
			marginBottom: theme.spacing(2),
		},
	},
	shipPredict: {
		width: 400,
		maxWidth: "100%",
		padding: theme.spacing(1),
		border: `1px solid ${theme.palette.primary.main}`,
		borderRadius: theme.shape.borderRadius,
		marginBottom: theme.spacing(4),
		[theme.breakpoints.down("sm")]: {
			marginBottom: theme.spacing(3),
		},
	},
	shipPredictInfo: {
		display: "flex",
		alignItems: "center",
		flexWrap: "wrap",
		"&:not(:last-child)": {
			marginBottom: theme.spacing(1),
		},
	},
	shipPredictLabel: {
		width: 165,
		fontWeight: "bold",
	},
	suggestList: {
		padding: theme.spacing(2),
		marginBottom: theme.spacing(2),
		background: theme.palette.common.white,
		borderRadius: theme.shape.borderRadius,
	},
	suggestSlider: {
		overflow: "hidden",
		padding: "0px 2px",
	},
	suggestListContent: {
		position: "relative",
		padding: "0px 42px 15px",
	},
	addToCart: {
		display: "flex",
		alignItems: "center",
		width: 400,
		maxWidth: "100%",
		"& > button": {
			marginLeft: theme.spacing(2),
			flex: 1,
			whiteSpace: "nowrap",
		},
	},
}));

const suggestSettings = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 6,
	slidesToScroll: 6,
	nextArrow: <CustomArrowNext />,
	prevArrow: <CustomArrowPrev />,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4, //number of items to show per slide
				slidesToScroll: 4, //number of items gonna jump per click
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

const ProductDetail = (props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { productId } = useParams();
	const [toggleDescription, setToggleDescription] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [selectedDistrict, setSelectedDistrict] = useState("QBT");
	const classes = useStyles();
	const settings1 = useMemo(
		() => ({
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: <CustomArrowNext />,
			prevArrow: <CustomArrowPrev />,
		}),
		[]
	);
	const settings2 = useMemo(
		() => ({
			dots: false,
			infinite: productItem.images.length > 5,
			speed: 500,
			arrows: false,
			slidesToShow: 5,
		}),
		[]
	);
	const [nav1, setNav1] = useState(null);
	const [nav2, setNav2] = useState(null);

	const quantityAddHandler = () => {
		setQuantity((prevQuantity) =>
			prevQuantity < 50 ? prevQuantity + 1 : prevQuantity
		);
	};
	const quantityRemoveHandler = () => {
		setQuantity((prevQuantity) =>
			prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
		);
	};

	const itemAddToCartHandler = (item, quantity) => {
		dispatch(cartActions.addItem({ ...item, quantity }));
	};

	const descriptionToggleHandler = () => {
		setToggleDescription((prevState) => !prevState);
	};

	const districtChangeHandler = (e) => {
		setSelectedDistrict(e.target.value);
	};

	useEffect(() => {
		if (suggestList?.length >= 6) {
			suggestSettings.infinite = true;
		} else {
			suggestSettings.infinite = false;
		}
	}, []);

	return (
		<>
			<div className={classes.root}>
				<Header showMenu showCart />
				<SideBar />
				<div className={classes.main}>
					<div className={classes.mainContent}>
						<div className={classes.top}>
							<div className={classes.productImage}>
								<Slider
									asNavFor={nav2}
									ref={(slider1) => setNav1(slider1)}
									{...settings1}
									className={classes.thumbnail}
								>
									{productItem?.images &&
										productItem.images.map(
											(item, index) => (
												<div
													key={index}
													className={
														classes.sliderImage
													}
												>
													<img src={item} alt="" />
												</div>
											)
										)}
								</Slider>
								<Slider
									asNavFor={nav1}
									ref={(slider2) => setNav2(slider2)}
									swipeToSlide={true}
									focusOnSelect={true}
									{...settings2}
									className={`${classes.slider} ${classes.sliderControl}`}
								>
									{productItem?.images &&
										productItem.images.map(
											(item, index) => (
												<div
													key={index}
													className={
														classes.sliderImage
													}
												>
													<img src={item} alt="" />
												</div>
											)
										)}
								</Slider>
							</div>
							<div className={classes.productInfo}>
								<Typography variant="h6" component="p">
									{productItem.title} {productId}
								</Typography>

								<Typography
									variant="h6"
									component="p"
									className={classes.price}
								>
									{productItem?.price &&
										moneyFormat(productItem?.price)}{" "}
									VND
								</Typography>
								<div className={classes.shipPredict}>
									<div className={classes.shipPredictInfo}>
										<Typography
											variant="body2"
											className={classes.shipPredictLabel}
										>
											{t(
												"productDetailPage.estimatedDeliveryFee"
											)}
										</Typography>

										<Typography variant="body2">
											20.000 VND
										</Typography>
									</div>
									<div className={classes.shipPredictInfo}>
										<Typography
											variant="body2"
											className={classes.shipPredictLabel}
										>
											{t(
												"productDetailPage.districtOrWard"
											)}
										</Typography>
										<FormControl>
											<Select
												value={selectedDistrict}
												onChange={districtChangeHandler}
												className={
													classes.districtSelector
												}
												MenuProps={{
													classes: {
														paper: classes.menuPaper,
													},
												}}
											>
												{districts?.length > 0 &&
													districts.map(
														(item, index) => (
															<MenuItem
																key={index}
																value={item.id}
															>
																{item.title}
															</MenuItem>
														)
													)}
											</Select>
										</FormControl>
									</div>
								</div>
								<div className={classes.addToCart}>
									<NumericUpDown
										quantity={quantity}
										onAdd={quantityAddHandler}
										onRemove={quantityRemoveHandler}
										height="36px"
									/>
									<Button
										variant="contained"
										color="primary"
										onClick={() =>
											itemAddToCartHandler(
												{
													...productItem,
													image: productItem
														?.images[0],
												},
												quantity
											)
										}
									>
										{t("productDetailPage.addToCart")}
									</Button>
								</div>
							</div>
						</div>
						<div className={classes.description}>
							<Typography
								variant="h5"
								component="h3"
								className={classes.title}
							>
								{t("productDetailPage.productDescription")}
							</Typography>
							<Typography
								variant="body2"
								dangerouslySetInnerHTML={{
									__html: productItem.description,
								}}
								className={`${classes.descriptionText} ${
									toggleDescription ? classes.isLess : ""
								}`}
							/>
							<div className={classes.btnToggleDescription}>
								<IconButton
									onClick={descriptionToggleHandler}
									size="small"
								>
									<img
										style={{ height: "24px" }}
										src={`${process.env.PUBLIC_URL}/img/arrow-jump-left.png`}
										alt="Prev icon"
										className={`${
											toggleDescription
												? classes.imgShowMore
												: classes.imgShowLess
										}`}
									/>
								</IconButton>
								<Typography variant="caption">
									{toggleDescription
										? t("productDetailPage.showMore")
										: t("productDetailPage.showLess")}
								</Typography>
							</div>
						</div>
						<div className={classes.suggestList}>
							<Typography
								variant="h5"
								component="h3"
								className={classes.title}
							>
								{t("productDetailPage.suggestions")}
							</Typography>
							<div className={classes.suggestListContent}>
								<Slider
									{...suggestSettings}
									className={classes.suggestSlider}
								>
									{suggestList?.length > 0 &&
										suggestList.map((item, index) => (
											<ProductItem
												key={index}
												size="small"
												id={item.id}
												title={item.title}
												description={item.description}
												image={item.image}
												price={item.price}
												salePrice={item.salePrice}
												onAddToCart={itemAddToCartHandler.bind(
													null,
													item,
													1
												)}
											/>
										))}
								</Slider>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer hasSideBar />
		</>
	);
};
export default ProductDetail;
