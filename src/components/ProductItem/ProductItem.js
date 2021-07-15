import {
    CardContent, IconButton, makeStyles, Typography, Card,
    CardHeader, CardMedia, Box
} from "@material-ui/core";
import React from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ButtonNumeric from "../UI/NumericUpDown";
import { Link } from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/Info';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 220,
        height: 240,
        position:"relative"
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    description: {
        fontSize: 14
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
    },
    action: {
        position:"absolute",
        zIndex:1,
        padding: '0 8px 0 0',
        right:0
    }
}));

const ProductItem = (props) => {
    const classes = useStyles();

    return (
        <Box>
            <Card className={classes.root}>
                <CardHeader
                    className={classes.action}
                    action={
                        <IconButton aria-label="settings">
                            <ShoppingCartIcon />
                        </IconButton>
                    }
                />
                <Link to="/details/id" >
                    <CardMedia
                        className={classes.media}
                        image="https://cdn.tgdd.vn/2020/07/content/bo-anh-yasuo-lol-dep-va-chat-de-lam-hinh-nen-dien-thoai-may1-800x450.jpg"
                        title="Paella dish"
                    />
                     </Link>
                    <CardContent>
                        <Typography>$0.45</Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                            Cần sa 10 tấn
                        </Typography>
                    </CardContent>         
            </Card>

        </Box>

    )
}
export default ProductItem;