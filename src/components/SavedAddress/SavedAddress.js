import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Validate } from '../../helpers';
import { useInput } from '../../hooks/use-input';
import { getListDistrict, getListWard } from '../../reducers/address.reducer';
import { userGetListDelivery } from '../../reducers/delivery.reducer';
import { useTranslation } from 'react-i18next';

function SavedAddress({
  selectedAddress,
  isSaveNewAddress,
  onCityChange,
  onDistrictChange,
  onWardChange,
  onSaveAddressChange,
  onStreetChange,
  onCityChangeV2,
  onDistrictChangeV2,
  wardChangeHandlerV2,
  onWardChangeV2,
  onStreetChangeV2,
  onResetAddress,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cities = useSelector((state) => state.address.cities);
  const districts = useSelector((state) => state.address.districts);
  const wards = useSelector((state) => state.address.wards);
  const [listDelivery, setListDelivery] = useState([]);

  const {
    enteredInput: streetEntered,
    hasError: streetHasError,
    inputBlurHandler: streetBlurHandler,
    // inputIsValid: streetIsValid,
    // inputReset: streetReset,
  } = useInput(Validate.isNotEmpty, selectedAddress.street || '');
	const { t } = useTranslation();
  const inputStreetChangeHandler = (e) => {
    onStreetChange(e);
  };

  const currentDeliveryChangeHandler = async (e) => {
    onResetAddress();
    if (e.target.value.length > 0) {
      const deliveryInfo = e.target.value.split('@@');
      const cityId = +deliveryInfo[0];
      const districtId = +deliveryInfo[1];
      const wardId = +deliveryInfo[2];
      const street = deliveryInfo[3];

      try {
        const responseDistrict = await dispatch(getListDistrict({ cityId })).unwrap();
        const responseWard = await dispatch(getListWard({ cityId, districtId })).unwrap();

        const currentCIty = cities.find((item) => item.ci_id === cityId);

        const currentDistrict = responseDistrict.listDistricts.find(
          (item) => item.dis_id === districtId
        );
        const currentWard = responseWard.listcities.find((item) => item.ward_id === wardId);

        onCityChangeV2(currentCIty);
        onDistrictChangeV2(currentDistrict);
        onWardChangeV2(currentWard);
        onStreetChangeV2(street || '');
      } catch (error) {}
    } else {
      onCityChangeV2(null);
      onDistrictChangeV2(null);
      onWardChangeV2(null);
    }
  };

  useEffect(() => {
    const getListDelivery = async () => {
      try {
        const response = await dispatch(userGetListDelivery({ accId: user.accId })).unwrap();
        setListDelivery(response.listDeliveries);
      } catch (error) {
        console.log('🚀 ~ file: SavedAddress.js ~ line 19 ~ getListDelivery ~ error', error);
      }
    };
    getListDelivery();
  }, [dispatch, user.accId]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <FormControl variant="filled" fullWidth size="small">
                <InputLabel htmlFor="selectSaved">{t("generalButtons.savedAddress")}</InputLabel>
                <Select
                  native
                  onChange={currentDeliveryChangeHandler}
                  label={t("generalButtons.savedAddress")}
                  inputProps={{
                    name: 'save-address',
                    id: 'selectSaved',
                  }}>
                  <option aria-label="None" value="" />
                  {listDelivery.length > 0 &&
                    listDelivery.map((item, index) => (
                      <option
                        value={`${item.del_city_id}@@${item.del_district_id}@@${item.del_ward_id}@@${item.del_detail_address}`}
                        key={
                          index
                        }>{`${item.del_detail_address},${item.dis_name},${item.ci_name}`}</option>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {selectedAddress.city === null ||
        selectedAddress.district === null ||
        selectedAddress.ward === null ? (
          <></>
        ) : (
          <>
            {' '}
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
                  <TextField size="small" {...params} label="Tên tỉnh thành" variant="filled" />
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
                  <TextField size="small" {...params} label="Tên Quận/Huyện" variant="filled" />
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
                  <TextField size="small" {...params} label="Tên Phường/Xã" variant="filled" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <TextField
                  size="small"
                  label="Số nhà, tên đường"
                  variant="filled"
                  fullWidth
                  value={streetEntered}
                  onBlur={streetBlurHandler}
                  onChange={inputStreetChangeHandler}
                />
                {streetHasError && (
                  <FormHelperText error>Số nhà, tên đường không hợp lệ</FormHelperText>
                )}
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}

export default SavedAddress;
