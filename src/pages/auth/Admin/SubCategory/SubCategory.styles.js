import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  content: {
    position: 'relative',
    width: '30rem',
    maxWidth: '90%',
    margin: '20vh auto 0',
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4),
    outline: 'none',
  },
  section: {
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    textTransform: 'uppercase',
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.primary.main,
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

    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
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
  select: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F39148',
    marginLeft: theme.spacing(1),
    '& svg': {
      color: theme.palette.common.white,
    },
  },
  addButton: {
    marginBottom: '12px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  search: {
    marginBottom: '12px',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #ddd',
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
