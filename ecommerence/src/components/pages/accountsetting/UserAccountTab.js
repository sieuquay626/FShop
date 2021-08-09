import ImageLoader from '../../../common/ImageLoader';
import Header from '../../elements/Header';
import { displayDate } from '../../../utils/hepler';
import { useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import CustomInput from '../../../common/CustomInput';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { change_password } from '../../../api/auth';
import { get } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import Footer from '../../elements/Footer';
const UserProfile = props => {
  const user = useSelector(state => state.auth.user);
  const history = useHistory();
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
      const { password, confirmpassword } = form;
      console.log({ id: user._id, password });
      change_password({ id: user._id, password }).then(res => {
        console.log(res);
        toast.success(res.data.msg);
      });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    // <h2>UserAccountTab</h2>
    <>
      <Header />
      <div className='content-account'>
        <div className='user-tab'>
          <div className='user-tab-nav'>
            <ul className='user-tab-menu'>
              <li
                className={`user-tab-item user-tab-active`}
                onClick={() => history.push('/account')}
              >
                My Account
              </li>
              <li
                className={`user-tab-item `}
                onClick={() => history.push('/account/orders')}
              >
                My Order
              </li>
            </ul>
          </div>
          <div className='user-tab-content'>
            <div className='user-profile'>
              <div className='user-profile-block'>
                <div className='user-profile-banner'>
                  <div className='user-profile-banner-wrapper'>
                    <ImageLoader
                      alt='Banner'
                      className='user-profile-banner-img'
                      src={get(
                        user,
                        'banner',
                        'https://res.cloudinary.com/dbdb4punq/image/upload/v1626604277/test/BG-2_cmsaoc.png'
                      )}
                    />
                  </div>
                  <div className='user-profile-avatar-wrapper'>
                    <ImageLoader
                      alt='Avatar'
                      className='user-profile-img'
                      src={get(user, 'profile.avatar')}
                    />
                  </div>
                  <button
                    className='button button-small user-profile-edit'
                    onClick={() => props.history.push('/account/edit')}
                    type='button'
                  >
                    Edit Account
                  </button>
                </div>
                <div className='user-profile-details'>
                  <div className='account-profile'>
                    <h2 className='user-profile-name'>
                      {get(user, 'profile.name')}
                    </h2>
                    <div className='field'>
                      <span>Email</span>

                      <h5>{user.email}</h5>
                    </div>
                    <div className='field'>
                      <span>Address</span>

                      {user.address ? (
                        <h5>{user.address}</h5>
                      ) : (
                        <h5 className='text-subtle text-italic'>
                          Address not set
                        </h5>
                      )}
                    </div>
                    <div className='field'>
                      <span>Mobile</span>

                      <h5 className='text-subtle text-italic'>
                        {get(user, 'mobile.value', 'Mobile not set')}
                      </h5>
                    </div>
                    <div className='field'>
                      <span>Date Joined</span>

                      {user.createdAt ? (
                        <h5>{displayDate(user.createdAt)}</h5>
                      ) : (
                        <h5 className='text-subtle text-italic'>
                          Not available
                        </h5>
                      )}
                    </div>
                  </div>
                  <div className='change-password'>
                    <h2 className='title-change-password'>Change Password</h2>
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
                        <button
                          className='button btn-change-password'
                          type='submit'
                        >
                          Change Password
                        </button>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

// UserProfile.propTypes = {
//   history: PropType.shape({
//     push: PropType.func
//   }).isRequired
// };

export default withRouter(UserProfile);
