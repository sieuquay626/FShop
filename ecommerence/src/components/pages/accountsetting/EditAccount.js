import { ArrowLeft, RefreshCw } from 'react-feather';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import ImageLoader from '../../../common/ImageLoader';
import { Field, Form, Formik } from 'formik';
import CustomInput from '../../../common/CustomInput';
import CustomMobileInput from '../../../common/CustomMobileInput';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { useFileHandler } from '../../../hook';
import { upload_img } from '../../../api/upload';
import { update_profile } from '../../../api/auth';
import { toast, ToastContainer } from 'react-toastify';
import { handleAuth } from '../../../redux/actions/auth';
import Header from '../../elements/Header';
import Footer from '../../elements/Footer';
const FormSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(4, 'Full name should be at least 4 characters.')
    .max(60, 'Full name should be only be 4 characters long.')
    .required('Full name is required'),
  address: Yup.string(),
  mobile: Yup.object().shape({
    country: Yup.string(),
    countryCode: Yup.string(),
    dialCode: Yup.string(),
    value: Yup.string()
  })
});

const EditAccount = props => {
  const user = useSelector(state => state.auth.user);
  const history = useHistory();
  // const dispatch = useDispatch();

  const initFormikValues = {
    fullname: user.profile.name || '',
    address: user.address || '',
    mobile: user.mobile || {}
  };
  const onSubmitForm = async form => {
    let avatar;
    const { fullname, address, mobile } = form;
    console.log({ fullname, address, mobile });
    try {
      if (Object.keys(imageFile.avatar).length) {
        console.log(1);
        await upload_img({ files: imageFile.avatar.url })
          .then(res => {
            console.log(res);
            avatar = res.data.result.url;
            console.log({ fullname, address, mobile, avatar });
            update_profile({
              id: user._id,
              address,
              avatar,
              mobile,
              name: fullname
            }).then(res => {
              toast.success(res.data.msg);
              console.log(res);
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        update_profile({
          id: user._id,
          address,
          avatar: '',
          mobile,
          name: fullname
        })
          .then(res => {
            console.log(3);
            toast.success(res.data.msg);
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    } catch (error) {
      toast.error(error.meassage);
    } finally {
      // dispatch(handleAuth());
      console.log(2);
    }
  };
  const { imageFile, isFileLoading, onFileChange } = useFileHandler({
    avatar: {}
  });
  return (
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
            <div className='edit-user'>
              <h3 className='text-center'>Edit Account Details</h3>
              <div className='user-profile-banner'>
                <div className='user-profile-banner-wrapper'>
                  <ImageLoader
                    alt='Banner'
                    className='user-profile-banner-img'
                    src={
                      // imageFile.banner.url ||
                      `https://res.cloudinary.com/dbdb4punq/image/upload/v1626604277/test/BG-2_cmsaoc.png`
                    }
                  />
                  {/* {isFileLoading ? (
              <div className='loading-wrapper'>
                <LoadingOutlined />
              </div>
            ) : (
              <label
                className='edit-button edit-banner-button'
                htmlFor='edit-banner'
              >
                <input
                  accept='image/x-png,image/jpeg'
                  hidden
                  id='edit-banner'
                  onChange={e =>
                    onFileChange(e, { name: 'banner', type: 'single' })
                  }
                  type='file'
                />
                <EditOutlined />
              </label>
            )} */}
                </div>
                <div className='user-profile-avatar-wrapper'>
                  <ImageLoader
                    alt='Avatar'
                    className='user-profile-img'
                    src={imageFile.avatar.url || user.profile.avatar}
                  />
                  {isFileLoading ? (
                    <div className='loading-wrapper'>
                      <LoadingOutlined />
                    </div>
                  ) : (
                    <label
                      className='edit-button edit-avatar-button'
                      htmlFor='edit-avatar'
                    >
                      <input
                        accept='image/x-png,image/jpeg'
                        hidden
                        id='edit-avatar'
                        onChange={e =>
                          onFileChange(e, { name: 'avatar', type: 'single' })
                        }
                        type='file'
                      />
                      <EditOutlined />
                    </label>
                  )}
                </div>
              </div>
              <Formik
                initialValues={initFormikValues}
                validateOnChange
                validationSchema={FormSchema}
                onSubmit={onSubmitForm}
              >
                {props => (
                  <Form>
                    <div className='user-profile-edit-details'>
                      <div className='checkout-field'>
                        <Field
                          name='fullname'
                          type='text'
                          label='* Full Name'
                          placeholder='Enter your full name'
                          component={CustomInput}
                        />
                      </div>
                      <div className='checkout-field'>
                        <Field
                          name='address'
                          type='text'
                          label='Address (Will be used for checkout)'
                          placeholder='#245 Brgy. Maligalig, Arayat Pampanga, Philippines'
                          component={CustomInput}
                          style={{ textTransform: 'capitalize' }}
                        />
                      </div>
                      <div className='checkout-field'>
                        <CustomMobileInput
                          name='mobile'
                          label='Mobile Number (Will be used for checkout)'
                          defaultValue={'0334862484'}
                        />
                        <div className='checkout-shipping-action'>
                          <button
                            className='button button-muted'
                            onClick={() => history.push('/account')}
                            type='button'
                          >
                            <ArrowLeft />
                            &nbsp; Go Back
                          </button>
                          <button className='button button-icon' type='submit'>
                            Updating Profile &nbsp;
                            <RefreshCw />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default withRouter(EditAccount);
/*
 
*/
