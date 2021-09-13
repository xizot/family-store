import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  main: {
    marginLeft: 'auto',
    width: 'calc(100% - 260px)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  shadow: {
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
  },

  mainContent: {
    padding: `80px ${theme.spacing(2)}px 65px`,
    [theme.breakpoints.down('xs')]: {
      padding: `68px ${theme.spacing(2)}px 85px`,
      width: '100%',
    },
  },
  topContent: {
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,

    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  select: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F39148',
    marginLeft: theme.spacing(1),
    '& svg': {
      color: theme.palette.common.white,
    },
  },
  pagination: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#FFF',
    '& > *': {
      padding: '20px',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      justifyContent: 'center',
      display: 'flex',
    },
  },
  section: {
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));
