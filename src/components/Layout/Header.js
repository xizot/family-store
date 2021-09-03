import {
  Typography,
  AppBar,
  makeStyles,
  IconButton,
  Badge,
  Toolbar,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { LocalMall, Person, Menu, Translate } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { authActions } from '../../reducers/auth';
import { uiActions } from '../../reducers/ui';
import SearchInput from '../UI/SearchInput';
import { langActions } from '../../reducers/lang';
import {
  AiOutlineLogin,
  AiOutlineProfile,
  AiOutlineOrderedList,
  AiOutlineLogout,
} from 'react-icons/ai';
const useStyles = makeStyles((theme) => ({
  root: {},
  toolBar: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  logo: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  menuButton: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  fromTablet: {
    display: 'block',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  mobileOnly: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },

  home: {
    color: 'inherit',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: ({ showMenu }) => (showMenu ? 0 : theme.spacing(1)),
    '& img': {
      width: 24,
      marginRight: 10,
      height: 'auto',
      maxHeight: '100%',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    '&>h2': {
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
  },
  sectionDesktop: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  search: {
    flex: 3,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  navLink: {
    color: 'inherit',
  },
  iconButton: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: '5px',
    },
    '&:hover $iconButtonCaption': {
      opacity: 1,
    },
  },
  iconButtonCaption: {
    position: 'absolute',
    bottom: -theme.spacing(1.25),
    left: '50%',
    transform: 'translate(-50%, 100%)',
    whiteSpace: 'nowrap',
    color: '#333',
    padding: '0px 2px',
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    opacity: 0,
    transition: 'opacity .3s',
    pointerEvents: 'none',
    boxShadow: '0px 1px 3px rgba(0,0,0,.3)',
  },
  dropDown: {
    position: 'absolute',
    bottom: -theme.spacing(1.25),
    right: -5,
    transform: 'translateY(100%)',
    color: '#333',
    padding: theme.spacing(0.5, 0),
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity .3s',
    boxShadow: '0px 1px 3px rgba(0,0,0,.3)',
    width: 'max-content',
    minWidth: 180,
    listStyle: 'none',
    '& li': {
      display: 'flex',
      alignItems: 'center',
      padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    },
    '& li:not(:last-child)': {
      borderBottom: '1px solid #ddd',
    },
    '& a': {
      fontSize: theme.typography.fontSize,
      textAlign: 'left',
      display: 'block',
      paddingLeft: 5,
      textDecoration: 'none',
      color: '#333',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  dropDownActive: {
    opacity: 1,
    pointerEvents: 'all',
  },
  selectLanguage: {
    color: '#fff',
    margin: '0 12px',
    '& svg': {
      color: '#fff',
    },
    '&:before': {
      border: 'none !important',
    },
  },
  bump: {
    animation: '$bump 300ms ease-out',
  },
  '@keyframes bump': {
    '0%': {
      transform: 'scale(1)',
    },
    '10%': {
      transform: 'scale(0.9)',
    },
    '30%': {
      transform: 'scale(1.1)',
    },
    '500%': {
      transform: 'scale(1.15)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));
const Header = ({ showMenu, showCart }) => {
  const { i18n } = useTranslation();
  const classes = useStyles({ showMenu });
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems = useSelector((state) => state.cart.data);
  const lang = useSelector((state) => state.lang.current);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [btnIsHightlighted, setBtnIsHightlighted] = useState(false);

  const [toggleUserDropdown, setToggleUserDropdown] = useState(false);

  const toggleUserDropdownHandler = () => {
    setToggleUserDropdown((prevState) => !prevState);
  };
  const numberOfCartItems = cartItems.reduce((cartNumber, item) => {
    return cartNumber + item.cartAmount;
  }, 0);

  const toggleCartModalHandler = () => {
    dispatch(uiActions.toggleCartModal());
  };

  const toggleSideBarHandler = () => {
    dispatch(uiActions.toggleSideBar());
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
    history.push('/login');
  };

  const languageChangeHandler = (e) => {
    const langSelected = e.target.value;
    i18n.changeLanguage(langSelected);
    dispatch(langActions.updateLang(langSelected));
  };

  const btnCart = `${classes.iconButton} ${btnIsHightlighted ? classes.bump : ''}`;
  useEffect(() => {
    if (cartItems?.length === 0) {
      return;
    }

    setBtnIsHightlighted(true);
    setTimeout(() => {
      setBtnIsHightlighted(false);
    }, 300);
  }, [cartItems]);

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.logo}>
          {showMenu && (
            <IconButton
              aria-label="menu"
              color="inherit"
              className={`${classes.iconButton} ${classes.menuButton}`}
              onClick={toggleSideBarHandler}>
              <Menu />
            </IconButton>
          )}

          <Link to="/" className={classes.home}>
            <img src={`${process.env.PUBLIC_URL}/img/store-icon.png`} alt="store icon" />
            <Typography variant="h6" component="h2" noWrap>
              FAMILY STORE
            </Typography>
          </Link>
        </div>
        <div className={classes.search}>
          <SearchInput />
        </div>

        <div className={classes.sectionDesktop}>
          <Select
            onChange={languageChangeHandler}
            value={lang}
            displayEmpty
            className={classes.selectLanguage}
            inputProps={{ 'aria-label': 'Without label' }}
            IconComponent={Translate}>
            <MenuItem value="en">
              <Typography className={classes.fromTablet}>English</Typography>
              <Typography className={classes.mobileOnly}>EN</Typography>
            </MenuItem>
            <MenuItem value="vn">
              <Typography className={classes.fromTablet}>Vietnamese</Typography>
              <Typography className={classes.mobileOnly}>VN</Typography>
            </MenuItem>
          </Select>
          <IconButton
            aria-label="My profile"
            color="inherit"
            className={classes.iconButton}
            onClick={toggleUserDropdownHandler}>
            <Person />
            <ul
              className={`${classes.dropDown} ${toggleUserDropdown ? classes.dropDownActive : ''}`}>
              {!isAuthenticated && (
                <li>
                  <AiOutlineLogin fontSize={20} />
                  <Link to="/login">Log In</Link>
                </li>
              )}
              {isAuthenticated && (
                <>
                  <li>
                    <AiOutlineProfile fontSize={20} />
                    <Link to="/profile">My Account</Link>
                  </li>
                  <li>
                    <AiOutlineOrderedList fontSize={20} />
                    <Link to="/orders">My Orders</Link>
                  </li>
                  <li>
                    <AiOutlineLogout fontSize={20} />
                    <Link to="" onClick={(e) => logoutHandler(e)}>
                      Log Out
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </IconButton>

          {showCart && (
            <IconButton
              aria-label="show number products"
              color="inherit"
              className={btnCart}
              onClick={toggleCartModalHandler}>
              <Badge badgeContent={numberOfCartItems} color="secondary">
                <LocalMall />
              </Badge>
              <Typography variant="caption" className={classes.iconButtonCaption}>
                My cart
              </Typography>
            </IconButton>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
