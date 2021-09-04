import { Box, Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import useStyles from './ButtonWithLoading.styles';

function ButtonWithLoading({ children, size, onClick, fullWidth, isLoading, ...props }) {
  const classes = useStyles();
  return (
    <Box position="relative">
      {isLoading && (
        <Button
          className={`${classes.root} ${classes.buttonLoading}`}
          fullWidth={fullWidth}
          size={size}
          variant="contained"
          color="primary">
          <CircularProgress size={22} style={{ color: '#fff' }} />
        </Button>
      )}

      <Button
        className={`${classes.root} ${isLoading ? classes.isHide : ''}`}
        variant="contained"
        color="primary"
        fullWidth={fullWidth}
        size={size}
        onClick={onClick}
        {...props}>
        {children}
      </Button>
    </Box>
  );
}

export default ButtonWithLoading;
