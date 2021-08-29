import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title2: {
    marginTop: 25,
    borderBottom: '1px solid #ddd',
    [theme.breakpoints.down('xs')]: {
      marginTop: 15,
    },
  },
  content: {
    height: '100%',
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'auto',
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
    },
  },
  iconClose: {
    marginRight: -12,
  },
  listItem: {
    listStyle: 'none',
    flex: 1,
    overflow: 'auto',
  },
  buttonCheckout: {
    marginTop: 12,
  },
}));
