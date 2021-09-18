import AdminMenu from '../../AdminMenu/AdminMenu';
import HeaderAdmin from '../../Layout/HeaderAdmin';
import { Person, Loyalty, Eco, TurnedIn } from '@material-ui/icons';

import SideBar from '../../SideBar/SideBar';
import UserInfomation from '../../UserInfomation/UserInfomation';
import Footer from '../../Layout/Footer';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  main: {
    background: '#ddd',
    minHeight: '100vh',
    paddingTop: 64,
    marginBottom: 65,
    width: 'calc(100% - 260px)',
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: 80,
      marginBottom: 85,
    },
  },
}));

export const AdminTemplate = ({ children }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();

  const options = [
    {
      icon: Loyalty,
      title: t('adminPage.sideBar.product.category'),
      link: '/admin/categories',
    },
    {
      icon: TurnedIn,
      title: t('adminPage.sideBar.product.subCategory'),
      link: '/admin/sub-categories',
    },
    {
      icon: Eco,
      title: t('adminPage.sideBar.product.product'),
      link: '/admin/products',
    },
    {
      icon: Person,
      title: t('adminPage.sideBar.user'),
      link: '/admin/users',
    },
  ];

  return (
    <>
      <HeaderAdmin showMenu />
      <SideBar>
        <UserInfomation
          avatar={`${process.env.PUBLIC_URL + '/img/default-avatar.png'}`}
          name={t('adminPage.sideBar.idName') + ` ${user.accId}`}
          position={t('adminPage.sideBar.positionName')}
        />
        <AdminMenu options={options} />
      </SideBar>
      <main className={classes.main}>{children}</main>
      <Footer hasSideBar />
    </>
  );
};
