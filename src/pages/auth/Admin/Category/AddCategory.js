import { makeStyles, TextField, Typography, Button, FormControl, Grid } from "@material-ui/core";
import { useEffect } from "react";
import SearchInput from "../../../../components/UI/SearchInput";
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
    search: {
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

const AddSubCate = (props) => {
    const classes = useStyles();


    useEffect(() => {

    }, []);

    return (
        <>
            <div className={classes.paper}>
                <Typography variant="h5" style={{ textAlign: "center", color: "#F39148" }}>SUB CATEGORY</Typography>
                <FormControl className={classes.form}>
                    <TextField
                        placeholder="Name"
                        fullWidth
                        variant="outlined"
                    />
                    <div className={classes.search}>
                        <SearchInput />
                    </div>
                    <Grid container spacing={2} className={classes.native}>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                variant="subtitle2"
                                className={classes.label}
                            />
                            Add sub category
                        </Grid>
                        <Grid item xs={12} sm={6}>

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
export default AddSubCate;
