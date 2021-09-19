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
  TableRow,
  Typography,
} from '@material-ui/core';
import useStyles from './UserManager.styles';
import SearchInputV2 from '../../../../components/UI/SearchInputV2';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAccount,
  getList,
  updateRole,
  updateStatus,
} from '../../../../reducers/admin-account.reducer';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { Add, Delete, Edit } from '@material-ui/icons';
import TableLoading from '../../../../components/TableLoading/TableLoading';
import TableError from '../../../../components/TableError/TableError';
import AddUser from '../../../../components/AddUser/AddUser';
import ModalConfirm from '../../../../components/ModalConfirm/ModalConfirm';
import UpdateUser from '../../../../components/UpdateUser/UpdateUser';
import CustomTablePagination from '../../../../components/CustomTablePagination/CustomTablePagination';
import { useTranslation } from 'react-i18next';

const UserManager = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [listAccount, setListAccount] = useState([]);
  const loading = useSelector((state) => state.adminAccount.loading);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const closeModalHandler = () => {
    setIsOpenUpdateModal(false);
    setIsOpenAddModal(false);
    setIsOpenDeleteModal(false);
    setSelectedId(null);
  };

  const addAccountSuccessHandler = () => {
    closeModalHandler();
    setPage(0);
    getListUserHandler(0, limit);
  };

  const openAddModalHandler = () => {
    setIsOpenAddModal(true);
  };
  const openDeleteModalHandler = (e, accId) => {
    e.stopPropagation();
    setSelectedId(accId);
    setIsOpenDeleteModal(true);
  };

  const openUpdateModalHandler = (accId) => {
    setSelectedId(accId);
    setIsOpenUpdateModal(true);
  };

  const deleteAccountHandler = async () => {
    try {
      await dispatch(deleteAccount({ accId: selectedId })).unwrap();
      getListUserHandler(page, limit);
      // toast.success(`Delete account id: [${selectedId}] successfully`);
      toast.success(t('toastMessages.admin.user.deleteSuccess'));
      closeModalHandler();
    } catch (error) {
      toast.error(error);
    }
  };

  // const modify = useSelector((state) => state.adminAccount.modify);
  const [error, setError] = useState('');

  const searchChangeHandler = (value) => {
    setSearch(value);
  };

  const roleChangeHandler = async (e, accId) => {
    e.stopPropagation();
    const newRole = e.target.value;
    const formatRole = e.target.value === 'Admin' ? 'ADM' : 'USER';
    try {
      await dispatch(
        updateRole({
          accRole: formatRole,
          accId,
        })
      ).unwrap();
      setListAccount((prevValue) =>
        prevValue.map((item) => (+item.accId === +accId ? { ...item, accRole: newRole } : item))
      );
      // toast.success(`Update [ROLE] for id: [${accId}] > ${newRole}`);
      toast.success(t('toastMessages.admin.user.updateRoleSuccess') + `${accId} > ${newRole}`);
    } catch (error) {
      // toast.error(`Update [ROLE] for id: [${accId}] failed`);
      toast.error(t('toastMessages.admin.user.updateRoleFail') + ` ${accId}`);
    }
  };

  const statusChangeHandler = async (e, accId) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    try {
      await dispatch(
        updateStatus({
          accStatus: +newStatus,
          accId,
        })
      ).unwrap();
      setListAccount((prevValue) =>
        prevValue.map((item) => (item.accId === accId ? { ...item, accStatus: newStatus } : item))
      );
      // toast.success(`Update [STATUS] for id: [${accId}] successfully`);
      toast.success(t('toastMessages.admin.user.updateStatusSuccess') + `${accId}`);
    } catch (error) {
      // toast.error(`Update [STATUS] for id: [${accId}] failed`);
      toast.error(t('toastMessages.admin.user.updateStatusFail') + `${accId}`);
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

  useEffect(() => {
    document.title = t('pagesTitle.admin.user');
  }, [t]);

  return (
    <div className={classes.root}>
      <AddUser
        isOpen={isOpenAddModal}
        onClose={closeModalHandler}
        onSuccess={addAccountSuccessHandler}
      />

      <UpdateUser
        isOpen={isOpenUpdateModal}
        onClose={closeModalHandler}
        opUpdateSuccess={addAccountSuccessHandler}
        accId={selectedId}
      />
      <ModalConfirm
        isOpen={isOpenDeleteModal}
        onConfirm={deleteAccountHandler}
        onClose={closeModalHandler}
        title={t('deleteModal.user')}
      />
      <div className={classes.section}>
        <Typography variant="h5" className={classes.title}>
          {t('adminPage.user.title')}
        </Typography>
        <Box className={classes.filter}>
          <Box className={classes.filterItem}>
            <SearchInputV2
              border
              placeholder={t('adminPage.user.searchPlaceHolder')}
              initialValue={search}
              onChange={searchChangeHandler}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            className={classes.filterItem}
            onClick={openAddModalHandler}>
            <Add />
            {t('generalButtons.add')}
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
                      <TableCell>{t('adminPage.user.table.id')}</TableCell>
                      <TableCell>{t('adminPage.user.table.fullName')}</TableCell>
                      <TableCell>{t('adminPage.user.table.email')}</TableCell>
                      <TableCell>{t('adminPage.user.table.phoneNumber')}</TableCell>
                      <TableCell style={{ minWidth: 80, textAlign: 'center' }}>
                        {t('adminPage.user.table.role')}
                      </TableCell>
                      <TableCell style={{ minWidth: 80, textAlign: 'center' }}>
                        {t('adminPage.user.table.status')}
                      </TableCell>
                      <TableCell>{t('generalTable.options')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listAccount
                      .filter(
                        (account) =>
                          account.accFullName?.toLowerCase().includes(search.toLowerCase()) ||
                          (account.accFullName === null && search.length === 0)
                      )
                      .map((account, index) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                          className={classes.tableRow}
                          onClick={() => openUpdateModalHandler(account.accId)}>
                          <TableCell style={{ fontWeight: 'bold' }}>
                            {page * limit + index + 1}
                          </TableCell>
                          <TableCell>{account.accId}</TableCell>
                          <TableCell>
                            <Box className={classes.longText}>{account.accFullName}</Box>
                          </TableCell>
                          <TableCell>{account.accEmail}</TableCell>
                          <TableCell>{account.accPhoneNumber}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <Select
                              native
                              value={account.accRole}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => roleChangeHandler(e, account.accId)}>
                              <option value="User">User</option>
                              <option value="Admin">Admin</option>
                            </Select>
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <Select
                              native
                              value={account.accStatus}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => statusChangeHandler(e, account.accId)}>
                              <option value={0}>Active</option>
                              <option value={1}>Blocked</option>
                              <option value={2}>Not Active</option>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Box display="flex">
                              <Edit
                                className={classes.actionIcon}
                                onClick={() => openUpdateModalHandler(account.accId)}
                              />
                              <Delete
                                className={classes.actionIcon}
                                onClick={(e) => openDeleteModalHandler(e, account.accId)}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <CustomTablePagination
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
              message={t('generalTable.emptyData')}
              onTryAgain={getListUserHandler.bind(null, page, limit)}
            />
          )}
        </Paper>
      </div>
    </div>
  );
};

export default UserManager;
