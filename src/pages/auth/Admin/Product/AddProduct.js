import { makeStyles, withStyles, TextField, Typography, Button, NativeSelect, InputBase, FormControl, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import NumberUp from "../../../../components/UI/NumericUpDown";
const useStyles = makeStyles((theme) => ({
    paper: {
        minWidth: '60vh',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        marginTop: '9px',
        minWidth: '60vh',
    },
    native: {
        marginTop: '9px',
        minWidth: '60vh',
    },
    select: {
        position: "absolute",
        right: "0px",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#F39148",
        marginLeft: theme.spacing(1),
        "& svg": {
            color: theme.palette.common.white,
        },
    },
    label: {
        marginTop: theme.spacing(1),
    },
    price: {
        marginTop: theme.spacing(1),
    },
    importImg: {
        color: "#fff",
        position: "absolute",
        right: "0px",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#F39148",
        width: "113px",
        height: "27px",
        "& svg": {
            color: theme.palette.common.white,
        },
    },
    save: {
        color: "#fff",
        marginTop: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#F39148",
    }
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
const AddProduct = (props) => {
    const classes = useStyles();
    const [optionFatherCate, setOptionFatherCate] = useState("Milk");
    const [optionSubCate, setOptionSubCate] = useState("Beef");
    const fatherCateChangeHandler = (event) => {
        setOptionFatherCate(event.target.value);
    };
    const subCateChangeHandler = (event) => {
        setOptionSubCate(event.target.value);
    };
    useEffect(() => {
        document.title = "All Order";
    }, []);

    return (
        <>
            <div className={classes.paper}>
                <Typography variant="h5" style={{ textAlign: "center", color: "#F39148" }}>ADD PRODUCT</Typography>
                <FormControl className={classes.form}>
                    <TextField
                        placeholder="Name"
                        fullWidth
                        variant="outlined"
                    />
                    <Grid container spacing={2} className={classes.native}>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                variant="subtitle2"
                                className={classes.label}
                            />
                            Father Category Name
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <NativeSelect
                                className={classes.select}
                                value={optionFatherCate}
                                onChange={fatherCateChangeHandler}
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
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className={classes.native}>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                variant="subtitle2"
                                className={classes.label}
                            />
                            Sub Category Name
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <NativeSelect
                                className={classes.select}
                                value={optionSubCate}
                                onChange={subCateChangeHandler}
                                name="Beff"
                                input={<BootstrapInput />}
                            >
                                <option
                                    style={{ color: "#F39148" }}
                                    value=""
                                >
                                    Beef
                                </option>
                                <option
                                    style={{ color: "#F39148" }}
                                    value={10}
                                >
                                    Milk
                                </option>
                                <option
                                    style={{ color: "#F39148" }}
                                    value={20}
                                >
                                    Bread
                                </option>
                            </NativeSelect>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className={classes.native}>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                variant="subtitle2"
                                className={classes.label}
                            />
                            Quantity
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <div className={classes.select}>
                                <NumberUp />
                            </div>
                        </Grid>
                    </Grid>
                    <TextField
                        className={classes.price}
                        placeholder="Price"
                        fullWidth
                        variant="outlined"
                    />
                    <Grid container spacing={2} className={classes.native}>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                variant="subtitle2"
                                className={classes.label}
                            />
                            Add picture
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <input
                                className={classes.select}
                                type="file"
                                id="avatar"
                                style={{ display: "none" }}
                            />
                            <Button
                                className={classes.importImg}
                                variant="contained"
                                fullWidth
                                component="label"
                                htmlFor="image"
                            >BROWSER</Button>
                        </Grid>
                    </Grid>
                    <Button
                        className={classes.save}
                        variant="contained"
                        fullWidth
                        component="label"
                    >
                    Save</Button>
                </FormControl>
            </div>
        </>
    );
};
export default AddProduct;