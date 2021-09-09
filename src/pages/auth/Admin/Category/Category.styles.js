import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  section: {
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    margin: 0,
    padding: theme.spacing(1),
  },
  filter: {
    marginTop: theme.spacing(2),
    marginBottom: '12px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-child)': {
      marginRight: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      '&:not(:last-child)': {
        marginBottom: theme.spacing(1),
      },
    },
  },
  label: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 70,
    },
  },

  addButton: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  search: {
    marginRight: theme.spacing(2),
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,

    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: theme.spacing(1),
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  pagination: {
    '& > *': {
      justifyContent: 'center',
      display: 'flex',
    },
  },
  tableHead: {
    fontWeight: 'bold',
    color: 'red',
  },
  actionIcon: {
    cursor: 'pointer',
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
  tableRow: {
    transition: 'all .5s',
    '&:hover': {
      background: '#dedede !important ',
      cursor: 'pointer',
    },
  },
}));
