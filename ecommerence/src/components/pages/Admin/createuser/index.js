import CustomInput from '../../../../common/CustomInput';
import CustomMobileInput from '../../../../common/CustomMobileInput';
import { toast, ToastContainer } from 'react-toastify';
import { Switch } from 'antd';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useFileHandler } from '../../../../hook';
import { upload_img } from '../../../../api/upload';
import { register_api } from '../../../../api/auth';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import ImageLoader from '../../../../common/ImageLoader';
import { ArrowLeft, RefreshCw } from 'react-feather';
import { useHistory } from 'react-router';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
const CreateUserPage = () => {
  const history = useHistory();
  const { imageFile, isFileLoading, onFileChange } = useFileHandler({
    avatar: {}
  });
  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not valid.')
      .required('Email is required.'),
    password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .required('Password is required.'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password')], "Password's not match")
      .required('Confirm Password is required.'),
    name: Yup.string()
      .min(4, 'Full name should be at least 4 characters.')
      .max(60, 'Full name should be only be 4 characters long.')
      .required('Full name is required'),
    address: Yup.string(),
    mobile: Yup.object().shape({
      country: Yup.string(),
      countryCode: Yup.string(),
      dialCode: Yup.string(),
      value: Yup.string()
    }),
    admin: Yup.boolean()
  });
  const initFormikValues = {
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    address: '',
    mobile: {},
    admin: false
  };

  const onSubmitForm = async form => {
    const { name, address, mobile, admin, email, password } = form;
    if (Object.keys(imageFile.avatar).length) {
      await upload_img({ files: imageFile.avatar.url })
        .then(res => {
          console.log(res);
          let avatar = res.data.result.url;
          register_api({
            email,
            address,
            avatar,
            mobile,
            password,
            role: admin ? 'ADMIN' : 'USER',
            name
          })
            .then(res => {
              toast.success(res.data.msg);
              console.log(res);
            })
            .catch(err => {
              toast.error(err.response.data.msg);
            });
        })
        .catch(err => {
          toast.error(err.response.data.msg);
        });
    } else {
      register_api({
        email,
        address,
        mobile,
        password,
        role: admin ? 'ADMIN' : 'USER',
        name
      })
        .then(res => {
          toast.success(res.data.msg);
        })
        .catch(err => {
          toast.error(err.response.data.msg);
        });
    }
  };
  return (
    <div className='newUser'>
      <h1 className='newUserTitle'>New User</h1>

      <>
        <div className='userContainer'>
          <div className='userUpdate'>
            <div className='admin-profile-avatar-wrapper'>
              <ImageLoader
                alt='Avatar'
                className='user-profile-img'
                src={
                  imageFile.avatar.url ||
                  'https://res.cloudinary.com/dbdb4punq/image/upload/v1619375333/test/depositphotos_309156466-stock-illustration-male-face-avatars-man-silhouette_ekgi4z.jpg'
                }
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
            <Formik
              initialValues={initFormikValues}
              validateOnChange
              validationSchema={FormSchema}
              onSubmit={onSubmitForm}
            >
              {props => (
                <Form>
                  <div className='admin-profile-create-details'>
                    <div className='main-info-create-user'>
                      <div className='checkout-field'>
                        <Field
                          name='email'
                          type='text'
                          label='* Email'
                          placeholder='Enter your email'
                          component={CustomInput}
                        />
                      </div>
                      <div className='checkout-field'>
                        <Field
                          name='password'
                          type='password'
                          label='Password'
                          placeholder='Your Password'
                          component={CustomInput}
                        />
                      </div>
                      <div className='checkout-field'>
                        <Field
                          name='confirmpassword'
                          type='password'
                          label='Confirm Password'
                          placeholder='Confirm Your Password'
                          component={CustomInput}
                        />
                      </div>
                      <div className='checkout-field'>
                        <div className='admin-role'>
                          <span className='role-title'>Admin</span>
                          <Switch
                            checked={props.values.admin}
                            onChange={() => {
                              props.setValues({
                                ...props.values,
                                admin: !props.values.admin
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='sub-info-create-user'>
                      <div className='checkout-field'>
                        <Field
                          name='name'
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
                      </div>
                    </div>
                  </div>
                  <div className='checkout-shipping-action'>
                    <button
                      className='button button-muted'
                      onClick={() => history.push('/admin/users')}
                      type='button'
                    >
                      <ArrowLeft />
                      &nbsp; Go Back
                    </button>
                    <button className='button button-icon' type='submit'>
                      Create &nbsp;
                      <RefreshCw />
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <ToastContainer />
      </>
    </div>
  );
};
export default CreateUserPage;
