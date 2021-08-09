import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, Redirect } from 'react-router-dom';
import CustomInput from '../../../common/CustomInput';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { GoogleOutlined } from '@ant-design/icons';
import { handleLogin } from '../../../redux/actions/auth';
import { toast, ToastContainer } from 'react-toastify';
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is not valid.')
    .required('Email is required.'),
  password: Yup.string().required('Password is required.')
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isOAuth } = useSelector(state => state.auth);
  const { from } = location.state || { from: { pathname: '/' } };

  if (isOAuth) {
    return <Redirect to={from} />;
  }

  const onSubmitForm = ({ email, password }) => {
    dispatch(
      handleLogin({ email, password }, ({ error, message }) => {
        if (error) {
          toast.error('Login Falied');
        }
      })
    );
  };
  return (
    <>
      <div
        className='loginWrapper'
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dbdb4punq/image/upload/v1622672234/test/bg_login_zvratx.jpg)`
        }}
      >
        <div className='loginContentWrapper'>
          <div className='loginContent'>
            <div className='loginContentLeft'>
              <div className='card-logo'>
                <Link to='/'>
                  <h1>
                    NTP <span className='text-title '>-SHOP</span>
                  </h1>
                </Link>
              </div>
              <div className='logo'>
                <img
                  src={
                    'https://res.cloudinary.com/dbdb4punq/image/upload/v1622672234/test/login_hx32zj.jpg'
                  }
                  alt='logo'
                />
              </div>
              <div className='account-register'>
                <span>Don’t have an account ? </span>
                <Link to='/register'>Sign up</Link>
              </div>
            </div>

            <div className='loginContentRight'>
              <div className='card-header'>
                <div className='card-title'>
                  <h4>Login</h4>
                </div>
              </div>
              <div className='loginForm'>
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  validateOnChange
                  validationSchema={LoginSchema}
                  onSubmit={onSubmitForm}
                >
                  <Form>
                    <div className='auth-field'>
                      <Field
                        // disabled={}
                        name='email'
                        type='email'
                        label='Email'
                        placeholder='test@example.com'
                        component={CustomInput}
                      />
                    </div>
                    <div className='auth-field'>
                      <Field
                        // disabled={}
                        name='password'
                        type='password'
                        label='Password'
                        placeholder='Your Password'
                        component={CustomInput}
                      />
                    </div>
                    <br />
                    <div className='auth-field'>
                      <Link
                        // onClick={onClickLink}
                        style={{ textDecoration: 'underline' }}
                        to={'/forgot-password'}
                      >
                        <span>Forgot password?</span>
                      </Link>
                      <button
                        className='button auth-button'
                        // disabled={}
                        type='submit'
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                </Formik>
                <button
                  className='button provider-google'
                  onClick={() => {
                    window.open('http://localhost:5000/google', '_self');
                  }}
                  type='button'
                >
                  <GoogleOutlined />
                  Continue with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
