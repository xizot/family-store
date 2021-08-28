import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';

function RequestLoading() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      paddingTop={5}
      paddingBottom={5}>
      <CircularProgress color="primary" size={25} />
    </Box>
  );
}

export default RequestLoading;
