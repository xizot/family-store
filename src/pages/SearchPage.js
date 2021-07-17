import { Container, Grid, makeStyles, NativeSelect, withStyles, InputBase } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../reducers/cart";
import Footer from "../components/Layout/Footer";
import SideBar from "../components/SideBar/SideBar";
import Header from "./../components/Layout/Header";
import ProductItem from "./../components/ProductItem/ProductItem";

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
        backgroundColor: "white",
        width: "92wh",
        height: "15vh",
        padding: "10px 15px 0 20px",
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            backgroundPosition: "60% 100%",
        },
    },
    item: {
        width: "92wh",
        height: "auto",
        margin: "15px 0px",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#FFF",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "auto",
        },
    },
    filter: {
        backgroundColor: "inherit",
        margin: "0 0 15px 0",
        display: 'flex'
    },
    label: {
        margin:"15px 5px 0 0"
    },
    labelType: {
        margin:"15px 5px 0 100px"
    },
    select: {
        marginTop: "10px",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#F39148"
    },
    pagination: {
        backgroundColor: "#FFF",
        '& > *': {
            padding: "20px",
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
            justifyContent: "center",
            display: 'flex'
        },
    }
}));
const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(2),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        border: '1px solid #ced4da',
        fontSize: 14,
        height:17,
        width:75,
        padding: '10px 26px 7px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            'Arial',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);
const itemsSearch = [
    {
        id: 1,
        title: "Sữa đột biến Yasou",
        description: "Sữa chống toxic cùng Yasou",
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
        title: "Cần sa pha cá trê",
        description: "Cần sa dùng phê pha cùng đuôi cá",
        image: "https://c.pxhere.com/photos/fe/57/foliage_cannabis_marijuana_lush_plants_nature_medicine_color-659402.jpg!s",
        price: "5.99",
        salePrice: "9.99",
    },
    {
        id: 5,
        title: "Cá gà",
        description: "Cá có hình dạng đầu gà",
        image: "https://topchiase24h.com/wp-content/uploads/2019/06/hinh-nen-tuong-Zed-trong-lien-minh-huyen-thoai-49.jpg",
        price: "1.99",
        salePrice: "1.99",
    },
    {
        id: 6,
        title: "Cá hồi trắng xanh",
        description: "Cá có hình dạng đầu heo màu trắng",
        image: "https://cdnmedia.webthethao.vn/uploads/img/files/images/fullsize/yone-lol.jpg",
        price: "1.99",
        salePrice: "1.99",
    },
];
const SearchPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const itemAddToCartHandler = (item) => {
        dispatch(cartActions.addItem({ ...item, quantity: 1 }));
    };
    const [optionPrice, setOptionPrice] = useState('Price');
    const [optionType, setOptionType] = useState('Ascending');
    const handleChange = (event) => {
        setOptionPrice(event.target.value);
    };
    const handleChangeType = (event) => {
        setOptionType(event.target.value);
    };
    useEffect(() => {
        document.title = "Search page";
    }, []);
    return (
        <>
            <div className={classes.root}>
                <Header showMenu showCart />
                <SideBar />
                <div className={classes.main}>
                    <div className={classes.mainContent}>
                        <div className={classes.topContent}>
                            <h1>Search result Cần sa 200g</h1>
                            <div className={classes.filter}>
                                <h3 className={classes.label}>Sort by</h3>
                                <NativeSelect
                                    id="demo-customized-select-native-price"
                                    className={classes.select}
                                    value={optionPrice}
                                    onChange={handleChange}
                                    name="price"
                                    inputProps={{ 'aria-label': 'age' }}
                                    input={<BootstrapInput />}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={10}>Higher</option>
                                    <option value={20}>Lower</option>
                                </NativeSelect>
                                <h3 className={classes.labelType}>Sort type</h3>
                                <NativeSelect
                                    id="customized-select-native-count"
                                    className={classes.select}
                                    name="type"
                                    value={optionType}
                                    onChange={handleChangeType}
                                    input={<BootstrapInput />}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={10}>Higher</option>
                                    <option value={20}>Lower</option>
                                </NativeSelect>
                            </div>
                        </div>
                        <Container className={classes.item}>

                            <Grid container spacing={3}	>
                                {itemsSearch?.length > 0 &&
                                    itemsSearch.map((item, index) => (
                                        <Grid item xs={12} sm={6} md={3} key={index}>
                                            <ProductItem
                                                id={item.id}
                                                title={item.title}
                                                description={item.description}
                                                image={item.image}
                                                price={item.price}
                                                salePrice={item.salePrice}
                                                onAddToCart={itemAddToCartHandler.bind(null, item)}
                                            />
                                        </Grid>
                                    ))}
                            </Grid>
                            <div className={classes.pagination}>
                                <Pagination count={itemsSearch.length} color="primary" variant="outlined" shape="rounded" />
                            </div>
                        </Container>

                    </div>
                </div>
            </div>
            <Footer hasSideBar />
        </>
    );
};
export default SearchPage;
