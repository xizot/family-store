import { Box, Button, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const TableError = ({ message, onTryAgain }) => {
	const { t } = useTranslation();
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      padding="50px"
      style={{ background: '#fff' }}>
      <Typography variant="body1" style={{ marginBottom: 10 }}>
        {message}
      </Typography>
      <Button color="primary" variant="outlined" onClick={onTryAgain}>
        {t('generalButtons.refresh')}
      </Button>
    </Box>
  );
};
export default TableError;
