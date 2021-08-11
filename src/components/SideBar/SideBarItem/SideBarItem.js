import { alpha, makeStyles, Typography } from '@material-ui/core';
import { ChevronRight, ExpandMore } from '@material-ui/icons';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  navLink: {
    padding: '12px 20px',
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.4),
    },
  },
  title: {
    textDecoration: 'none',
    color: '#000',
    display: 'block',
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 10,
    justifySelf: 'flex-end',
  },
  items: {
    maxHeight: 200,
    overflow: 'auto',
    'scrollbar-width': 'none',
    '-ms-overflow-style': 'none',
    listStyle: 'none',
    animation: '$toggle .5s ease-in-out',
    '&::-webkit-scrollbar': {
      display: 'none',
      width: 0,
      height: 0,
    },
    '& li,a': {
      display: 'block',
    },
    '& li:hover': {
      background: alpha(theme.palette.primary.main, 0.4),
    },
  },
  item: {
    display: 'block',
    padding: '12px 12px 12px 50px',
    '& a': {
      textDecoration: 'none',
      color: 'rgba(0,0,0,.8)',
    },
  },
  itemActive: {
    fontWeight: 'bold',
  },
  '@keyframes toggle': {
    '0%': {
      maxHeight: 0,
    },
    '100%': {
      maxHeight: 200,
    },
  },
}));
export const SideBarItem = ({ IconComponent, title, link, subItems }) => {
  console.log(subItems);
  const classes = useStyles();
  const [toggleList, setToggleList] = useState(false);
  const toggleListHandler = () => {
    setToggleList((prevState) => !prevState);
  };
  return (
    <li className={classes.root}>
      <div className={classes.navLink}>
        <IconComponent className={classes.icon} />
        {link ? (
          <NavLink to={link} className={classes.title} activeClassName={classes['item-active']}>
            <Typography variant="subtitle1" style={{ fontWeight: '500' }}>
              {title}
            </Typography>
          </NavLink>
        ) : (
          <Typography
            variant="subtitle1"
            className={classes.title}
            style={{ fontWeight: '500' }}
            onClick={toggleListHandler}>
            {title}
          </Typography>
        )}
        {subItems?.length > 0 && (
          <>
            {toggleList && <ExpandMore className={classes.arrowIcon} />}
            {!toggleList && <ChevronRight className={classes.arrowIcon} />}
          </>
        )}
      </div>
      {toggleList && subItems?.length > 0 && (
        <ul className={classes.items}>
          {subItems.map((item, index) => (
            <li className={classes.item} key={index}>
              <NavLink to={item.link} activeClassName={classes['item-active']}>
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SideBarItem;
