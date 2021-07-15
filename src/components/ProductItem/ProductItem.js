import {
    CardContent, IconButton, makeStyles, Typography, Card
    , CardMedia, CardActions, Box
} from "@material-ui/core";
import React from "react";
import ButtonNumeric from "../UI/NumericUpDown";
import MoreVertIcon from '@material-ui/icons/Info';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 220,
        height: 250,
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
        padding:'0 8px 4px 8px'
    }
}));

const ProductItem = ({ title, price, description, quantity, url, onAdd, onRemove, onDetail }) => {
    const classes = useStyles();

    return (
        <Box>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image="https://cdn.tgdd.vn/2020/07/content/bo-anh-yasuo-lol-dep-va-chat-de-lam-hinh-nen-dien-thoai-may1-800x450.jpg"
                    title="Paella dish"
                />
                <CardContent>
                    <Typography>$0.45</Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                        Cần sa 10 tấn
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className={classes.action}>
                    <ButtonNumeric
                        quantity={10}
                    />
                    <IconButton
                        className={classes.expand}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </CardActions >
            </Card>
        </Box>

    )
}
export default ProductItem;