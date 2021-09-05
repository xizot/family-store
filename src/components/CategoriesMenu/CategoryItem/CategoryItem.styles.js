import { makeStyles, alpha } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  cateTitle: {
    padding: '12px 20px',
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.4),
    },
  },
  arrowIcon: {
    marginLeft: 10,
    justifySelf: 'flex-end',
  },
  items: {
    maxHeight: 0,
    overflow: 'auto',
    transition: 'all .5s',
    'scrollbar-width': 'none',
    '-ms-overflow-style': 'none',
    listStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
      width: 0,
      height: 0,
    },
    '& li,a': {
      display: 'block',
    },
    '& li:hover': {
      background: alpha(theme.palette.primary.main, 0.4),
    },
    '&.is-show': {
      maxHeight: 200,
    },
    '&.is-hide': {
      maxHeight: 0,
    },
  },
  item: {
    display: 'block',
    padding: '12px 12px 12px 50px',
    '& a': {
      textDecoration: 'none',
      color: 'rgba(0,0,0,.8)',
    },
    '& a.active': {
      fontWeight: 'bold',
      color: theme.palette.primary.main,
    },
  },
  itemActive: {
    fontWeight: 'bold',
  },
}));
