import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { getListProductSuggestion } from '../../reducers/user-product.reducer';
import CustomArrowNext from '../CustomArrow/CustomArrowNext';
import CustomArrowPrev from '../CustomArrow/CustomArrowPrev';
import ProductItem from '../ProductItem/ProductItem';
import useStyles from './SuggestionList.styles';
import { useCart } from '../../hooks/use-cart';

const suggestSettings = {
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 6,
  slidesToScroll: 6,
  nextArrow: <CustomArrowNext />,
  prevArrow: <CustomArrowPrev />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4, //number of items to show per slide
        slidesToScroll: 4, //number of items gonna jump per click
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 3, //number of items to show per slide
        slidesToScroll: 3, //number of items gonna jump per click
        initialSize: 0,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2, //number of items to show per slide
        slidesToScroll: 2, //number of items gonna jump per click
        initialSize: 0,
      },
    },
    {
      breakpoint: 360,
      settings: {
        slidesToShow: 1, //number of items to show per slide
        slidesToScroll: 1, //number of items gonna jump per click
        initialSize: 0,
      },
    },
  ],
};
function SuggestionList({ catID }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [suggestList, setSuggestList] = useState([]);

  const { addNew } = useCart();

  useEffect(() => {
    const getListSuggestHandler = async () => {
      try {
        const response = await dispatch(getListProductSuggestion({ catID: +catID })).unwrap();
        setSuggestList(response.listProduct);
      } catch (error) {
        setSuggestList([]);
      }
    };
    if (catID) {
      getListSuggestHandler();
    }
  }, [dispatch, catID]);

  return (
    <div className={classes.suggestListContent}>
      {(suggestList?.length > 0 && (
        <Slider {...suggestSettings} className={classes.suggestSlider}>
          {suggestList.map((item, index) => (
            <ProductItem
              key={index}
              size="small"
              id={item.prod_id}
              title={item.prod_name}
              description={item.prod_description}
              image={item.images}
              price={item.prod_price}
              onAddToCart={addNew.bind(null, item, 1)}
            />
          ))}
        </Slider>
      )) || (
        <Typography variant="body1" className={classes.noProduct}>
          There are no product recommendations
        </Typography>
      )}
    </div>
  );
}

export default SuggestionList;
