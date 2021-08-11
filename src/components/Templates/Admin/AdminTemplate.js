import HeaderAdmin from '../../Layout/HeaderAdmin';
import SideBar from '../../SideBar/SideBar';

export const AdminTemplate = ({ children }) => {
  return (
    <>
      <HeaderAdmin />
      <SideBar />
      {children}
    </>
  );
};
