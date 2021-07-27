import {
	Grid,
	makeStyles,
	NativeSelect,
	withStyles,
	InputBase,
	Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../reducers/cart";
import Footer from "../components/Layout/Footer";
import SideBar from "../components/SideBar/SideBar";
import Header from "./../components/Layout/Header";
import ProductItem from "./../components/ProductItem/ProductItem";
import { uiActions } from "../reducers/ui";

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
	shadow: {
		boxShadow: "0px 2px 8px rgba(0,0,0,.1)",
	},

	mainContent: {
		padding: `80px ${theme.spacing(2)}px 65px`,
		[theme.breakpoints.down("xs")]: {
			padding: `68px ${theme.spacing(2)}px 85px`,
			width: "100%",
		},
	},
	topContent: {
		backgroundColor: "white",
		borderRadius: theme.shape.borderRadius,

		padding: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},

	listItem: {
		background: "#fff",
		borderRadius: theme.shape.borderRadius,
		width: "100%",
		margin: 0,
		padding: theme.spacing(1),
	},
	filter: {
		marginTop: theme.spacing(2),
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
	},
	filterItem: {
		display: "flex",
		alignItems: "center",
		"&:not(:last-child)": {
			marginRight: theme.spacing(3),
		},
		[theme.breakpoints.down("xs")]: {
			"&:not(:last-child)": {
				marginBottom: theme.spacing(1),
			},
		},
	},
	label: {
		[theme.breakpoints.down("xs")]: {
			minWidth: 70,
		},
	},
	select: {
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "#F39148",
		marginLeft: theme.spacing(1),
		"& svg": {
			color: theme.palette.common.white,
		},
	},
	pagination: {
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "#FFF",
		"& > *": {
			padding: "20px",
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(1),
			justifyContent: "center",
			display: "flex",
		},
	},
}));
const BootstrapInput = withStyles((theme) => ({
	root: {
		"label + &": {
			marginTop: theme.spacing(2),
		},
	},
	input: {
		borderRadius: 4,
		position: "relative",
		border: "1px solid #ced4da",
		fontSize: 14,
		color: "#FFF",
		height: 17,
		width: 75,
		padding: "10px 26px 7px 12px",
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		fontFamily: ["Arial"].join(","),
		"&:focus": {
			borderRadius: 4,
			borderColor: "#80bdff",
			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
		},
		[theme.breakpoints.down("sm")]: {},
		[theme.breakpoints.down("xs")]: {},
	},
}))(InputBase);
const itemsSearch = [
	{
		id: "it35",
		title: "Mì trứng cao cấp Meizan gói 500g",
		description: "",
		image: "https://cdn.tgdd.vn/bachhoaxanh/themes-combo/54.Mobile.jpg",
		price: "31800",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it36",
		title: "Gạo Trạng Nhất Vinh Hiển túi 5kg",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2513/233632/bhx/gao-nhat-vi-vinh-hien-tui-5kg-202102240855454935_300x300.png",
		price: "141000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it37",
		title: "Phô mai vị sữa Teama hộp 120g",
		description: "",
		image: "https://cdn.tgdd.vn/bachhoaxanh/themes-combo/54.Mobile.jpg",
		price: "26000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it38",
		title: "Chả giò hải sản đặc biệt gói 500g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/7171/232189/bhx/cha-gio-hai-san-dac-biet-bep-5-sao-goi-500g-202104262322482875_300x300.jpg",
		price: "49000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it39",
		title: "Xúc xích heo hầm nấm Xuxifarm 175g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3507/228215/bhx/xuc-xich-vi-heo-ham-nam-bao-ngu-xuxifarm-goi-175g-202104281658120675_300x300.jpg",
		price: "15200",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it40",
		title: "Xúc xích Teen lắc trứng muối 53g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3507/242221/bhx/xuc-xich-teen-lac-vui-vi-trung-muoi-rong-bien-lc-foods-ly-53g-202107101321095096_300x300.jpg",
		price: "9100",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it41",
		title: "Bánh quy bơ O&T Royal Danish 110g",
		description: "",
		image: "https://cdn.tgdd.vn/bachhoaxanh/themes-combo/19.Mobile.jpg",
		price: "21000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it42",
		title: "Bánh quy vị phô mai Zess gói 153g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3357/235184/bhx/banh-quy-pho-mai-zess-goi-153g-202102250849308735_300x300.jpg",
		price: "21000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it43",
		title: "Snack khoai tây cay Karamucho 80g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3364/222001/bhx/snack-khoai-tay-vi-cay-dac-biet-lat-day-karamucho-goi-80g-202104291427315695_300x300.jpg",
		price: "18800",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it44",
		title: "Snack khoai tây vị cua ớt Peke 80g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3364/219748/bhx/snack-khoai-tay-peke-potato-chips-vi-cua-xao-ot-lon-80g-202104291435006467_300x300.jpg",
		price: "20900",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it45",
		title: "Bánh xốp nhân phô mai gói 53.5g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3360/79907/bhx/banh-xop-nhan-pho-mai-cal-cheese-goi-535g-202104261653043694_300x300.jpg",
		price: "6300",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it46",
		title: "Bánh quy Kokola socola hộp 100g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3357/221390/bhx/banh-quy-socola-kokola-waffle-cookies-hop-100g-202104261055316187_300x300.jpg",
		price: "19900",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it47",
		title: "Bánh quy vị sữa Richwell hộp 160g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3357/237360/bhx/banh-quy-sua-richwell-hop-160g-202105030958519213_300x300.jpg",
		price: "21000₫",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it48",
		title: "Nước giặt hương nước hoa Surf 3lít",
		description: "",
		image: "https://cdn.tgdd.vn/bachhoaxanh/themes-combo/49.Mobile.jpg",
		price: "94500",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it49",
		title: "Nước rửa chén IZI HOME túi 1.5kg",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2387/230727/bhx/nuoc-rua-chen-izi-home-huong-tra-xanh-muoi-bien-tui-15kg-202105271104154899_300x300.jpg",
		price: "33000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it50",
		title: "Tẩy bồn cầu và nhà tắm VIM 900ml",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2511/76924/bhx/nuoc-tay-bon-cau-nha-tam-vim-diet-khuan-900ml-202107141655058630_300x300.jpg",
		price: "33000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it51",
		title: "Nước giặt nước hoa Lix túi 2.5 lít",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2464/212820/bhx/nuoc-giat-lix-matic-huong-nuoc-hoa-tui-25-lit-202104141624074036_300x300.jpg",
		price: "67000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it52",
		title: "Nước rửa chén IZI HOME túi 750g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2387/234231/bhx/nuoc-rua-chen-izi-home-tra-xanh-muoi-bien-tui-750g-202105271150021269_300x300.jpg",
		price: "15000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it53",
		title: "Nước giặt bền đẹp OMO Matic 3 lít",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2464/222102/bhx/nuoc-giat-omo-matic-ben-dep-cua-tren-tui-3-lit-202104141628032903_300x300.jpg",
		price: "145000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it54",
		title: "Nước rửa chén Sunlight túi 2.1kg",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2387/222099/bhx/nuoc-rua-chen-sunlight-matcha-tra-nhat-tui-21kg-202105271130240589_300x300.jpg",
		price: "52000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it55",
		title: "Nước rửa chén Sunlight 3.67 lít",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2387/76485/bhx/nuoc-rua-chen-sunlight-chanh-100-chiet-xuat-chanh-tuoi-can-367-lit-202103030903102510_300x300.jpg",
		price: "88000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it56",
		title: "Nước rửa chén IZI HOME túi 1.5kg",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/2387/230726/bhx/nuoc-rua-chen-izi-home-huong-sa-chanh-tui-15kg-202105271111246219_300x300.jpg",
		price: "31000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it57",
		title: "Bộ 3 hộp chữ nhật Inochi Hokkaido",
		description: "",
		image: "https://cdn.tgdd.vn/bachhoaxanh/themes-combo/7.Mobile.jpg",
		price: "98000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it58",
		title: "Găng tay có móc treo 3M size L",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3730/177696/bhx/gang-tay-cao-su-co-moc-treo-3m-size-l-202008031529235040_300x300.jpg",
		price: "44000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it59",
		title: "Bông tắm 1 lớp nhựa PE Unibee 65g",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/3727/217303/bhx/bong-tam-1-lop-unibee-65g-giao-mau-ngau-nhien-202105041000318198_300x300.jpg",
		price: "30000",
		salePrice: null,
		cateId: null,
	},
	{
		id: "it60",
		title: "3 cuộn 35 túi rác tự huỷ 44x56cm",
		description: "",
		image: "https://cdn.tgdd.vn/Products/Images/6553/226079/bhx/loc-3-cuon-tui-rac-den-tu-huy-sinh-hoc-bach-hoa-xanh-44x56cm-1kg-202104281053589333_300x300.jpg",
		price: "45000",
		salePrice: null,
		cateId: null,
	},
];
const SearchPage = (props) => {
	const { t } = useTranslation();
	const classes = useStyles();
	const location = useLocation();
	const query = location.search.slice(3) || "";
	const dispatch = useDispatch();
	const [optionPrice, setOptionPrice] = useState("Price");
	const [optionType, setOptionType] = useState("Ascending");

	const itemAddToCartHandler = (item) => {
		dispatch(cartActions.addItem({ ...item, amount: 1 }));
	};
	const priceChangeHandler = (event) => {
		setOptionPrice(event.target.value);
	};
	const typeChangeHandler = (event) => {
		setOptionType(event.target.value);
	};

	useEffect(() => {
		dispatch(uiActions.hideModal());
	}, [dispatch, query]);
	useEffect(() => {
		document.title = t("searchpage.title");
	}, [t]);

	return (
		<>
			<div className={classes.root}>
				<Header showMenu showCart />
				<SideBar />
				<div className={classes.main}>
					<div className={classes.mainContent}>
						<div
							className={`${classes.topContent} ${classes.shadow}`}
						>
							<Typography variant="h5">
								{t("searchpage.topContent")} "{query}"
							</Typography>
							<div className={classes.filter}>
								<div className={classes.filterItem}>
									<Typography
										variant="subtitle2"
										className={classes.label}
									>
										{t("searchpage.sortBy")}
									</Typography>
									<NativeSelect
										className={classes.select}
										value={optionPrice}
										onChange={priceChangeHandler}
										name="price"
										input={<BootstrapInput />}
									>
										<option
											style={{ color: "#F39148" }}
											value=""
										>
											{t("searchpage.optionPrice")}
										</option>
										<option
											style={{ color: "#F39148" }}
											value={10}
										>
											{t("searchpage.optionHigher")}
										</option>
										<option
											style={{ color: "#F39148" }}
											value={20}
										>
											{t("searchpage.optionLower")}
										</option>
									</NativeSelect>
								</div>
								<div className={classes.filterItem}>
									<Typography
										vvariant="subtitle2"
										className={classes.label}
									>
										{t("searchpage.sortType")}
									</Typography>
									<NativeSelect
										className={classes.select}
										name="type"
										value={optionType}
										onChange={typeChangeHandler}
										input={<BootstrapInput />}
									>
										<option
											style={{ color: "#F39148" }}
											value=""
										>
											{t("searchpage.optionAscending")}
										</option>
										<option
											style={{ color: "#F39148" }}
											value={10}
										>
											{t("searchpage.optionHigher")}
										</option>
										<option
											style={{ color: "#F39148" }}
											value={20}
										>
											{t("searchpage.optionLower")}
										</option>
									</NativeSelect>
								</div>
							</div>
						</div>

						<Grid
							container
							spacing={2}
							className={`${classes.listItem} ${classes.shadow}`}
						>
							{itemsSearch?.length > 0 &&
								itemsSearch.map((item, index) => (
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
						<div
							className={`${classes.pagination} ${classes.shadow}`}
						>
							<Pagination
								count={itemsSearch.length}
								color="primary"
								variant="outlined"
								shape="rounded"
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer hasSideBar />
		</>
	);
};
export default SearchPage;
