import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loader from '../components/elements/loader';

import { history } from '../navigation';
import AdminRoute from './AdminRoute';
import ClientRoute from './ClientRoute';
import { handleAuth } from '../redux/actions/auth';
import { useDispatch } from 'react-redux';

const HomePage = lazy(() => import('../components/pages/home'));
const LoginPage = lazy(() => import('../components/pages/login'));
const RegisterPage = lazy(() => import('../components/pages/register'));
const ForgotPage = lazy(() => import('../components/pages/forgot'));
const ResetPasswordPage = lazy(() =>
  import('../components/pages/resetpassword')
);
const DetailProductPage = lazy(() =>
  import('../components/pages/detailproduct')
);
const AccountSettingPage = lazy(() =>
  import('../components/pages/accountsetting/UserAccountTab')
);
const AccountEditSettingPage = lazy(() =>
  import('../components/pages/accountsetting/EditAccount')
);
const AccountOderSettingPage = lazy(() =>
  import('../components/pages/accountsetting/UserOrdersTab')
);
const AccountTrackOrderSettingPage = lazy(() =>
  import('../components/pages/accountsetting/TrackOrder')
);
const OrderSummary = lazy(() => import('../components/pages/checkout/step1'));
const ShippingDetails = lazy(() =>
  import('../components/pages/checkout/step2')
);
const Payment = lazy(() => import('../components/pages/checkout/step3'));
const DashBoardPage = lazy(() => import('../components/pages/Admin/dashboard'));
const UserAdminPage = lazy(() => import('../components/pages/Admin/user'));
const AdminEditUserPage = lazy(() =>
  import('../components/pages/Admin/edituser')
);
const AdminCreateUserPage = lazy(() =>
  import('../components/pages/Admin/createuser')
);

const CategoryAdminPage = lazy(() =>
  import('../components/pages/Admin/category')
);

const BrandAdminPage = lazy(() => import('../components/pages/Admin/brand'));
const ProductAdminPage = lazy(() =>
  import('../components/pages/Admin/product')
);
const AdminEditProductPage = lazy(() =>
  import('../components/pages/Admin/eidtproduct')
);
const AdminCreateProductPage = lazy(() =>
  import('../components/pages/Admin/createproduct')
);

const OrderAdminPage = lazy(() => import('../components/pages/Admin/order'));
const EditOrderAdminPage = lazy(() =>
  import('../components/pages/Admin/editorder')
);

const PageNotFound = lazy(() => import('../components/pages/pagenotfound'));

const AppRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleAuth());
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <Router history={history}>
        <Switch>
          <Route exact path={'/'} component={HomePage} />
          <Route exact path={'/login'} component={LoginPage} />
          <Route exact path={'/register'} component={RegisterPage} />
          <Route exact path={'/forgot-password'} component={ForgotPage} />
          <Route
            exact
            path={'/reset-password/:reset_token'}
            component={ResetPasswordPage}
          />
          <Route
            exact
            path={'/collections/:id'}
            component={DetailProductPage}
          />
          <ClientRoute
            component={AccountTrackOrderSettingPage}
            path='/account/orders/:orderId'
          />
          <ClientRoute
            component={AccountOderSettingPage}
            path='/account/orders'
          />
          <ClientRoute
            component={AccountEditSettingPage}
            path='/account/edit'
          />
          <ClientRoute component={AccountSettingPage} path='/account' />

          <ClientRoute component={OrderSummary} path='/checkout/step1' />
          <ClientRoute component={ShippingDetails} path='/checkout/step2' />
          <ClientRoute component={Payment} path='/checkout/step3' />
          <AdminRoute path='/admin/dashboard' component={DashBoardPage} />
          <AdminRoute path='/admin/users/:id' component={AdminEditUserPage} />
          <AdminRoute path='/admin/users' component={UserAdminPage} />
          <AdminRoute
            path='/admin/create-user'
            component={AdminCreateUserPage}
          />
          <AdminRoute path='/admin/categories' component={CategoryAdminPage} />
          <AdminRoute path='/admin/brands' component={BrandAdminPage} />
          <AdminRoute
            path='/admin/products/:id'
            component={AdminEditProductPage}
          />
          <AdminRoute
            path='/admin/create-product'
            component={AdminCreateProductPage}
          />
          <AdminRoute path='/admin/products' component={ProductAdminPage} />

          <AdminRoute path='/admin/orders/:id' component={EditOrderAdminPage} />
          <AdminRoute path='/admin/orders' component={OrderAdminPage} />
          <Route path={'/:wrongpath'} component={PageNotFound} />
          {/* 
          
          
          
          
          
          

          
          
          <AdminRoute path='/admin/user/:id' component={EditUserAdminPage} />
          
          <AdminRoute path='/admin/products' component={ProductAdminPage} />
          <AdminRoute
            path='/admin/product/:id'
            component={EditProductAdminPage}
          />
          <AdminRoute
            path='/admin/create-product'
            component={CreateProductAdminPage}
          />
         
         */}
        </Switch>
      </Router>
    </Suspense>
  );
};

export default AppRouter;
