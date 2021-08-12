import { Box, CircularProgress } from '@material-ui/core';

const TableLoading = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="50px"
      style={{ background: '#fff' }}>
      <CircularProgress size={20} />
    </Box>
  );
};
export default TableLoading;
