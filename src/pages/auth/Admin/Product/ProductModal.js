import { makeStyles, Modal } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    width: '60rem',
    padding: 10,
    maxWidth: '90%',
    margin: '0 auto',
    overflow: 'auto',
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
      {children}
    </Modal>
  );
};

export default ProductModal;
