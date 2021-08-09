import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  AssignmentOutlined
} from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { get_user_api, update_profile } from '../../../../api/auth';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../../../common/CustomInput';
import CustomMobileInput from '../../../../common/CustomMobileInput';
import { toast, ToastContainer } from 'react-toastify';
import { Switch } from 'antd';
import { useFileHandler } from '../../../../hook';
import { upload_img } from '../../../../api/upload';
import { get } from 'lodash';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import ImageLoader from '../../../../common/ImageLoader';
import { ArrowLeft, RefreshCw } from 'react-feather';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
const AdminEditUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const history = useHistory();
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
    }),
    admin: Yup.boolean()
  });
  const displayPhone = mobile => {
    const { dialCode, value } = mobile;
    return `+${dialCode} ${value.slice(dialCode.length, value.length)}`;
  };
  const { imageFile, isFileLoading, onFileChange } = useFileHandler({
    avatar: {}
  });
  console.log({ imageFile });
  const initFormikValues = {
    fullname: get(user, 'profile.name', ''),
    address: get(user, 'profile.address', ''),
    mobile: get(user, 'profile.mobile', {}),
    admin: get(user, 'role', 'USER') == 'ADMIN' ? true : false
  };

  const onSubmitForm = async form => {
    let avatar;
    const { fullname, address, mobile, admin } = form;
    console.log({ fullname, address, mobile, admin });

    try {
      let role = admin ? 'ADMIN' : 'USER';
      if (Object.keys(imageFile.avatar).length) {
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
              role,
              name: fullname
            }).then(res => {
              toast.success(res.data.msg);
              get_user_api({ id }).then(res => {
                console.log(res);
                setUser(res.data.user);
              });
              console.log(res);
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log(3);
        console.log(admin);

        console.log(role);
        update_profile({
          id: user._id,
          address,
          avatar: '',
          mobile,
          role,
          name: fullname
        })
          .then(res => {
            toast.success(res.data.msg);
            get_user_api({ id }).then(res => {
              console.log(res);
              setUser(res.data.user);
            });
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    } catch (error) {
      toast.error(error.meassage);
    }
  };
  useEffect(() => {
    get_user_api({ id }).then(res => {
      console.log(res);
      setUser(res.data.user);
    });
  }, []);
  return (
    <div className='user'>
      <div className='userTitleContainer'>
        <h1 className='userTitle'>Edit User</h1>
        <Link to='/admin/create-user'>
          <button className='userAddButton'>Create</button>
        </Link>
      </div>
      {user ? (
        <>
          <div className='userContainer'>
            <div className='userShow'>
              <div className='userShowTop'>
                <img src={user.profile.avatar} alt='' className='userShowImg' />
                <div className='userShowTopTitle'>
                  <span className='userShowUsername'>{user.profile.name}</span>
                </div>
              </div>
              <div className='userShowBottom'>
                <span className='userShowTitle'>Account Details</span>
                <div className='userShowInfo'>
                  <PermIdentity className='userShowIcon' />
                  <span className='userShowInfoTitle'>{user.profile.name}</span>
                </div>
                <div className='userShowInfo'>
                  <AssignmentOutlined className='userShowIcon' />
                  <span className='userShowInfoTitle'>{user.role}</span>
                </div>
                <span className='userShowTitle'>Contact Details</span>
                <div className='userShowInfo'>
                  <PhoneAndroid className='userShowIcon' />
                  <span className='userShowInfoTitle'>
                    {Object.keys(get(user, 'profile.mobile', {})).length
                      ? displayPhone(user.profile.mobile)
                      : 'Mobile not set'}
                  </span>
                </div>
                <div className='userShowInfo'>
                  <MailOutline className='userShowIcon' />
                  <span className='userShowInfoTitle'>{user.email}</span>
                </div>
                <div className='userShowInfo'>
                  <LocationSearching className='userShowIcon' />
                  <span className='userShowInfoTitle'>
                    {user.profile.address || 'Address not set'}
                  </span>
                </div>
              </div>
            </div>
            <div className='userUpdate'>
              <span className='userUpdateTitle'>Edit</span>
              <div className='admin-profile-avatar-wrapper'>
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
              <Formik
                initialValues={initFormikValues}
                validateOnChange
                validationSchema={FormSchema}
                onSubmit={onSubmitForm}
              >
                {props => (
                  <Form>
                    <div className='admin-profile-edit-details'>
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
                        <div className='admin-role'>
                          <span className='role-title'>Admin</span>
                          {console.log(props)}
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

                      <div className='checkout-field'>
                        <CustomMobileInput
                          name='mobile'
                          label='Mobile Number (Will be used for checkout)'
                          defaultValue={get(user, 'profile.mobile', {})}
                        />
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
                            Updating Profile &nbsp;
                            <RefreshCw />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              {/* <form className='userUpdateForm'>
              <div className='userUpdateLeft'>
                <div className='userUpdateItem'>
                  <label>Username</label>
                  <input
                    type='text'
                    placeholder='annabeck99'
                    className='userUpdateInput'
                  />
                </div>
                <div className='userUpdateItem'>
                  <label>Full Name</label>
                  <input
                    type='text'
                    placeholder='Anna Becker'
                    className='userUpdateInput'
                  />
                </div>
                <div className='userUpdateItem'>
                  <label>Email</label>
                  <input
                    type='text'
                    placeholder='annabeck99@gmail.com'
                    className='userUpdateInput'
                  />
                </div>
                <div className='userUpdateItem'>
                  <label>Phone</label>
                  <input
                    type='text'
                    placeholder='+1 123 456 67'
                    className='userUpdateInput'
                  />
                </div>
                <div className='userUpdateItem'>
                  <label>Address</label>
                  <input
                    type='text'
                    placeholder='New York | USA'
                    className='userUpdateInput'
                  />
                </div>
              </div>
              <div className='userUpdateRight'>
                <div className='userUpdateUpload'>
                  <img
                    className='userUpdateImg'
                    src='https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
                    alt=''
                  />
                  <label htmlFor='file'>
                    <Publish className='userUpdateIcon' />
                  </label>
                  <input type='file' id='file' style={{ display: 'none' }} />
                </div>
                <button className='userUpdateButton'>Update</button>
              </div>
            </form> */}
            </div>
          </div>
          <ToastContainer />
        </>
      ) : (
        `...Loading`
      )}
    </div>
  );
};

export default AdminEditUserPage;
