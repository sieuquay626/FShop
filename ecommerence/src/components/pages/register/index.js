import { register_api } from '../../../api/auth';
import { Link, useLocation, Redirect, useHistory } from 'react-router-dom';
import CustomInput from '../../../common/CustomInput';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { GoogleOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is not valid.')
    .required('Email is required.'),
  name: Yup.string()
    .min(2, 'Mininum 2 characters')
    .max(15, 'Maximum 15 characters')
    .required('Name is required.'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .required('Password is required.'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password')], "Password's not match")
    .required('Confirm Password is required.')
});

const RegisterPage = () => {
  const location = useLocation();
  const history = useHistory();
  let isOAuth = false;

  const { from } = location.state || { from: { pathname: '/' } };

  if (isOAuth) {
    return <Redirect to={from} />;
  }

  const onSubmitForm = form => {
    const { name, email, password } = form;
    register_api({ name, email, password })
      .then(res => history.push('/login'))
      .catch(err => {
        toast.error(err.response.data.msg);
      });
  };
  return (
    <>
      <ToastContainer />
      <div
        className='loginWrapper'
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dbdb4punq/image/upload/v1622672234/test/bg_login_zvratx.jpg)`
        }}
      >
        <div className='loginContentWrapper'>
          <div className='loginContent'>
            <div className='loginContentLeft'>
              <div className='logo'>
                <div className='card-logo'>
                  <Link to='/'>
                    <h1>
                      NTP <span className='text-title '>-SHOP</span>
                    </h1>
                  </Link>
                </div>

                <img
                  src={
                    'https://res.cloudinary.com/dbdb4punq/image/upload/v1622672234/test/login_hx32zj.jpg'
                  }
                  alt='logo'
                />
              </div>
              <div className='account-register'>
                <span>Already have an account?</span>
                <Link to='/login'>Sign In</Link>
              </div>
            </div>

            <div className='loginContentRight'>
              <div className='card-header'>
                <div className='card-title'>
                  <h4>Register</h4>
                </div>
              </div>
              <div className='loginForm'>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    name: ''
                  }}
                  validateOnChange
                  validationSchema={RegisterSchema}
                  onSubmit={onSubmitForm}
                >
                  <Form>
                    <div className='auth-field'>
                      <Field
                        // disabled={}
                        name='name'
                        type='text'
                        label='Name'
                        placeholder='Hennry'
                        // style={{ textTransform: 'capitalize' }}
                        component={CustomInput}
                      />
                    </div>
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
                    <div className='auth-field'>
                      <Field
                        name='confirmpassword'
                        type='password'
                        label='Confirm Password'
                        placeholder='Confirm Your Password'
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
                        Register
                      </button>

                      <button
                        className='button provider-google'
                        // onClick={}
                        type='button'
                      >
                        <GoogleOutlined />
                        Continue with Google
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
