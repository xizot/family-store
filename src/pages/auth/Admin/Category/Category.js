import { AdminTemplate } from '../../../../components/Templates/Admin/AdminTemplate';
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
    Button,
    Fade,
    Modal,Backdrop
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../../reducers/ui";
import SearchInput from "../../../../components/UI/SearchInput";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddComponent from './AddCategory';

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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: "12px",
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

    addButton: {
        paddingLeft: "0px",
        position: "absolute",
        right: "40px"
    },
    search: {
        paddingRight: "5%"
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
    tableHead: {
        fontWeight: "bold",
        color: "red"
    }
}));

const rows = [
    {
        id: 1,
        name: "Mì",
        subCate:5,
        quantity: "200",
        lastModi: "01-02-2010",
    },
    {
        id: 2,
        name: "Bia & Rượu",
        subCate: 6,
        quantity: "202",
        lastModi: "01-01-2021",
    },
    {
        id: 3,
        name: "Nguyên liệu",
        subCate: 4,
        quantity: "400",
        lastModi: "01-01-2021",
    },
    {
        id: 4,
        name: "Mỹ phẩm & làm đẹp",
        subCate: 3,
        quantity: "1000",
    
        lastModi: "01-01-2021",
    },
    {
        id: 5,
        name: "Đồ gia dụng",
        subCate: 10,
        quantity: "2000",
        lastModi: "22-01-2021",
    },
    {
        id: 6,
        name: "Bánh snack",
        subCate: 5,
        quantity: "400",
        lastModi: "11-12-2021",
    },
    {
        id: 7,
        name: "Rau củ",
        subCate: 1,
        quantity: "4000",
        lastModi: "25-08-2021",
    },
    {
        id: 8,
        name: "Gạo & Bánh mì",
        subCate: 2,
        quantity: "1000",
        lastModi: "12-01-2021",
    },
    {
        id: 9,
        name: "Sữa & Cá",
        subCate: 4,
        quantity: "500",
        lastModi: "22-02-2021",
    },
];

const SubCateManager = (props) => {

    const { t } = useTranslation();
    const classes = useStyles();
    const [open, setOpen] = useState(false);


    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
 
    useEffect(() => {
        dispatch(uiActions.hideModal());
    }, [dispatch]);

    useEffect(() => {
        document.title = "Category Admin";
    }, [t]);

    return (<AdminTemplate>
        <div className={classes.main}>
            <div className={classes.mainContent}>
                <div
                    className={`${classes.topContent} `}
                >
                    <Typography variant="h5" style={{ color: "#F39148", textAlign: "center" }}>CATEGORY MANAGER</Typography>
                    <div className={classes.filter}>
                        <div className={classes.search}>
                            <SearchInput />
                        </div>
                        <div className={classes.addButton}>
                            <Button variant="contained" color="primary" onClick={handleOpen}>Add</Button>
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="a dense table">
                            <TableHead >
                                <TableRow className={classes.tableHead} >
                                    <TableCell>Index</TableCell>
                                    <TableCell >Category Name</TableCell>
                                    <TableCell >Sub Category Inside</TableCell>
                                    <TableCell >Total Product</TableCell>
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
                                        <TableCell >{row.lastModi}</TableCell>
                                        <TableCell align="center">
                                            <Button size="small" startIcon={<EditIcon />} style={{ padding: '0' }} onClick={handleOpen}>
                                            </Button>
                                            <Button size="small" startIcon={<DeleteIcon />} style={{ padding: '0' }}>
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
                <Modal
                    open={open}
                    onClose={handleClose}
                    className={classes.modal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                >
                     <Fade in={open}>
                        <AddComponent />
                    </Fade>
                </Modal>
            </div>
        </div>
    </AdminTemplate >);
};
export default SubCateManager;
