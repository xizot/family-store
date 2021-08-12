import { useLayoutEffect } from 'react';
import {
  makeStyles,
  Grid,
  Typography,

} from '@material-ui/core';

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
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  managerText: {

  }

}));
const Dashboard = (props) => {
  const classes = useStyles();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Typography variant="h5" className={classes.title}>
          MANGER AREA
        </Typography>
        <div className={classes.managerText}>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" >
                TOTAL CATEGORIES: {3}
              </Typography>
              <Typography variant="subtitle1" >
                TOTAL PRODUCT: {551}
              </Typography>
              <Typography variant="subtitle1" >
                TOTAL ORDER CREATED: {51}
              </Typography>
              <Typography variant="subtitle1" >
                ORDER STATISTICS
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" >
                TOTAL SUB CATEGORIES: {100}
              </Typography>
              <Typography variant="subtitle1" >
                TOTAL CUSTOMER: {1051}
              </Typography>
              <Typography variant="subtitle1" >
                TOTAL STAFF: {101}
              </Typography>
            </Grid>
          </Grid>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
