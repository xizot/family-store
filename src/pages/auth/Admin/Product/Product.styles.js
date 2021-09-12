import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    textTransform: 'uppercase',
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  section: {
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  topContent: {
    borderRadius: theme.shape.borderRadius,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    margin: 0,
    padding: theme.spacing(1),
  },
  filter: {
    marginTop: theme.spacing(2),
    marginBottom: '12px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  filterItem: {
    background: theme.palette.primary.main,
    minWidth: 200,
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
      width: '100%',
      justifyContent: 'space-between',
      '&:not(:last-child)': {
        marginRight: 0,
      },
    },
  },
  label: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 70,
    },
  },
  select: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F39148',
    marginLeft: theme.spacing(1),
    '& svg': {
      color: theme.palette.common.white,
    },
  },
  addButton: {
    marginLeft: 'auto',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  search: {
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  pagination: {
    '& > *': {
      justifyContent: 'center',
      display: 'flex',
    },
  },
  tableHead: {
    fontWeight: 'bold',
    color: 'red',
  },
  longTextStyle: {
    wordWrap: 'break-word',
    width: 250,
    maxWidth: 500,
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  productName: {
    wordWrap: 'break-word',
    width: 200,
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },

  tableRow: {
    transition: 'all .5s',
    '&:hover': {
      background: '#dedede !important ',
      cursor: 'pointer',
    },
  },
  actionIcon: {
    cursor: 'pointer',
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
  textField: {
    '& select': {
      paddingTop: 8,
      paddingBototm: 8,
      background: theme.palette.primary.main + '!important',
      color: '#fff',
      outline: 'none',
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(1),
      maxWidth: 250,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '& svg': {
      color: '#fff',
    },
    '& fieldset': {
      border: 'none',
      outline: 'none',
    },
  },
  menuPaper: {
    maxHeight: 100,
  },
}));
