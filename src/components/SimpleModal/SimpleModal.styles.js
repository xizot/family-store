import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    outline: 'none',
    overflow: 'scroll',
    height: '100%',
    display: 'block',
    top: 0,
    left: 0,
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(255,255,255,0.4)',
      backgroundColor: ' #fff',
    },
    '&::-webkit-scrollbar': {
      width: 2,
      backgroundColor: ' #fff',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  content: {
    width: '60rem',
    margin: '20vh auto 0',
    maxWidth: '96%',
    outline: 'none',
  },
}));
