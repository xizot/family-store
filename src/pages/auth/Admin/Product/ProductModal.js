import { Box, makeStyles, Modal } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    outline: 'none',
    overflow: 'scroll',
    height: '100%',
    display: 'block',
    top: 0,
    left: 0,
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(255,255,255,0.4)',
      backgroundColor: ' #fff',
    },
    '&::-webkit-scrollbar': {
      width: 2,
      backgroundColor: ' #fff',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  content: {
    width: '60rem',
    margin: '0 auto',
    maxWidth: '96%',
    outline: 'none',
  },
}));
const ProductModal = ({ isOpen, onClose, children }) => {
  const classes = useStyles();
  return (
    <Modal
      className={classes.root}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <Box className={classes.content}>{children}</Box>
    </Modal>
  );
};

export default ProductModal;
