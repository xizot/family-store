import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '20px 0',
    borderBottom: '1px solid #ddd',
  },
  remove: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.7)',
    cursor: 'pointer',
    opacity: 0,
    transition: '.3s all',
  },
  image: {
    position: 'relative',
    height: 100,
    width: 80,
    marginRight: theme.spacing(1),
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    '&:hover': {
      '& $remove': {
        opacity: 1,
      },
    },
  },
  description: {
    marginTop: theme.spacing(0.5),
    display: 'flex',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginTop: 0,
    },
  },
  detail: {
    flex: 1,
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
    },
  },
  info: {
    marginTop: 5,
    opacity: 0.9,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  price: {
    opacity: 0.7,
  },
  hasSale: {
    textDecoration: 'line-through',
    opacity: 0.8,
  },
  totalPrice: {
    textAlign: 'right',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      paddingRight: theme.spacing(2),
    },
  },
  actions: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'space-between',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginTop: theme.spacing(1),
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  },
}));
