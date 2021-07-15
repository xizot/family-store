import { Container, Grid, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import Footer from "../components/Layout/Footer";
import SideBar from "../components/SideBar/SideBar";
import Header from "./../components/Layout/Header";
import Item from "./../components/ProductItem/ProductItem";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
    },
    main: {
        marginLeft: "auto",
        width: "calc(100% - 320px)",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    mainContent: {
        textAlign:"center",
        padding: "64px 0 80px",
        [theme.breakpoints.down("xs")]: {
            padding: "56px 0 85px",
        },
    },
}));
const SearchPage = () => {
    const classes = useStyles();
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
                        <Container fixed>
                            <h1>Search result Cần sa 200g</h1>
                        </Container>
                    </div>
                    <Container>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={3}>
                                <Item />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Item />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Item />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Item />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
            <Footer hasSideBar />
        </>
    );
};
export default SearchPage;
