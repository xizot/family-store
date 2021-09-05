import { FormControl, Grid, InputLabel, Select, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
];
function SavedAddress() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <FormControl variant="filled" fullWidth size="small">
                <InputLabel htmlFor="selectSaved">Địa chỉ đã lưu</InputLabel>
                <Select
                  native
                  // value={state.age}
                  // onChange={handleChange}

                  label="Địa chỉ đã lưu"
                  inputProps={{
                    name: 'save-address',
                    id: 'selectSaved',
                  }}>
                  <option aria-label="None" value="" />
                  <option>Ten</option>
                  <option>Twenty</option>
                  <option>Thirty</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Autocomplete
            options={top100Films}
            getOptionLabel={(option) => option.title}
            fullWidth
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Tên tỉnh thành" variant="filled" />
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
              <TextField {...params} label="Tên Quận/Huyện" variant="filled" />
            )}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Autocomplete
            size="small"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Tên Phường/Xã" variant="filled" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField size="small" label="Số nhà, tên đường" variant="filled" fullWidth />
        </Grid>
      </Grid>
    </div>
  );
}

export default SavedAddress;
