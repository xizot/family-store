import { useLayoutEffect, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

	useEffect(() => {
    document.title = t('pagesTitle.admin.landing');
  }, [t]);
	
  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Typography variant="h5" className={classes.title}>
          {t('adminPage.landing.title')}
        </Typography>
        <div className={classes.managerText}>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" >
								{t('adminPage.landing.category')} {3}
              </Typography>
              <Typography variant="subtitle1" >
								{t('adminPage.landing.product')} {551}
              </Typography>
              <Typography variant="subtitle1" >
								{t('adminPage.landing.order')} {51}
              </Typography>
              <Typography variant="subtitle1" >
								{t('adminPage.landing.orderStatistics')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" >
								{t('adminPage.landing.subCategory')} {100}
              </Typography>
              <Typography variant="subtitle1" >
								{t('adminPage.landing.customer')} {1051}
              </Typography>
              <Typography variant="subtitle1" >
							{t('adminPage.landing.staff')} {101}
              </Typography>
            </Grid>
          </Grid>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
