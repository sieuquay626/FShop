import { Table, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  brand_api,
  create_brand_api,
  delete_brand_api,
  search_brand_api
} from '../../../../api/brand';
import { UploadCloud, X } from 'react-feather';

import { displayDate } from '../../../../utils/hepler';
import 'antd/dist/antd.css';
import { PlusCircle, Search } from 'react-feather';
import { useFileHandler } from '../../../../hook';
import { upload_img } from '../../../../api/upload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BrandAdminPage = () => {
  const [nameBrand, setNameBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [showCreateBrand, setShowCreateBrand] = useState(false);
  const [showSearchBrand, setShowSearchBrand] = useState(false);
  const [sortedInfo, setSortedInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const {
    imageFile,
    isFileLoading,
    onFileChange,
    removeAllImage
  } = useFileHandler({
    photo: {}
  });
  const deleteBrand = async id => {
    delete_brand_api(id).then(res => {
      brand_api().then(res => {
        toast.success(res.data.msg);
        setBrands(res.data);
      });
    });
  };
  const createBrand = async value => {
    setNameBrand('');
    if (Object.keys(imageFile.photo).length) {
      await upload_img({ files: imageFile.photo.url }).then(res => {
        create_brand_api({ name: value, photo: res.data.result.url })
          .then(res => {
            toast.success(res.data.msg);
            brand_api().then(res => {
              setBrands(res.data);
            });
          })
          .catch(err => {
            toast.error(err.response.data.msg);
          });
      });
    } else {
      toast.error('Image is required');
    }
  };
  const searchBrand = async value => {
    setLoading(true);
    setNameBrand('');
    await search_brand_api(value).then(res => {
      setLoading(false);
      setBrands(res.data);
    });
  };
  const defaultBtnActive = () => {
    console.log('defaultBtnActive');
    document.querySelector('#default-btn').click();
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };
  const columns = [
    {
      title: 'Brand Id',
      dataIndex: '_id',
      key: '_id',
      render: id => (
        <Link className={'clb'} to={`/admin/brands/${id}`}>
          {id}
        </Link>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => (a.title > b.title ? 1 : -1),
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      render: (name, record) => (
        <>
          <Link
            className={'clb admin-title-product'}
            to={`/admin/brands/${record._id}`}
          >
            {name}
          </Link>
        </>
      )
    },
    {
      title: 'UpdatedAt',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: updatedAt => <h2>{displayDate(updatedAt)}</h2>
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => <h2>{displayDate(createdAt)}</h2>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Space size='middle'>
            <div className='act-cancel' onClick={() => deleteBrand(record._id)}>
              Delete
            </div>
          </Space>
        </>
      )
    }
  ];

  useEffect(() => {
    setLoading(true);
    brand_api().then(res => {
      setLoading(false);
      setBrands(res.data);
    });
  }, []);

  return (
    <>
      <div className='categoryList'>
        <div className='title-wrapper'>
          <h1 className='title-header'>List Brand</h1>
        </div>
        <div className='action-admin-category'>
          <div
            className='btn-create-category'
            onClick={() => {
              setShowCreateBrand(!showCreateBrand);
              setShowSearchBrand(false);
            }}
          >
            <PlusCircle />
            <h2>Create Brand</h2>
          </div>
          <div
            className='btn-create-category'
            onClick={() => {
              setShowSearchBrand(!showSearchBrand);
              setShowCreateBrand(false);
            }}
          >
            <Search />
            <h2>Search Brand</h2>
          </div>
        </div>

        {showCreateBrand && (
          <>
            <div className='admin-create-brand'>
              <div className='admin-banner-wrapper'>
                <div className='d-flex justify-around'>
                  <span>Name</span>
                  <input
                    value={nameBrand}
                    name={'test'}
                    id={'test'}
                    className={`reply-text`}
                    onChange={e => setNameBrand(e.target.value)}
                  />
                </div>
                <button
                  className='button btn-create-brand'
                  onClick={() => createBrand(nameBrand)}
                >
                  Add Brand
                </button>
              </div>

              <div className='image-upload'>
                <div className='image-wrapper'>
                  <div className='image'>
                    {imageFile.photo.url && (
                      <img alt={''} src={imageFile.photo.url} />
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
                        imageFile.photo.url ? 'show' : 'hidden'
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
                    onFileChange(e, { name: 'photo', type: 'single' })
                  }
                  hidden
                />
              </div>
            </div>
          </>
        )}

        {showSearchBrand && (
          <div className='d-flex justify-around'>
            <input
              value={nameBrand}
              name={'test'}
              id={'test'}
              className={`reply-text`}
              onChange={e => setNameBrand(e.target.value)}
            />
            <button
              className='button btn-reply'
              onClick={() => searchBrand(nameBrand)}
            >
              Search Brand
            </button>
          </div>
        )}

        <Table
          columns={columns}
          dataSource={brands}
          loading={loading}
          onChange={(pagination, filters, sorter) =>
            handleTableChange(pagination, filters, sorter)
          }
        />

        <ToastContainer />
      </div>
    </>
  );
};

export default BrandAdminPage;
