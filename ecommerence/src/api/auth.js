import axiosInstance from '../utils/axios';
const login_api = data => {
  const { email, password } = data;
  return axiosInstance.post(
    '/user/login/',
    {
      email,
      password
    },
    {
      withCredentials: true,
      crossorigin: true
    }
  );
};
const google_api = () => {
  return axiosInstance.get('/google');
};
const get_profile_api = () => {
  return axiosInstance.get('/user/getuser', {
    withCredentials: true,
    crossorigin: true
  });
};
const forgot_password_api = data => {
  const { email } = data;
  return axiosInstance.post('/user/forgotpassword', {
    email: email
  });
};

const update_profile = data => {
  const { id, name, address, mobile, avatar, role } = data;
  return axiosInstance.put(`/user/profile/${id}`, {
    name,
    address,
    mobile,
    avatar,
    role
  });
};

const change_password = data => {
  const { id, password } = data;
  return axiosInstance.put(`/user/changepassword`, {
    id,
    password
  });
};
const reset_password_api = data => {
  const { password, reset_token } = data;
  return axiosInstance.put(`/user/resetpassword/${reset_token}`, {
    password
  });
};

const logout_api = () => {
  return axiosInstance.get('/logout', {
    withCredentials: true,
    crossorigin: true
  });
};

const register_api = data => {
  return axiosInstance.post('/user/register', {
    ...data
  });
};

const list_user_api = () => {
  return axiosInstance.get('/user/list_user', {
    withCredentials: true,
    crossorigin: true
  });
};
const get_user_api = ({ id }) => {
  return axiosInstance.get(`/user/${id}`, {
    withCredentials: true,
    crossorigin: true
  });
};

const delete_user_api = id => {
  return axiosInstance.delete(`/user/${id}`, {
    withCredentials: true,
    crossorigin: true
  });
};

export {
  get_profile_api,
  login_api,
  register_api,
  google_api,
  logout_api,
  forgot_password_api,
  reset_password_api,
  update_profile,
  change_password,
  list_user_api,
  get_user_api,
  delete_user_api
};
