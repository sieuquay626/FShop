import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ClientRoute = ({ component: Component, ...rest }) => {
  let location = useLocation();
  const { isOAuth } = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      component={props =>
        isOAuth ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  );
};

export default ClientRoute;
