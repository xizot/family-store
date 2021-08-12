import { useLayoutEffect } from 'react';
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
  NativeSelect,
  InputBase,
  withStyles,
  Button,
  Fade,
  Modal
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../../reducers/ui";
import SearchInput from "../../../../components/UI/SearchInput";
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
  select: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#F39148",
    marginLeft: theme.spacing(1),
    "& svg": {
      color: theme.palette.common.white,
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
const UserManager = (props) => {
  const classes = useStyles();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (<AdminTemplate>
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div
          className={`${classes.topContent} `}
        >
          <Typography variant="h5" style={{ color: "#F39148", textAlign: "center" }}>USER MANAGER</Typography>
        </div>
      </div>
    </div></AdminTemplate>)
};

export default UserManager;
