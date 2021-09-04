import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
];
function NewAddress() {
  const [isSaveNewAddress, setIsSaveNewAddresss] = useState(true);

  const isSaveNewAddressChangeHandler = (event) => {
    setIsSaveNewAddresss(event.target.checked);
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Autocomplete
            options={top100Films}
            getOptionLabel={(option) => option.title}
            fullWidth
            size="small"
            renderInput={(params) => (
              <TextField size="small" {...params} label="Tên tỉnh thành" variant="filled" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Autocomplete
            options={top100Films}
            getOptionLabel={(option) => option.title}
            fullWidth
            size="small"
            renderInput={(params) => (
              <TextField size="small" {...params} label="Tên Quận/Huyện" variant="filled" />
            )}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Autocomplete
            options={top100Films}
            getOptionLabel={(option) => option.title}
            fullWidth
            size="small"
            renderInput={(params) => (
              <TextField size="small" {...params} label="Tên Phường/Xã" variant="filled" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField size="small" label="Số nhà, tên đường" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} style={{ padding: '0 8px' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isSaveNewAddress}
                onChange={isSaveNewAddressChangeHandler}
                name="checkedB"
                color="primary"
              />
            }
            label="Lưu địa chỉ"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default NewAddress;
