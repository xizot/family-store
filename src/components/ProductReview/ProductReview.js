import { Typography } from '@material-ui/core';
import { StarRounded } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import { useSelector } from 'react-redux';
import GenerateStar from '../GenerateStar/GenerateStar';
import ReviewItem from '../ReviewItem/ReviewItem';
import useStyles from './ProductReview.styles';
function ProductReview({ page, onPageChange }) {
  const classes = useStyles();
  const comments = useSelector((state) => state.userComment.comments);
  const commentTotalPage = useSelector((state) => state.userComment.totalPage);
  const avgStar = useSelector((state) => state.userComment.avgStar);
  const totalReviewStar = useSelector((state) => state.userComment.totalReviewStar);
  const totalPeopleReview = useSelector((state) => state.userComment.totalPeopleReview);

  return (
    <div>
      <div className={classes.reviewContent}>
        <div className={classes.star}>
          <div className={classes.totalReviewed}>
            <Typography variant="h6" color="primary">
              {avgStar}
            </Typography>
            <StarRounded color="primary" className={classes.bigStar} />
            <Typography variant="body2" color="primary">
              {totalPeopleReview} <br /> đánh giá
            </Typography>
          </div>
          <div>
            <GenerateStar
              numOfStar={5}
              rootCustom={classes.starReviewed}
              totalReviewed={totalReviewStar.five}
            />
            <GenerateStar
              numOfStar={4}
              rootCustom={classes.starReviewed}
              totalReviewed={totalReviewStar.four}
            />
            <GenerateStar
              numOfStar={3}
              rootCustom={classes.starReviewed}
              totalReviewed={totalReviewStar.three}
            />
            <GenerateStar
              numOfStar={2}
              rootCustom={classes.starReviewed}
              totalReviewed={totalReviewStar.two}
            />
            <GenerateStar
              numOfStar={1}
              rootCustom={classes.starReviewed}
              totalReviewed={totalReviewStar.one}
            />
          </div>
        </div>
        <div className={classes.comment}>
          {
            <ul className={classes.commentContent}>
              {comments.length > 0 &&
                comments.map((comment, index) => (
                  <ReviewItem
                    key={index}
                    imgSrc={
                      comment.user_avatar || process.env.PUBLIC_URL + '/img/default-avatar.png'
                    }
                    name={comment.user_name}
                    numOfStar={comment.star}
                    content={comment.content}
                  />
                ))}
              <Typography variant="body1" className={classes.noComment}>
                There are no comments yet
              </Typography>
            </ul>
          }
          {commentTotalPage > 0 && (
            <Pagination
              count={commentTotalPage}
              variant="outlined"
              shape="rounded"
              color="primary"
              className={classes.pagination}
              onChange={onPageChange}
              page={page}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductReview;
