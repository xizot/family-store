import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    backgroundColor: '#FFF',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
    },
  },
  title: {
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
    color: '#F39148',
    fontWeight: '500',
    textTransform: 'uppercase',
    position: 'relative',
    margin: theme.spacing(2, 0),
    '&:before': {
      content: "''",
      position: 'absolute',
      left: 0,
      right: 0,
      width: 5,
      height: '100%',
      background: theme.palette.primary.main,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.4rem',
    },
  },
  btnMore: {
    display: 'block',
    margin: `${theme.spacing(2)}px auto 0`,
  },
}));
