import { Link, useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomInput from '../../../../common/CustomInput';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLeft, RefreshCw } from 'react-feather';
import * as Yup from 'yup';
import CustomDropdown from '../../../../common/CustomDropdown';
import Dropdown from '../../../../common/Dropdown/index';
import CustomTextarea from '../../../../common/CustomTextarea';
import { useDispatch, useSelector } from 'react-redux';
import { UploadCloud, X } from 'react-feather';
import { upload_img } from '../../../../api/upload';
import { create_product_api } from '../../../../api/product';
import { useFileHandler } from '../../../../hook';
import 'react-toastify/dist/ReactToastify.css';
export default function NewProduct() {
  const [product, setProduct] = useState(null);
  const brands = useSelector(state => state.brand.listBrand);
  const categories = useSelector(state => state.category.listCategory);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    imageFile,
    isFileLoading,
    onFileChange,
    removeAllImage
  } = useFileHandler({
    image: {}
  });
  const FormSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, 'Title should be at least 4 characters.')
      .max(200, 'Title should be only be 200 characters long.')
      .required('Title is required'),
    price: Yup.number().required('Price is required'),
    discount: Yup.number(),
    currency: Yup.string(),
    description: Yup.string().min(
      2,
      'Description should be at least 2 characters'
    ),

    material: Yup.string(),
    gender: Yup.string()
  });
  const initFormikValues = {
    title: '',
    price: 0,
    discount: 0,
    currency: 'DOLLAR',
    description: '',
    material: '',
    gender: 'General'
  };
  const ItemCurrencyRender = () => {
    return (
      <>
        <option value={'VND'}>VND</option>;
        <option value={'DOLLAR'}>DOLLAR</option>;
      </>
    );
  };
  const ItemGenderRender = () => {
    return (
      <>
        <option value={'General'}>General</option>;
        <option value={'Men'}>Men</option>;
        <option value={'Women'}>Women</option>;
        <option value={'Kid'}>Kid</option>;
      </>
    );
  };

  const renderCategoryToggle = () => (
    <div className='button-muted button-small btn-admin-select'>
      <h2 style={{ textTransform: 'capitalize' }}>
        {category ? getNameCategory(category) : 'Select the category'}
      </h2>
    </div>
  );
  const renderBrandToggle = () => (
    <div className='button-muted button-small btn-admin-select'>
      <h2 style={{ textTransform: 'capitalize' }}>
        {brand ? getNameBrand(brand) : 'Select the brand'}
      </h2>
    </div>
  );
  const renderCategoryMenu = (item, index) => (
    <div className='notification-item' onClick={() => setCategory(item._id)}>
      <span style={{ textTransform: 'capitalize' }}>{item.name}</span>
    </div>
  );
  const renderBrandMenu = (item, index) => (
    <div className='notification-item' onClick={() => setBrand(item._id)}>
      <span style={{ textTransform: 'capitalize' }}>{item.name}</span>
    </div>
  );
  const onSubmitForm = async form => {
    const { title, price, discount, gender, material, description } = form;
    console.log(form);
    try {
      if (!category) {
        toast.error('Please Select The Category');
      } else if (!brand) {
        toast.error('Please Select The Brand');
      } else if (Object.keys(imageFile.image).length) {
        await upload_img({ files: imageFile.image.url })
          .then(async res => {
            console.log(res);

            let temp = {
              title,
              price,
              discount,
              gender,
              material,
              description,
              category,
              brand,
              image: res.data.result.url
            };
            console.log(temp);
            await create_product_api(temp)
              .then(res => {
                toast.success(res.data.msg);
                setTimeout(() => {
                  history.push(`/admin/products/${res.data.newProduct._id}`);
                }, 2000);
              })
              .catch(err => {
                toast.error(err.response.data.msg);
              });
          })
          .catch(err => {
            toast.error(err.response.data.msg);
          });
      } else {
        toast.error('Image is required');
      }
    } catch (error) {
      toast.error(error.meassage);
    }
  };
  const getNameCategory = id => {
    for (let value of categories) {
      if (value._id === id) {
        return value.name;
      }
    }
  };
  const getNameBrand = id => {
    for (let value of brands) {
      if (value._id === id) {
        return value.name;
      }
    }
  };
  const defaultBtnActive = () => {
    console.log('defaultBtnActive');
    document.querySelector('#default-btn').click();
  };
  const ItemRender = item => {
    return (
      <option value={item._id} style={{ textTransform: 'capitalize' }}>
        {item.name}
      </option>
    );
  };
  const ListCategoryRender = () => {
    return categories.map(ItemRender);
  };
  const ListBrandRender = () => {
    return brands.map(ItemRender);
  };
  return (
    <div className='newProduct'>
      <ToastContainer />
      <div className='productBottom'>
        <div className='admin-profile-edit-details'>
          <div className='productForm'>
            <div className='productFormLeft'>
              <Formik
                initialValues={initFormikValues}
                validateOnChange
                validationSchema={FormSchema}
                onSubmit={onSubmitForm}
              >
                {props => (
                  <Form>
                    <div className='admin-field'>
                      <Field
                        className={'admin-title-product'}
                        name='title'
                        type='text'
                        label='*Title Product'
                        placeholder='Enter your title product'
                        component={CustomInput}
                      />
                    </div>
                    <div className='admin-field'>
                      <Field
                        name='price'
                        type='number'
                        label='*Price'
                        component={CustomInput}
                        style={{ textTransform: 'capitalize' }}
                      />
                    </div>
                    <div className='admin-field'>
                      <Field
                        name='discount'
                        type='number'
                        label='*Discount(%)'
                        component={CustomInput}
                        style={{ textTransform: 'capitalize' }}
                      />
                    </div>

                    <div className='admin-field'>
                      <Field
                        name='gender'
                        type='text'
                        label='*Gender'
                        ItemRender={ItemGenderRender}
                        component={CustomDropdown}
                      />
                    </div>
                    <div className='admin-field'>
                      <Field
                        name='material'
                        type='text'
                        label='*Material'
                        component={CustomInput}
                      />
                    </div>
                    <div className='admin-field'>
                      <Field
                        name='description'
                        type='string'
                        label='*Description'
                        component={CustomTextarea}
                      />
                    </div>

                    <div className='admin-field'>
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
                  </Form>
                )}
              </Formik>
            </div>
            <div className='productFormRight'>
              <div className='admin-field'>
                <div className='admin-select-category create-product'>
                  <span className='label-input'>*Category</span>

                  <Dropdown
                    customToggle={() => renderCategoryToggle()}
                    contentData={categories}
                    renderItems={(item, index) =>
                      renderCategoryMenu(item, index)
                    }
                  />
                </div>
              </div>
              <div className='admin-field'>
                <div className='admin-select-category create-product'>
                  <span className='label-input'>*Brand</span>
                  <Dropdown
                    customToggle={() => renderBrandToggle()}
                    contentData={brands}
                    renderItems={(item, index) => renderBrandMenu(item, index)}
                  />
                </div>
              </div>
              <div className='image-upload'>
                <div className='image-wrapper'>
                  <div className='image'>
                    {imageFile.image.url && (
                      <img alt={''} src={imageFile.image.url} />
                    )}
                  </div>

                  <div className='image-content'>
                    <div className='icon'>
                      <UploadCloud />
                    </div>
                    <div className='text'>No file chosen, yet!</div>
                  </div>

                  <div id='cancel-btn'>
                    <X
                      className={`cancel-icon ${
                        imageFile.image.url ? 'show' : 'hidden'
                      }`}
                      onClick={() => removeAllImage()}
                    />
                  </div>
                </div>
                <button id='custom-btn' onClick={() => defaultBtnActive()}>
                  Choose a file
                </button>
                <input
                  id='default-btn'
                  type='file'
                  onChange={e =>
                    onFileChange(e, {
                      name: 'image',
                      type: 'single'
                    })
                  }
                  hidden
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
