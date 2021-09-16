import { Box, Container, makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BasicProfilePanel from '../../components/Panels/BasicProfilePanel';
// import AvatarPanel from '../../components/Panels/AvatarPanel';
// import ChangePasswordPanel from '../../components/Panels/ChangePasswordPanel';
import Footer from '../../components/Layout/Footer';
import Header from '../../components/Layout/Header';
import { details } from '../../reducers/account.reducer';
import TableError from '../../components/TableError/TableError';
import RequestLoading from '../../components/RequestLoading/RequestLoading';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    padding: '20vh 0 ',
  },
  tabPanel: {
    background: '#fff',
  },
  tabs: {
    borderBottom: '1px solid #ddd',
  },
  tabActive: {
    background: theme.palette.primary.main,
  },
  label: {
    color: '#fff',
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const Profile = (props) => {
  const history = useHistory();
  const { t } = useTranslation();
  let { slug } = useParams();
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();
  const accountLoading = useSelector((state) => state.account.loading);

  const indexToTabName = {
    0: 'basic',
    1: 'password',
    2: 'avatar',
  };
  const tabChangeHandler = (event, newValue) => {
    history.push(`/profile/${indexToTabName[newValue]}`);
    setTabValue(newValue);
  };

  const changeUserDetails = (newDetail) => {
    setUserDetails((prev) => ({ ...prev, ...newDetail }));
  };
  useEffect(() => {
    const tabNameToIndex = {
      basic: 0,
      password: 1,
      avatar: 2,
    };
    setTabValue(tabNameToIndex[slug || 'basic']);
  }, [slug]);

  const updateNewDataHandler = (newData) => {
    setUserDetails((prev) => ({ ...prev, ...newData }));
  };

  const getUserDetailsHandler = useCallback(
    async (accId) => {
      try {
        const response = await dispatch(details({ accId })).unwrap();
        setUserDetails(response.account);
      } catch (error) {
        console.log('🚀 ~ file: UpdateUser.js ~ line 153 ~ getUserDetailsHandler ~ error', error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (user.accId) {
      getUserDetailsHandler(user.accId);
    }
  }, [user, getUserDetailsHandler]);

  useEffect(() => {
    document.title = t('pagesTitle.profile');
  }, [t]);
  return (
    <>
      <div className={classes.root}>
        <Header showCart />
        <Container>
          <Paper>
            <Tabs
              indicatorColor="primary"
              value={tabValue}
              onChange={tabChangeHandler}
              variant="fullWidth"
              className={classes.tabs}
              TabIndicatorProps={{ className: classes.tabActive }}>
              <Tab label={t('profilepage.tabTitle.1')} />
              {/* <Tab label={t('profilepage.tabTitle.2')} />
              <Tab label={t('profilepage.tabTitle.3')} /> */}
            </Tabs>
          </Paper>
          <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
            {accountLoading ? (
              <RequestLoading />
            ) : userDetails ? (
              <BasicProfilePanel
                accId={user?.accId}
                pFullName={userDetails?.accFullName}
                pEmail={userDetails?.accEmail}
                pPhoneNumber={userDetails?.accPhoneNumber}
                pAvatar={userDetails?.accAvatar}
                onUpdateNewData={updateNewDataHandler}
                onChangeDetails={changeUserDetails}
              />
            ) : (
              <TableError
                message="Something went wrong!"
                onTryAgain={() => getUserDetailsHandler(user.accId)}
              />
            )}
          </TabPanel>
          {/* <TabPanel value={tabValue} index={1} className={classes.tabPanel}>
            <ChangePasswordPanel />
          </TabPanel>
          <TabPanel value={tabValue} index={2} className={classes.tabPanel}>
            <AvatarPanel />
          </TabPanel> */}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
