import React from 'react';
import './style.scss';
import * as Icon from 'react-feather';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../../redux/actions/auth';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const HeaderUserInfor = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const logout = () => {
    dispatch(handleLogout());
  };
  const accountSetting = () => {
    // toast('Wow so easy !');
    console.log('accountSetting');
    history.push('/account');
  };
  let history = useHistory();
  // const notify = () => toast('Wow so easy !');
  return (
    <>
      <div className='user-info-box'>
        <div className='user-name'>{auth.user.profile.name}</div>
      </div>
      <div className='user-avatar-box'>
        <div className='user-avatar'>
          <img
            src={auth.user.profile.avatar}
            className='img-avatar'
            alt='icon-user'
          />
          <ul className='list-user-item'>
            {auth.user.role == 'ADMIN' && (
              <li
                className='user-item'
                onClick={() => history.push('/admin/dashboard')}
              >
                <div className='item'>DashBoard</div>
                <Icon.Airplay />
              </li>
            )}
            <li className='user-item' onClick={accountSetting}>
              <div className='item'>Account Setting</div>
              <Icon.Settings />
            </li>

            <li className='user-item' onClick={logout}>
              <div className='item'>Sign out</div>
              <Icon.LogOut />
            </li>
          </ul>
        </div>
        {/* <ToastContainer /> */}
      </div>
    </>
  );
};

export default HeaderUserInfor;
/*



*/
