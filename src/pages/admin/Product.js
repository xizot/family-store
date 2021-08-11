import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    NativeSelect,
    InputBase,
    withStyles,
    Button
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../components/Layout/Footer";
import SideBar from "./Sidebar/index";
import Header from "../../components/Layout/Header";
import { uiActions } from "../../reducers/ui";
import SearchInput from "../../components/UI/SearchInput";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
        marginBottom:"12px",
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
    addButton: {
        paddingLeft: "15px",
        position: "absolute",
        right: "30px"
    },
    search: {
        paddingRight: "42%"
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
const rows = [
    {
        id: 1,
        name: "Mì trứng cao cấp Meizan gói 500g",
        subCate: "Thực phẩm",
        quantity: "200",
        price: "31800",
        lastModi: "01-02-2010",
    },
    {
        id: 2,
        name: "Bột giặt 500g",
        subCate: "Đồ tiện dụng",
        quantity: "2002",
        price: "318000 ",
        lastModi: "01-01-2021",
    },
    {
        id: 3,
        name: "Hành lá 1kg",
        subCate: "Rau củ",
        quantity: "400",
        price: "10000",
        lastModi: "01-01-2021",
    },
    {
        id: 4,
        name: "Hành Tây 500g",
        subCate: "Rau củ",
        quantity: "1000",
        price: "21000",
        lastModi: "01-01-2021",
    },
    {
        id: 5,
        name: "Bột xã Omo 500g",
        subCate: "Đồ tiện dụng",
        quantity: "2000",
        price: "3180000",
        lastModi: "22-01-2021",
    },
    {
        id: 6,
        name: "Bánh mì Bơ Tewan",
        subCate: "Lương thực",
        quantity: "400",
        price: "28000",
        lastModi: "11-12-2021",
    },
    {
        id: 7,
        name: "Rau cần tây",
        subCate: "Rau củ",
        quantity: "4000",
        price: "48000",
        lastModi: "25-08-2021",
    },
    {
        id: 8,
        name: "Sữa tươi Vina milk",
        subCate: "Sữa, nước ngọt",
        quantity: "1000",
        price: "58000",
        lastModi: "12-01-2021",
    },
    {
        id: 9,
        name: "Bánh tầm 500g",
        subCate: "Lương thực",
        quantity: "2000",
        price: "8000",
        lastModi: "22-02-2021",
    },
];
const SearchPage = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const dispatch = useDispatch();
    const [optionPrice, setOptionPrice] = useState("Price");
    const [optionType, setOptionType] = useState("Ascending");
    const priceChangeHandler = (event) => {
        setOptionPrice(event.target.value);
    };
    const typeChangeHandler = (event) => {
        setOptionType(event.target.value);
    };


    useEffect(() => {
        dispatch(uiActions.hideModal());
    }, [dispatch]);

    useEffect(() => {
        document.title = "Product Admin";
    }, [t]);

    return (
        <>
            <div className={classes.root}>
                <Header showMenu showCart />
                <SideBar />
                <div className={classes.main}>
                    <div className={classes.mainContent}>
                        <div
                            className={`${classes.topContent} `}
                        >
                            <Typography variant="h5" style={{ color: "#F39148", textAlign: "center" }}>PRODUCT MANAGER</Typography>
                            <div className={classes.filter}>
                                <div className={classes.search}>
                                    <SearchInput />
                                </div>
                                <div className={classes.filterItem}>
                                    <Typography
                                        variant="subtitle2"
                                        className={classes.label}
                                    >
                                        CATEGORY
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
                                            Vegetables
                                        </option>
                                        <option
                                            style={{ color: "#F39148" }}
                                            value={10}
                                        >
                                            Milk, Drink
                                        </option>
                                        <option
                                            style={{ color: "#F39148" }}
                                            value={20}
                                        >
                                            Rice, Bread
                                        </option>
                                    </NativeSelect>
                                </div>
                                <div className={classes.filterItem}>
                                    <Typography
                                        variant="subtitle2"
                                        className={classes.label}
                                    >
                                        SUB CATEGORY
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
                                            Milk
                                        </option>
                                        <option
                                            style={{ color: "#F39148" }}
                                            value={10}
                                        >
                                            Borecole
                                        </option>
                                        <option
                                            style={{ color: "#F39148" }}
                                            value={20}
                                        >
                                            Fish
                                        </option>
                                    </NativeSelect>
                                </div>
                                <div className={classes.addButton}>
                                    <Button variant="contained" color="primary">Add</Button>
                                </div>
                            </div>
                            <TableContainer component={Paper}>
                                <Table aria-label="a dense table">
                                    <TableHead  className={classes.table} >
                                        <TableRow >
                                            <TableCell>Index</TableCell>
                                            <TableCell >Product Name</TableCell>
                                            <TableCell >Sub Category</TableCell>
                                            <TableCell >Quantity</TableCell>
                                            <TableCell >Price</TableCell>
                                            <TableCell >Last Modified</TableCell>
                                            <TableCell align="center">Options</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell >{row.name}</TableCell>
                                                <TableCell >{row.subCate}</TableCell>
                                                <TableCell >{row.quantity}</TableCell>
                                                <TableCell >{row.price}</TableCell>
                                                <TableCell >{row.lastModi}</TableCell>
                                                <TableCell align="center">
                                                    <Button size="small" startIcon={<EditIcon />} style={{padding:'0'}}>
                                                    </Button>
                                                    <Button size="small" startIcon={<DeleteIcon />} style={{padding:'0'}}>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div
                                className={`${classes.pagination} ${classes.shadow}`}
                            >
                                <Pagination
                                    count={rows.length}
                                    color="primary"
                                    variant="outlined"
                                    shape="rounded"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer hasSideBar />
        </>
    );
};
export default SearchPage;
