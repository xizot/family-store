import { useLayoutEffect } from 'react';

const Dashboard = (props) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <>Dashboard</>;
};

export default Dashboard;
