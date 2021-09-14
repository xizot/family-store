import React from 'react';
import { Checkbox, FormControlLabel, FormHelperText, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { useInput } from '../../hooks/use-input';
import { Validate } from '../../helpers';
import { useTranslation } from 'react-i18next';

function NewAddress({
	selectedAddress,
	isSaveNewAddress,
	onCityChange,
	onDistrictChange,
	onWardChange,
	onSaveAddressChange,
	onStreetChange
}) {
	const cities = useSelector((state) => state.address.cities);
	const districts = useSelector((state) => state.address.districts);
	const wards = useSelector((state) => state.address.wards);
	const {
		enteredInput: streetEntered,
		hasError: streetHasError,
		inputBlurHandler: streetBlurHandler
		// inputIsValid: streetIsValid,
		// inputReset: streetReset,
	} = useInput(Validate.isNotEmpty, selectedAddress.street || '');

	const { t } = useTranslation();
	const inputStreetChangeHandler = (e) => {
		onStreetChange(e);
	};

	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} md={6} lg={4}>
					<Autocomplete
						value={selectedAddress.city || null}
						onChange={onCityChange}
						options={cities}
						getOptionSelected={(option, value) => option.ci_id === value.ci_id}
						getOptionLabel={(city) => city.ci_name}
						fullWidth
						size="small"
						renderInput={(params) => (
							<TextField
								size="small"
								{...params}
								label={t('checkoutPage.address.form.cityPlaceHolder')}
								variant="filled"
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={6} lg={4}>
					<Autocomplete
						value={selectedAddress.district || null}
						onChange={onDistrictChange}
						options={districts}
						getOptionSelected={(option, value) => option.dis_id === value.dis_id}
						getOptionLabel={(district) => district.dis_name}
						fullWidth
						size="small"
						renderInput={(params) => (
							<TextField
								size="small"
								{...params}
								label={t('checkoutPage.address.form.districtPlaceHolder')}
								variant="filled"
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} lg={4}>
					<Autocomplete
						value={selectedAddress.ward || null}
						onChange={onWardChange}
						options={wards}
						getOptionSelected={(option, value) => option.ward_id === value.ward_id}
						getOptionLabel={(ward) => ward.ward_name}
						fullWidth
						size="small"
						renderInput={(params) => (
							<TextField
								size="small"
								{...params}
								label={t('checkoutPage.address.form.wardPlaceHolder')}
								variant="filled"
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<div>
						<TextField
							size="small"
							label={t('checkoutPage.address.form.streetPlaceHolder')}
							variant="filled"
							fullWidth
							value={streetEntered}
							onBlur={streetBlurHandler}
							onChange={inputStreetChangeHandler}
						/>
						{streetHasError && <FormHelperText error>Số nhà, tên đường không hợp lệ</FormHelperText>}
					</div>
				</Grid>
				<Grid item xs={12} style={{ padding: '0 8px' }}>
					<FormControlLabel
						control={
							<Checkbox
								checked={isSaveNewAddress}
								onChange={onSaveAddressChange}
								name="checkedB"
								color="primary"
							/>
						}
						label={t("generalButtons.saveAddress")}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default NewAddress;
