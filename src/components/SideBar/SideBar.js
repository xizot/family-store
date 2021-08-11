import { IconButton, makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../reducers/ui';
import SearchInput from '../UI/SearchInput';
import SideBarTablet from './SideBarTablet/SideBarTablet';

const useStyles = makeStyles((theme) => ({
  cateDesktop: {
    display: 'block',
    position: 'fixed',
    left: 0,
    top: 64,
    zIndex: 10,
    background: '#fff',
    height: 'calc(100% - 64px)',
    width: 260,
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cateTablet: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
  },
  search: {
    margin: '80px 20px 0',
  },
  iconClose: {
    position: 'absolute',
    right: 8,
  },
}));

const SideBar = ({ children }) => {
  const classes = useStyles();
  const isOpenSideBar = useSelector((state) => state.ui.isOpenSideBar);
  const dispatch = useDispatch();
  const toggleSideBarHandler = () => {
    dispatch(uiActions.toggleSideBar());
  };
  return (
    <>
      <div className={classes.cateDesktop}>{children}</div>
      {isOpenSideBar && (
        <SideBarTablet onClose={toggleSideBarHandler}>
          <div className={classes.cateTablet}>
            <IconButton className={classes.iconClose} onClick={toggleSideBarHandler}>
              <Close fontSize="large" />
            </IconButton>
            <div className={classes.search}>
              <SearchInput border={true} />
            </div>
            {children}
          </div>
        </SideBarTablet>
      )}
    </>
  );
};

export default SideBar;
