import { useLayoutEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
}));
const UserManager = (props) => {
  const classes = useStyles();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Typography variant="h5" style={{ color: '#F39148', textAlign: 'center' }}>
          USER MANAGER
        </Typography>
      </div>
    </div>
  );
};

export default UserManager;
