import { alpha, makeStyles, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userGetListCategory } from '../../reducers/user-category.reducer';
import RequestLoading from '../RequestLoading/RequestLoading';
import CategoryItem from './CategoryItem/CategoryItem';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflow: 'auto',
  },

  title: {
    opacity: 0.4,
    padding: '30px 20px 5px',
    fontWeight: 'bold',
    fontSize: 16,
  },
  line: {
    width: 'calc(100% - 40px)',
    display: 'block',
    margin: '0 auto',
    height: 1,
    background: alpha('#000000', 0.2),
  },
}));

const CategoriesMenu = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.userCategory.categories);
  const loading = useSelector((state) => state.userCategory.loading);

  useEffect(() => {
    const getListCategoryHandler = async () => {
      try {
        await dispatch(userGetListCategory()).unwrap();
      } catch (error) {
        toast.error(error);
      }
    };
    if (categories.length === 0) {
      getListCategoryHandler();
    }
  }, [dispatch, categories]);
  // const

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {t('sideBar.categories')}
      </Typography>
      <span className={classes.line}></span>
      {loading && <RequestLoading />}
      {!loading && (
        <ul>
          {categories?.length > 0 &&
            categories.map((category, index) => (
              <CategoryItem
                key={index}
                id={category.cateId}
                title={category.cateName}
                items={category.subCategories}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesMenu;
