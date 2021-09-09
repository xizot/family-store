import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    marginTop: '10vh',
    marginBottom: '10vh',
  },
  content: {
    background: '#fff',
    padding: theme.spacing(2, 5),
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  mainImage: {
    display: 'block',
    height: '400px',
    borderRadius: theme.shape.borderRadius,
    background: '#f1f4fb',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 50px)',
    },
  },
  listUpload: {},
  iconAdd: {
    marginBottom: theme.spacing(1),
    background: '#f1f4fb',
  },
  textField: {
    marginBottom: theme.spacing(1),

    '& > p': {
      width: 300,
      fontWeight: 'bold',
    },
  },
  productInformation: {
    width: 'calc(100% - 350px)',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  image: {
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  menuPaper: {
    maxHeight: 300,
  },
  section: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  textarea: {
    outline: 'none',
    resize: 'vertical',
    padding: '10.5px 14px',
    border: '1px solid #c4c4c4',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),

    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
  actions: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  buttonSubmit: {
    marginRight: theme.spacing(2),
  },
  iconClose: {
    position: 'absolute',
    right: -12,
    top: -12,
    color: '#000',
  },
}));
