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
    textTransform: 'uppercase',
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
  handleAvatar: {
    width: 'fit-content',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginBottom: theme.spacing(3),
    },
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
    border: '1px solid #ddd',
  },
  labelAvatar: {
    width: 200,
    height: 200,
    display: 'block',
    position: 'relative',
    '&:hover $avatarHover': {
      opacity: 1,
    },
  },
  avatarHover: {
    opacity: 0,
    transition: 'opacity .5s',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'rgba(0,0,0,.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > label': {
      padding: theme.spacing(0.25, 0.75),
      background: '#fff',
      whiteSpace: 'nowrap',
      borderRadius: theme.shape.borderRadius,
      boxShadow: '0px 2px 8px rgba(0,0,0,.3)',
      fontWeight: 'bold',
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.8,
      },
    },
    '&.is-show': {
      opacity: 1,
      transition: 'opacity .5s',
    },
  },
  labelDelete: {
    color: 'red',
  },
  btnUpdateImage: {
    marginTop: theme.spacing(2),
  },
}));
