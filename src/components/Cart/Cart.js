import { Button, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { moneyFormat } from "../../helpers";
import { cartActions } from "../../reducers/cart";
import { uiActions } from "../../reducers/ui";
import CartModal from "../UI/CartModal/CartModal";
import CartItem from "./CartItem";
const useStyles = makeStyles((theme) => ({
	title: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title2: {
		marginTop: 25,
		borderBottom: "1px solid #ddd",
		[theme.breakpoints.down("xs")]: {
			marginTop: 15,
		},
	},
	content: {
		height: "100%",
		padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		overflow: "auto",
		[theme.breakpoints.down("xs")]: {
			padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
		},
	},
	iconClose: {
		marginRight: -12,
	},
	listItem: {
		listStyle: "none",
		flex: 1,
		overflow: "auto",
	},
	buttonCheckout: {
		marginTop: 12,
	},
}));

const Cart = (props) => {
	const { t } = useTranslation();
	const classes = useStyles();
	const dispatch = useDispatch();

	const cartItems = useSelector((state) => state.cart.data);
	const totalAmount = useSelector((state) => state.cart.totalAmount);

	const toggleCartModalHandler = () => {
		dispatch(uiActions.toggleCartModal());
	};

	const cartItemAddHandler = (item) => {
		dispatch(cartActions.addItem({ ...item, quantity: 1 }));
	};
	const cartItemRemoveHandler = (id) => {
		dispatch(cartActions.removeItem(id));
	};
	const cartItemClearHandler = (id) => {
		dispatch(cartActions.clearItem(id));
	};
	return (
		<CartModal onClose={toggleCartModalHandler}>
			<div className={classes.content}>
				<div>
					<div className={classes.title}>
						<Typography variant="h4" component="p">
							{t("cartModal.cart")}
						</Typography>
						<IconButton
							onClick={toggleCartModalHandler}
							className={classes.iconClose}
						>
							<Close fontSize="large" />
						</IconButton>
					</div>
					<div className={`${classes.title} ${classes.title2} `}>
						<Typography variant="body1" component="p">
							{t("cartModal.total")}
						</Typography>
						<Typography
							variant="h6"
							component="p"
							style={{ fontWeight: "bold" }}
						>
							{totalAmount && moneyFormat(totalAmount)} VND
						</Typography>
					</div>
				</div>
				<ul className={classes.listItem}>
					{cartItems.length > 0 &&
						cartItems.map((item, index) => (
							<CartItem
								key={index}
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								salePrice={item.salePrice}
								totalPrice={item.totalPrice}
								quantity={item.quantity}
								description={item.description}
								onAdd={cartItemAddHandler.bind(null, item)}
								onRemove={cartItemRemoveHandler.bind(
									null,
									item.id
								)}
								onClear={cartItemClearHandler.bind(
									null,
									item.id
								)}
							/>
						))}
				</ul>
				<Button
					variant="contained"
					color="primary"
					className={classes.buttonCheckout}
					disabled={cartItems.length <= 0}
				>
					{t("cartModal.checkout")}
				</Button>
			</div>
		</CartModal>
	);
};

export default Cart;
