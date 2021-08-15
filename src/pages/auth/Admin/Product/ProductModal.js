import { makeStyles, Modal } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    width: '60rem',
    maxWidth: '90%',
    margin: '0 auto',
    overflow: 'auto',
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
