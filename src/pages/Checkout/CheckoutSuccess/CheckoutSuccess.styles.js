import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  main: {
    padding: `80px ${theme.spacing(2)}px 80px`,

    [theme.breakpoints.down('xs')]: {
      padding: `68px ${theme.spacing(2)}px 105px`,
      width: '100%',
    },
  },
  content: {
    padding: '20vh 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    textAlign: 'center',
    flexDirection: 'column',
    '& > a': {
      color: theme.palette.primary.main,
      whiteSpace: 'nowrap',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '50px 0',
    },
  },
  thank: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
    },
  },
  icon: {
    fontWeight: 'bold',
    fontSize: 70,
    color: '#62B64D',
    border: '1px solid #62B64D',
    borderRadius: '50%',
    padding: 10,
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    marginBottom: theme.spacing(5),
  },
  subtitle1: {
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  viewOrder: {
    padding: theme.spacing(1, 3),
    background: theme.palette.primary.main,
    color: 'white !important',
    textDecoration: 'none',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
  },
}));
