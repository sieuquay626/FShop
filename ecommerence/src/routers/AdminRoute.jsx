import { lazy } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Topbar = lazy(() => import('../components/elements/TopbarAdmin'));
const Sidebar = lazy(() => import('../components/elements/SidebarAdmin'));
const AdminRoute = ({ component: Component, ...rest }) => {
  let location = useLocation();
  const { isOAuth, user } = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      component={props =>
        isOAuth && user.role === 'ADMIN' ? (
          <>
            <Topbar />
            <div className='admin'>
              <Sidebar />
              <Component {...props} />
            </div>
          </>
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  );
};

export default AdminRoute;
