import { useEffect, useLayoutEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import useStyles from './UserManager.styles';
import SearchInputV2 from '../../../../components/UI/SearchInputV2';
import { useDispatch, useSelector } from 'react-redux';
import { getList, updateRole } from '../../../../reducers/admin-account.reducer';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { Add, Delete, Edit } from '@material-ui/icons';
import TableLoading from '../../../../components/TableLoading/TableLoading';
import TableError from '../../../../components/TableError/TableError';

const UserManager = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [listAccount, setListAccount] = useState([]);
  const loading = useSelector((state) => state.adminAccount.loading);
  // const modify = useSelector((state) => state.adminAccount.modify);
  const [error, setError] = useState('');

  const searchChangeHandler = (value) => {
    setSearch(value);
  };

  const roleChangeHandler = async (e, accId) => {
    try {
      dispatch(
        updateRole({
          accRole: e.target.value === 'Admin' ? 'ADM' : 'USER',
          accId,
        })
      );
      setListAccount((prevValue) =>
        prevValue.map((item) =>
          item.accId === accId ? { ...item, accRole: e.target.value } : item
        )
      );
      toast.success(`Update role for id: ${accId} successfully`);
    } catch (error) {
      toast.error(`Update role for id: ${accId} failed`);
    }
  };

  const pageChangeHandler = (event, newPage) => {
    setPage(newPage);
    getListUserHandler(newPage + 1, limit);
  };

  const limitPerPageChangeHandler = (event) => {
    const newLimit = +event.target.value;
    setLimit(newLimit);
    setPage(0);
    getListUserHandler(1, newLimit);
  };

  const getListUserHandler = useCallback(
    async (page, limit) => {
      try {
        const response = await dispatch(getList({ page: page === 0 ? 1 : page, limit })).unwrap();
        setListAccount(response.listAccounts);
        setTotalPage(response.totalPage);
        console.log(
          '🚀 ~ file: UserManager.js ~ line 29 ~ getListUserHandler ~ response',
          response
        );
      } catch (error) {
        console.log('err', error);
        setError(error);
      }
    },
    [dispatch]
  );

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getListUserHandler(1, 10);
  }, [getListUserHandler]);

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Typography variant="h5" className={classes.title}>
          USER MANAGER
        </Typography>
        <Box className={classes.filter}>
          <Box className={classes.filterItem}>
            <SearchInputV2
              border
              placeholder="Tìm kiếm tên người dùng"
              initialValue={search}
              onChange={searchChangeHandler}
            />
          </Box>
          <Button variant="contained" color="primary" className={classes.filterItem}>
            <Add />
            Add New Account
          </Button>
        </Box>
        <Paper className={classes.root}>
          {loading ? (
            <TableLoading />
          ) : error.length > 0 ? (
            <TableError message={error} onTryAgain={getListUserHandler.bind(null, page, limit)} />
          ) : listAccount && listAccount.length > 0 ? (
            <>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold' }}>#</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Full name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listAccount
                      .filter((account) =>
                        account.accFullName?.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((account, index) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                          <TableCell style={{ fontWeight: 'bold' }}>{index + 1}</TableCell>
                          <TableCell>{account.accId}</TableCell>
                          <TableCell>{account.accFullName}</TableCell>
                          <TableCell>{account.accEmail}</TableCell>
                          <TableCell>{account.accPhoneNumber}</TableCell>
                          <TableCell>
                            <Select
                              native
                              value={account.accRole}
                              onChange={(e) => roleChangeHandler(e, account.accId)}
                              inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                              }}>
                              <option value="User">User</option>
                              <option value="Admin">Admin</option>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Box display="flex">
                              <Edit className={classes.actionIcon} />
                              <Delete className={classes.actionIcon} />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={totalPage * limit}
                rowsPerPage={limit}
                page={page}
                onPageChange={pageChangeHandler}
                onRowsPerPageChange={limitPerPageChangeHandler}
              />
            </>
          ) : (
            <TableError
              message="No data available in database"
              onTryAgain={getListUserHandler.bind(null, page, limit)}
            />
          )}
        </Paper>
      </div>
    </div>
  );
};

export default UserManager;
