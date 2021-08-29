import { Typography } from '@material-ui/core';
import { ChevronRight, ExpandMore } from '@material-ui/icons';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useStyles from './CategoryItem.styles';

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
