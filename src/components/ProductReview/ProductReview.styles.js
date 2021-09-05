import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  reviewContent: {
    display: 'flex',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },

  star: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
    marginRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      width: '100%',
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  bigStar: {
    fontSize: 50,
  },
  totalReviewed: {
    textAlign: 'center',
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(1),
    },
  },
  comment: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  commentContent: {
    listStyle: 'none',
    marginBottom: theme.spacing(2),
  },
  starReviewed: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
  pagination: {
    '& ul': { justifyContent: 'flex-end' },
  },
  noComment: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));
