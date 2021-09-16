import { TablePagination } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const CustomTablePagination = ({
	rowsPerPageOptions,
	component,
	count,
	rowsPerPage,
	page,
	onPageChange,
	onRowsPerPageChange
}) => {
	const { t } = useTranslation();

	return (
		<TablePagination
			rowsPerPageOptions={rowsPerPageOptions}
			component={component}
			count={count}
			rowsPerPage={rowsPerPage}
			page={page}
			onPageChange={onPageChange}
			onRowsPerPageChange={onRowsPerPageChange}
			labelRowsPerPage={t('generalTable.rowsPerPage')}
		/>
	);
};

export default CustomTablePagination;
