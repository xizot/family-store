import {
	makeStyles,
	Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import Footer from "../components/Layout/Footer";
import SideBar from "../components/SideBar/SideBar";
import Header from "./../components/Layout/Header";
import OrderItem from "./../components/Order/OrderItem";

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
        textAlign:"center",
        color:'#F39148',
		padding: theme.spacing(2),
		marginBottom: theme.spacing(1),
	},

	listItem: {
		background: "#fff",
		borderRadius: theme.shape.borderRadius,
		width: "100%",
	},
}));

const itemsOrder = [
	{
		id: "000144004",
		img:"https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date:"22/02/2021",
		expected: "23/02/2021",
		total:700000,
		status:"Delivering",
	},
    {
		id: "000144005",
		img:"https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date:"22/12/2011",
		expected: "13/02/2021",
		total:500000,
		status:"Delivered"
	},
    {
		id: "000144006",
		img:"https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date:"05/02/2021",
		expected: "23/02/2021",
		total:100000,
		status:"Cancel"
	},
    {
		id: "000144007",
		img:"https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date:"15/12/2021",
		expected: "23/12/2021",
		total:1100000,
		status:"Delivering"
	},
    {
		id: "000144008",
		img:"https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png",
		date:"01/02/2022",
		expected: "25/02/2022",
		total:500000,
		status:"Await confirm"
	},
]
const OrderPage = (props) => {
	const classes = useStyles();

	useEffect(() => {
		document.title = "All Order"
	}, []);

	return (
		<>
			<div className={classes.root}>
				<Header showMenu showCart />
				<SideBar />
				<div className={classes.main}>
					<div className={classes.mainContent}>
						<div className={`${classes.topContent} ${classes.shadow}`}>
							<Typography variant="h6">
								ALL ORDER
							</Typography>
                        </div>
                        <div className={classes.listItem}>
                        {itemsOrder?.length > 0 &&
							itemsOrder.map((item, index) => (
                                <OrderItem 
                                    id={item.id}
                                    img={item.img}
                                    status={item.status}
                                    date={item.date}
                                    expected={item.expected}
                                    total={item.total}
                                />
                        ))}
                        </div>
					</div>
				</div>
			</div>
			<Footer hasSideBar />
		</>
	);
};
export default OrderPage;
