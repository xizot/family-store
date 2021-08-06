import { makeStyles, Tab } from "@material-ui/core";
import { useEffect, useState } from "react";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import Footer from "../../components/Layout/Footer";
import SideBar from "../../components/SideBar/SideBar";
import Header from "./../../components/Layout/Header";
import OrderItem from "./../../components/Order/OrderItem";

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
		textAlign: "center",
		marginBottom: theme.spacing(1),
	},

	listItem: {
		background: "#fff",
		borderRadius: theme.shape.borderRadius,
		width: "100%",
	},
}));
const itemsOrderDelivering = [
	{
		id: "000144004",
		img: "https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date: "22/02/2021",
		expected: "23/02/2021",
		total: 700000,
		status: "Delivering",
	},
	{
		id: "000144007",
		img: "https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date: "15/12/2021",
		expected: "23/12/2021",
		total: 1100000,
		status: "Delivering",
	},
];
const itemsOrderCancel = [
	{
		id: "000144006",
		img: "https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date: "05/02/2021",
		expected: "23/02/2021",
		total: 100000,
		status: "Cancel",
	},
];
const itemsOrderConfirm = [
	{
		id: "000144008",
		img: "https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date: "01/02/2022",
		expected: "25/02/2022",
		total: 500000,
		status: "Await confirm",
	},
];
const itemsOrderDelivered = [
	{
		id: "000144005",
		img: "https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date: "22/12/2011",
		expected: "13/02/2021",
		total: 500000,
		status: "Delivered",
	},
];
const itemsOrder = [
	{
		id: "000144008",
		img: "https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date: "01/02/2022",
		expected: "25/02/2022",
		total: 500000,
		status: "Await confirm",
	},
	{
		id: "000144004",
		img: "https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date: "22/02/2021",
		expected: "23/02/2021",
		total: 700000,
		status: "Delivering",
	},
	{
		id: "000144007",
		img: "https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date: "15/12/2021",
		expected: "23/12/2021",
		total: 1100000,
		status: "Delivering",
	},
	{
		id: "000144005",
		img: "https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date: "22/12/2011",
		expected: "13/02/2021",
		total: 500000,
		status: "Delivered",
	},
	{
		id: "000144006",
		img: "https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date: "05/02/2021",
		expected: "23/02/2021",
		total: 100000,
		status: "Cancel",
	},
];

const OrderPage = (props) => {
	const classes = useStyles();
	const [value, setValue] = useState("0");
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	useEffect(() => {
		document.title = "All Order";
	}, []);

	return (
		<>
			<div className={classes.root}>
				<Header showMenu showCart />
				<SideBar />
				<div className={classes.main}>
					<div className={classes.mainContent}>
						<TabContext value={value}>
							<div
								className={`${classes.topContent} ${classes.shadow}`}
							>
								<TabList
									value={value}
									onChange={handleChange}
									indicatorColor="primary"
									variant="fullWidth"
									aria-label="full width tabs example"
								>
									<Tab label="All Order" value="0" />
									<Tab label="Awaiting confirm" value="1" />
									<Tab label="Delivering" value="2" />
									<Tab label="Delivered" value="3" />
									<Tab label="Cancel" value="4" />
								</TabList>
							</div>
							<div className={classes.listItem}>
								<TabPanel value="0">
									{itemsOrder?.length > 0 &&
										itemsOrder.map((item, index) => (
											<OrderItem
												key={index}
												id={item.id}
												img={item.img}
												status={item.status}
												date={item.date}
												expected={item.expected}
												total={item.total}
											/>
										))}
								</TabPanel>
								<TabPanel value="1">
									{itemsOrderConfirm?.length > 0 &&
										itemsOrderConfirm.map((item, index) => (
											<OrderItem
												key={index}
												id={item.id}
												img={item.img}
												status={item.status}
												date={item.date}
												expected={item.expected}
												total={item.total}
											/>
										))}
								</TabPanel>
								<TabPanel value="2">
									{itemsOrderDelivering?.length > 0 &&
										itemsOrderDelivering.map(
											(item, index) => (
												<OrderItem
													key={index}
													id={item.id}
													img={item.img}
													status={item.status}
													date={item.date}
													expected={item.expected}
													total={item.total}
												/>
											)
										)}
								</TabPanel>
								<TabPanel value="3">
									{itemsOrderDelivered?.length > 0 &&
										itemsOrderDelivered.map(
											(item, index) => (
												<OrderItem
													key={index}
													id={item.id}
													img={item.img}
													status={item.status}
													date={item.date}
													expected={item.expected}
													total={item.total}
												/>
											)
										)}
								</TabPanel>
								<TabPanel value="4">
									{itemsOrderCancel?.length > 0 &&
										itemsOrderCancel.map((item, index) => (
											<OrderItem
												key={index}
												id={item.id}
												img={item.img}
												status={item.status}
												date={item.date}
												expected={item.expected}
												total={item.total}
											/>
										))}
								</TabPanel>
							</div>
						</TabContext>
					</div>
				</div>
			</div>
			<Footer hasSideBar />
		</>
	);
};
export default OrderPage;
