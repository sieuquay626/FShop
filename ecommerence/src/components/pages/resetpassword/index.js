import { Field, Form, Formik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import CustomInput from '../../../common/CustomInput';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { reset_password_api } from '../../../api/auth';
import { useParams } from 'react-router-dom';

toast.configure();

const ResetPasswordPage = ({ match }) => {
  const { reset_token } = useParams();

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .required('Password is required.'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password')], "Password's not match")
      .required('Confirm Password is required.')
  });

  const onSubmitForm = async form => {
    try {
      reset_password_api({ password: form, reset_token })
        .then(res => {
          console.log(res);
        }) // history.push('/login');
        .catch(err => {
          toast.error(err.response.data.msg);
        });
    } catch (error) {
      toast.error(error.response.data.error);
      // setTimeout(() => {
      //   setError('');
      // }, 5000);
    }
  };

  return (
    <div className='content'>
      <div className='reset-password'>
        <h1>Reset Password</h1>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: ''
          }}
          validateOnChange
          validationSchema={ResetPasswordSchema}
          onSubmit={onSubmitForm}
        >
          <Form>
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
            <button className='button btn-change-password' type='submit'>
              Change Password
            </button>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordPage;
