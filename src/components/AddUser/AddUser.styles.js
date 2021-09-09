import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    maxHeight: '-webkit-fill-available',
  },
  content: {
    padding: '20vh 0',
  },
  title: {
    fontWeight: 'bold',
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  phoneInput: {
    height: '255px ',
  },
  form: {
    background: '#fff',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    padding: '50px 25px',
    [theme.breakpoints.down('xs')]: {
      padding: '35px 15px',
    },
  },
  formControl: {
    display: 'block',
    marginBottom: 15,
    width: '100%',
  },
  button: {
    '&:disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'all !important',
    },
  },
  inputInvalid: {
    borderColor: theme.palette.error.main + '!important',
    '& ~ div': {
      borderColor: theme.palette.error.main + '!important',
    },
  },
  formHelperText: {
    color: theme.palette.error.main,
  },
  iconClose: {
    position: 'absolute',
    right: -12,
    top: -12,
    color: '#000',
  },
}));
