import { makeStyles, TextField, Typography, Button, FormControl, Grid } from '@material-ui/core';
import { useEffect, useState, useRef } from 'react';
import SearchInput from '../../../../components/UI/SearchInput';
import { useInput } from '../../../../hooks/use-input'
import * as Validate from '../../../../helpers/validate';
import { FormHelperText } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../../reducers/admin-category';
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
        position: 'absolute',
        right: '0px',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#F39148',
        marginLeft: theme.spacing(1),
        '& svg': {
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
        color: '#fff',
        position: 'absolute',
        right: '0px',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#F39148',
        width: '113px',
        height: '27px',
        '& svg': {
            color: theme.palette.common.white,
        },
    },
    save: {
        color: '#fff',
        marginTop: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#F39148',
    },
}));

const AddSubCate = (props) => {
    const inputRef = useRef();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [error, setError] = useState('');

    const {
        enteredInput: cateName,
        hasError: cateNameHasError,
        inputBlurHandler: cateNameBlurHandler,
        inputChangeHandler: cateNameChangeHandler,
        inputIsValid: cateNameIsValid,
        inputReset: cateNameReset,
    } = useInput(Validate.isNotEmpty);

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        if (!cateNameIsValid) return;
        setError('');
        cateNameReset();
    }

    const addCategoryHandler = async () => {
        try {
            await dispatch(
                addCategory({
                    cateId: cateName,
                    cateName: cateName,
                })
            ).unwrap();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => { }, []);

    return (
        <>
            <div className={classes.paper}>
                <Typography variant="h5" style={{ textAlign: 'center', color: '#F39148' }}>
                    CATEGORY
                </Typography>
                <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
                    <FormControl className={classes.form}>
                        <TextField placeholder="Name"
                            fullWidth
                            variant="outlined"
                            value={cateName}
                            helperText={cateNameHasError && 'Name invalid'}
                            onBlur={cateNameBlurHandler}
                            onChange={cateNameChangeHandler} />
                        <div className={classes.search}>
                            <SearchInput />
                        </div>
                        <Grid container spacing={2} className={classes.native}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" className={classes.label} />
                                Add sub category
                            </Grid>
                            <Grid item xs={12} sm={6}></Grid>
                        </Grid>
                        <Button className={classes.save} variant="contained" fullWidth component="label"  onClick={addCategoryHandler}>
                            Save
                        </Button>
                    </FormControl>
                    {error?.length > 0 && (
                        <FormHelperText error style={{ marginBottom: 10 }}>
                            {error}
                        </FormHelperText>
                    )}
                </form>
            </div>
        </>
    );
};
export default AddSubCate;
