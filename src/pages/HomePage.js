import { useEffect } from "react";
import Header from "./../components/Layout/Header";
import classes from "./HomePage.module.scss";
const HomePage = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
    return (
        <div className={classes.home}>
            <Header />
            <div className={`container ${classes.home__text}`}>
                this is home page
            </div>
        </div>
    );
};
export default HomePage;
