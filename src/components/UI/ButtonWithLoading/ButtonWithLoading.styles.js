import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    display: 'block',
    '&.Mui-disabled': {
      boxShadow: '0px 2px 8px rgba(0,0,0,.3)',
    },
  },
  buttonLoading: {
    opacity: ' 0.7 !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'not-allowed',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  isHide: {
    opacity: 0,
  },
}));
