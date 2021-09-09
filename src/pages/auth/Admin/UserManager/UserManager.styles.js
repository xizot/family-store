import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  section: {
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  filter: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    marginBottom: theme.spacing(2),
  },
  filterItem: {
    [theme.breakpoints.down('xs')]: {
      '&:not(:last-child)': {
        marginBottom: theme.spacing(2),
        width: '100%',
      },
    },
  },

  actionIcon: {
    cursor: 'pointer',
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
  longText: {
    wordWrap: 'break-word',
    maxWidth: 250,
  },
  tableRow: {
    transition: 'all .5s',
    '&:hover': {
      background: '#dedede !important ',
      cursor: 'pointer',
    },
  },
}));
