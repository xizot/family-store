import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    '& .MuiFilledInput-root': {
      background: '#fff',
    },
  },
  back: {
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  main: {
    marginLeft: 'auto',
    width: 'calc(100% - 260px)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  mainContent: {
    padding: `80px ${theme.spacing(2)}px 80px`,
    [theme.breakpoints.down('xs')]: {
      padding: `68px ${theme.spacing(2)}px 105px`,
      width: '100%',
    },
  },
  section: {
    background: '#cacaca',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0, 2, 2),
    marginBottom: theme.spacing(2),
  },
  title: {
    background: '#fff',
    padding: theme.spacing(1.5, 2),
    margin: theme.spacing(0, -2),
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    position: 'relative',
    '&::after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      left: theme.spacing(5),
      borderWidth: 10,
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderBottomColor: '#cacaca',
    },
  },
  addressOption: {
    display: 'flex',
    flexDirection: 'row',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    marginBottom: theme.spacing(2),
  },
  expectedDate: {
    color: theme.palette.primary.main,
  },
  buttonHelper: {
    fontSize: 10,
  },
  billInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    '&>span': {
      textAlign: 'right',
      minWidth: 150,
      [theme.breakpoints.down('xs')]: {
        textAlign: 'left',
        '&>hr': {
          marginLeft: 0 + '!important',
        },
      },
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
  billInfoLabel: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
}));
