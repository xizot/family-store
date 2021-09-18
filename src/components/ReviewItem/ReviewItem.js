import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import GenerateStar from '../GenerateStar/GenerateStar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(1),
  },
  image: {
    width: 60,
    height: 60,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: 2,
    borderRadius: '50%',
    marginRight: theme.spacing(2),
  },
  name: {
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
  content: {
    flex: 1,
  },
  top: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));
const ReviewItem = ({ imgSrc, name, numOfStar, content }) => {
  const classes = useStyles();
  return (
    <li className={classes.root}>
      <img src={imgSrc} alt="" className={classes.image} />
      <div className={classes.content}>
        <div className={classes.top}>
          <Typography variant="body1" className={classes.name}>
            {name}
          </Typography>
          <GenerateStar numOfStar={numOfStar} rootCustom={classes.starReviewed} />
        </div>
        <Typography variant="body2">{content}</Typography>
      </div>
    </li>
  );
};

export default ReviewItem;
