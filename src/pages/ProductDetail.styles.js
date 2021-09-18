import { alpha, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  main: {
    marginLeft: 'auto',
    width: 'calc(100% - 260px)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  mainContent: {
    padding: `80px ${theme.spacing(2)}px 65px`,
    [theme.breakpoints.down('xs')]: {
      padding: `68px ${theme.spacing(2)}px 85px`,
      width: '100%',
    },
  },
  section: {
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.common.white,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  top: {
    display: 'flex',
    padding: '20px 30px',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      padding: theme.spacing(2),
    },
  },
  productImage: {
    width: '40%',
    overflow: 'hidden',
    padding: '0 4px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  },
  productInfo: {
    paddingLeft: theme.spacing(3),
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  districtSelector: {
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.primary.main,
    padding: `0 ${theme.spacing(1)}px`,
    color: theme.palette.common.white,
    '& svg': { color: theme.palette.common.white },
    '&:before,&:after ': {
      display: 'none',
    },
  },
  menuPaper: {
    maxHeight: 200,
  },
  thumbnail: {
    position: 'relative',
    overflow: 'hidden',
    margin: '0 auto',
    marginBottom: theme.spacing(1),

    width: 370,
    maxWidth: '100%',
    '& .slick-slide ': {
      padding: `0  35px`,
    },
    '& .slick-slide $sliderImage img': {
      padding: theme.spacing(1),
      border: `1px solid #ddd`,
      borderRadius: theme.shape.borderRadius,
    },
    '& .slick-current $sliderImage img': {
      borderRadius: theme.shape.borderRadius,
      borderColor: theme.palette.primary.main,
    },
  },
  slider: {
    position: 'relative',

    '& .slick-slide $sliderImage img': {
      padding: theme.spacing(0.5),
      border: `1px solid #ddd`,
      borderRadius: theme.shape.borderRadius,
    },
    '& .slick-current $sliderImage img': {
      borderColor: theme.palette.primary.main,
    },
  },
  sliderControl: {
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 500,
      margin: '0 auto',
    },
    '& .slick-track': {
      margin: 'auto',
    },
  },
  thumbnailImage: {
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  sliderImage: {
    height: 50,
    '& img': {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
  },
  sliderMainImage: {
    height: 300,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },

  descriptionText: {
    position: 'relative',
    wordBreak: 'break-word',
    marginBottom: theme.spacing(2),
    transition: 'max-height .5s',
    fontSize: 16,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    lineHeight: 2,
    color: '#333',
    overflow: 'auto',
    '&:before': {
      opacity: 0,
      content: "''",
      position: 'absolute',
      left: 0,
      bottom: -1,
      zIndex: 10,
      width: '100%',
      height: 70,
      boxShadow: `0px 3px 10px ${alpha(theme.palette.primary.main, 0.5)}`,
      background: `linear-gradient(to bottom, rgba(193, 193, 193,.3), ${theme.palette.primary.main})`,
      transition: 'background .7s',
      marginBottom: 1,
      pointerEvents: 'none',
    },
    '& img': {
      maxWidth: '100%',
      height: 'auto',
      display: 'block',
      margin: '8px auto',
    },
    '& h3': {
      fontSize: '2rem',
      margin: theme.spacing(2, 0, 1),
      fontWeight: 500,
    },
    '& h4': {
      fontSize: '1.4rem',
      fontWeight: 'bold',
    },
    '& ul': {
      margin: '0 1em',
      paddingLeft: theme.spacing(3),
    },
    '& li': {
      display: 'list-item',
      paddingLeft: theme.spacing(1),
      marginBottom: theme.spacing(1),
      listStyle: 'disc outside none',
    },
  },
  isLess: {
    maxHeight: 100,
    overflow: 'hidden',
    '&:before': {
      opacity: 1,
    },
  },
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.25rem',
    },
  },
  imgShowLess: {
    transform: 'rotate(90deg)',
  },
  imgShowMore: {
    transform: 'rotate(-90deg)',
  },
  btnToggleDescription: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  price: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  shipPredict: {
    width: 400,
    maxWidth: '100%',
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3),
    },
  },
  shipPredictInfo: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
  shipPredictLabel: {
    width: 165,
    fontWeight: 'bold',
  },

  addToCart: {
    display: 'flex',
    alignItems: 'center',
    width: 400,
    maxWidth: '100%',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    },
  },
  btnAddToCart: {
    flex: 1,
    marginLeft: theme.spacing(2),
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      flex: 'auto',
      marginTop: theme.spacing(1),
      marginLeft: 0,
    },
  },
  reviewContent: {
    display: 'flex',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },

  star: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
    marginRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      width: '100%',
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  bigStar: {
    fontSize: 50,
  },
  totalReviewed: {
    textAlign: 'center',
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(1),
    },
  },
  comment: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  commentContent: {
    listStyle: 'none',
    marginBottom: theme.spacing(2),
  },
  starReviewed: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
  pagination: {
    '& ul': { justifyContent: 'flex-end' },
  },
  loginToSee: {
    padding: theme.spacing(5, 0),
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    background: alpha(theme.palette.primary.main, 0.1),
    '& a': {
      color: theme.palette.primary.main,
    },
  },
}));
