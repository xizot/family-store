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
    transition: 'all .5s',
    textDecoration: 'none',
    color: '#333',
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.4),
    },
    '&.active': {
      color: theme.palette.primary.main,
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
      transition: 'all .5s',
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
  '@keyframes toggle': {
    '0%': {
      maxHeight: 0,
    },
    '100%': {
      maxHeight: 200,
    },
  },
  itemActive: {
    color: theme.palette.primary.main + '!important',
    '& > h6': {
      color: theme.palette.primary.main,
    },
  },
}));
export const SideBarItem = ({ IconComponent, title, link, subItems }) => {
  const classes = useStyles();
  const [toggleList, setToggleList] = useState(false);
  const toggleListHandler = () => {
    setToggleList((prevState) => !prevState);
  };
  return (
    <li className={classes.root}>
      <div>
        {link ? (
          <NavLink to={link} className={classes.navLink} activeClassName={classes.itemActive}>
            <IconComponent className={classes.icon} />
            <Typography variant="subtitle1" className={classes.title}>
              {title}
            </Typography>
          </NavLink>
        ) : (
          <div className={classes.navLink} onClick={toggleListHandler}>
            <IconComponent className={classes.icon} />
            <Typography variant="subtitle1" className={classes.title} style={{ fontWeight: '500' }}>
              {title}
            </Typography>
            {subItems?.length > 0 && (
              <>
                {toggleList && <ExpandMore className={classes.arrowIcon} />}
                {!toggleList && <ChevronRight className={classes.arrowIcon} />}
              </>
            )}
          </div>
        )}
      </div>

      {toggleList && subItems?.length > 0 && (
        <ul className={classes.items}>
          {subItems.map((item, index) => (
            <li className={classes.item} key={index}>
              <NavLink to={item.link} activeClassName={classes.itemActive}>
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
