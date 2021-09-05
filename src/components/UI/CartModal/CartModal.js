import { makeStyles } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1200,
    width: '100%',
    height: '-webkit-fill-available',
    maxHeight: '100vh',
    background: 'rgba(0,0,0,0.7)',
    transition: 'opacity .3s',
    '&.is-hide': {
      opacity: 0,
      pointerEvents: 'none',
    },
    '&.is-show': {
      opacity: 1,
      pointerEvents: 'all',
    },
  },
  modalOverLay: {
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 1210,
    width: '40%',
    height: '-webkit-fill-available',
    maxHeight: '100vh',
    background: '#fff',
    transition: 'all .5s',
    '&.is-hide': { transform: 'translateX(100%)' },
    '&.is-show': { transform: 'translateX(0)' },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  '@keyframes slideIn': {
    '0%': {
      transform: 'translateX(100%)',
    },
    '100%': {
      transform: 'translateX(0)',
    },
  },
}));

const Backdrop = ({ onClose, isOpen }) => {
  const classes = useStyles();
  return (
    <div
      className={`${classes.backdrop} ${isOpen ? 'is-show' : 'is-hide'}`}
      onClick={onClose}></div>
  );
};

const ModalOverlay = ({ children, isOpen }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.modalOverLay} ${isOpen ? 'is-show' : 'is-hide'}`}>{children}</div>
  );
};
const portalElement = document.getElementById('overlay');

const CartModal = ({ children, onClose, isOpen }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} isOpen={isOpen} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay isOpen={isOpen}>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default CartModal;
