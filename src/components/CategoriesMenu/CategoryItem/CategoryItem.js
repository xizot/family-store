import { alpha, makeStyles, Typography } from '@material-ui/core';
import { ChevronRight, ExpandMore } from '@material-ui/icons';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  cateTitle: {
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
export const CategoryItem = ({ id, title, items }) => {
  const classes = useStyles();
  const [toggleList, setToggleList] = useState(false);
  const toggleListHandler = () => {
    setToggleList((prevState) => !prevState);
  };
  return (
    <li className={classes.root}>
      <div onClick={toggleListHandler} className={classes.cateTitle}>
        <Typography variant="subtitle1" style={{ fontWeight: '500' }}>
          {title}
        </Typography>
        {toggleList && <ExpandMore className={classes.arrowIcon} />}
        {!toggleList && <ChevronRight className={classes.arrowIcon} />}
      </div>
      {toggleList && (
        <ul className={classes.items}>
          {items?.length > 0 &&
            items.map((item, index) => (
              <li className={classes.item} key={index}>
                <NavLink
                  to={`/collections/${item.cateId}`}
                  activeClassName={classes['item-active']}>
                  {item.cateName}
                </NavLink>
              </li>
            ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryItem;
