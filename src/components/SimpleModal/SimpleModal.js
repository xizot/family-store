import { Box, Modal } from '@material-ui/core';
import useStyles from './SimpleModal.styles';

const SimpleModal = ({ isOpen, onClose, children }) => {
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

export default SimpleModal;
