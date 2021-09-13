import { Box, Button } from '@material-ui/core';
import { makeStyles, Modal, Typography } from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
	root: {},
	content: {
		width: '30rem',
		margin: '20vh auto 0',
		background: 'white',
		padding: theme.spacing(4),
		outline: 'none'
	},
	actions: {
		alignItems: 'center',
		justifyContent: 'center'
	}
}));

const ModalConfirm = ({ title, isOpen, onClose, onConfirm }) => {
	const classes = useStyles();
	const { t } = useTranslation();

	return (
		<Modal
			className={classes.root}
			open={isOpen}
			onClose={onClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			<Box className={classes.content} borderRadius={6}>
				<Box marginBottom={2}>
					<Typography variant="h6" component="p" style={{ textAlign: 'center', marginBottom: 16 }}>
						{title}
					</Typography>
					<Typography variant="body2" component="p" style={{ textAlign: 'center' }}>
						{t('deleteModal.message')}
					</Typography>
				</Box>
				<Box display="flex" className={classes.actions}>
					<Button
						onClick={onConfirm}
						startIcon={<Delete style={{ color: '#B51200' }} />}
						variant="outlined"
						style={{
							marginRight: 16,
							border: '1px solid #B51200',
							color: '#B51200',
							fontWeight: 'bold'
						}}
					>
						{t('generalButtons.delete')}
					</Button>
					<Button
						onClick={onClose}
						startIcon={<Close style={{ color: '#fff' }} />}
						variant="contained"
						color="primary"
						style={{ fontWeight: 'bold' }}
					>
						{t('generalButtons.cancel')}
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default ModalConfirm;
