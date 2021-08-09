import { Link, useHistory, useParams } from 'react-router-dom';
import Chart from '../../../elements/chart';
import { productData } from '../../../../dummyData';
import { product_id_api } from '../../../../api/product';
import { handleBrand } from '../../../../redux/actions/brand';
import { handleCategory } from '../../../../redux/actions/category';
import { useEffect, useState } from 'react';
import { Rating } from '@material-ui/lab';
import { Formik, Form, Field } from 'formik';
import CustomInput from '../../../../common/CustomInput';
import { toast, ToastContainer } from 'react-toastify';
import { get } from 'lodash';
import { ArrowLeft, RefreshCw } from 'react-feather';
import * as Yup from 'yup';
import CustomDropdown from '../../../../common/CustomDropdown';
import Dropdown from '../../../../common/Dropdown/index';
import CustomTextarea from '../../../../common/CustomTextarea';
import { useDispatch, useSelector } from 'react-redux';
import { UploadCloud, X } from 'react-feather';
import { upload_img } from '../../../../api/upload';
import { update_product_api } from '../../../../api/product';
import { useFileHandler } from '../../../../hook';
import 'react-toastify/dist/ReactToastify.css';
const AdminEditProductPage = () => {
  const { id } = useParams();
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
  console.log(1);
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
    title: get(product, 'title', ''),
    price: get(product, 'price', 0),
    discount: get(product, 'discount', 0),
    currency: get(product, 'currency', 'DOLLAR'),
    description: get(product, 'description', ''),
    material: get(product, 'detail.material', ''),
    gender: get(product, 'detail.gender', 'General'),
    category: category,
    brand: brand
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
        {getNameCategory(category)}
      </h2>
    </div>
  );
  const renderBrandToggle = () => (
    <div className='button-muted button-small btn-admin-select'>
      <h2 style={{ textTransform: 'capitalize' }}>{getNameBrand(brand)}</h2>
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
    const {
      title,
      price,
      discount,
      currency,
      description,
      material,
      gender
    } = form;
    try {
      if (Object.keys(imageFile.image).length) {
        await upload_img({ files: imageFile.image.url }).then(res => {
          console.log(res);
          update_product_api(id, {
            title,
            price,
            discount,
            currency,
            description,
            material,
            gender,
            category,
            brand,
            image: res.data.result.url
          })
            .then(res => {
              console.log(res);
              toast.success(res.data.msg);
            })
            .catch(err => {
              toast.error(err.response.data.msg);
            });
        });
      } else {
        update_product_api(id, {
          title,
          price,
          discount,
          currency,
          description,
          material,
          gender,
          // category,
          // brand,
          image: product.image
        })
          .then(res => {
            toast.success(res.data.msg);
          })
          .catch(err => {
            toast.error(err.response.data.msg);
          });
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
  useEffect(() => {
    dispatch(handleCategory());
    dispatch(handleBrand());
    product_id_api(id).then(res => {
      console.log(res);
      setProduct(res.data);
      setCategory(res.data.detail.category._id);
      setBrand(res.data.detail.brand._id);
    });
  }, []);
  return (
    <>
      <ToastContainer />
      <div className='product'>
        <div className='productTitleContainer'>
          <h1 className='productTitle'>Product</h1>
          <button
            className='productAddButton'
            onClick={() => history.push('/admin/create-product')}
          >
            Create
          </button>
        </div>
        {product ? (
          <>
            <div className='productTop'>
              <div className='productTopLeft'>
                <Chart
                  data={productData}
                  dataKey='Sales'
                  title='Sales Performance'
                />
              </div>
              <div className='productTopRight'>
                <div className='productInfoTop'>
                  <img src={product.image} alt='' className='productInfoImg' />
                  <span className='admin-title-product'>{product.title}</span>
                </div>
                <div className='productInfoBottom'>
                  <div className='productInfoItem'>
                    <span className='productInfoKey'>id:</span>
                    <span className='productInfoValue'>{product._id}</span>
                  </div>
                  <div className='productInfoItem'>
                    <span className='productInfoKey'>rating:</span>
                    <span className='productInfoValue'>
                      <Rating
                        name='read-only'
                        value={product.avgRating}
                        readOnly
                      />
                    </span>
                  </div>
                  <div className='productInfoItem'>
                    <span className='productInfoKey'>sales:</span>
                    <span className='productInfoValue'>{product.sold}</span>
                  </div>
                </div>
              </div>
            </div>
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
                              <button
                                className='button button-icon'
                                type='submit'
                              >
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
                          renderItems={(item, index) =>
                            renderBrandMenu(item, index)
                          }
                        />
                      </div>
                    </div>
                    <div className='image-upload'>
                      <div className='image-wrapper'>
                        <div className='image'>
                          <img
                            alt={''}
                            src={imageFile.image.url || product.image}
                          />
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
                      <button
                        id='custom-btn'
                        onClick={() => defaultBtnActive()}
                      >
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
          </>
        ) : (
          <h2>...Loading</h2>
        )}
      </div>
    </>
  );
};

export default AdminEditProductPage;
