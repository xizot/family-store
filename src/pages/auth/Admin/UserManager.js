import { useLayoutEffect } from 'react';
import { AdminTemplate } from '../../../components/Templates/Admin/AdminTemplate';

const UserManager = (props) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <AdminTemplate>This is user manager page</AdminTemplate>;
};

export default UserManager;
