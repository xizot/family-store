import {
    makeStyles,
    Button,
    Typography
} from '@material-ui/core';
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    header: {
        color:'#F39148',
        textAlign:"center",
        marginBottom:"8px"
    },
    button: {
        marginTop:"8px",
        display: 'flex',
        flexWrap: 'wrap',
    },
    cancel: {
        marginLeft:"20%",
        color:"green"
    }
}));
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const DeleteModal = ({ parentHandleConfirm, parentHandleClose }) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const confirm = () => {
        parentHandleConfirm();
    }
    const close = () => {
        parentHandleClose();
    }

    return (
        <div style={modalStyle} className={classes.paper}>
            <Typography variant="h4"className={classes.header}>Confirm Delete</Typography>
            <Typography>Are you sure to delete this Item?</Typography>
            <div className={classes.button}>
                <Button style={{color:'red'}}variant="contained" startIcon={<DeleteIcon />} component="label" onClick={confirm}>
                    Confirm
                </Button>
                <Button className={classes.cancel}variant="contained" startIcon={<CancelIcon />} component="label" onClick={close}>
                    Cancel
                </Button>
            </div>
        </div>

    )
}
export default DeleteModal;