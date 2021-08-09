import { Table, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  category_api,
  create_category_api,
  delete_category_api,
  search_category_api
} from '../../../../api/category';

import { displayDate } from '../../../../utils/hepler';
import 'antd/dist/antd.css';
import { PlusCircle, Search } from 'react-feather';

const CategoryAdminPage = () => {
  const [nameCategory, setNameCategory] = useState('');
  const [categories, setCategory] = useState([]);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showSearchCategory, setShowSearchCategory] = useState(false);
  const [sortedInfo, setSortedInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const deleteCategory = async id => {
    setLoading(true);
    delete_category_api(id).then(res => {
      category_api().then(res => {
        setLoading(false);
        setCategory(res.data);
      });
    });
  };
  const createCategory = async value => {
    setNameCategory('');
    setLoading(true);
    await create_category_api(value).then(res => {
      category_api().then(res => {
        setLoading(false);
        setCategory(res.data);
      });
    });
  };
  const searchCategory = async value => {
    setNameCategory('');
    setLoading(true);
    await search_category_api(value).then(res => {
      setLoading(false);
      setCategory(res.data);
    });
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };
  const columns = [
    {
      title: 'Category Id',
      dataIndex: '_id',
      key: '_id',
      render: id => (
        <Link className={'clb'} to={`/admin/categories/${id}`}>
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
            to={`/admin/categories/${record._id}`}
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
            <div
              className='act-cancel'
              onClick={() => deleteCategory(record._id)}
            >
              Delete
            </div>
          </Space>
        </>
      )
    }
  ];

  useEffect(() => {
    setLoading(true);
    category_api().then(res => {
      setLoading(false);
      setCategory(res.data);
    });
  }, []);

  return (
    <div className='categoryList'>
      <div className='title-wrapper'>
        <h1 className='title-header'>List Category</h1>
      </div>
      <div className='action-admin-category'>
        <div
          className='btn-create-category'
          onClick={() => {
            setShowCreateCategory(!showCreateCategory);
            setShowSearchCategory(false);
          }}
        >
          <PlusCircle />
          <h2>Create Category</h2>
        </div>
        <div
          className='btn-create-category'
          onClick={() => {
            setShowSearchCategory(!showSearchCategory);
            setShowCreateCategory(false);
          }}
        >
          <Search />
          <h2>Search Category</h2>
        </div>
      </div>

      {showCreateCategory && (
        <div className='d-flex justify-around'>
          <input
            value={nameCategory}
            name={'test'}
            id={'test'}
            className={`reply-text`}
            onChange={e => setNameCategory(e.target.value)}
          />
          <button
            className='button btn-reply'
            onClick={() => createCategory(nameCategory)}
          >
            Add Category
          </button>
        </div>
      )}

      {showSearchCategory && (
        <div className='d-flex justify-around'>
          <input
            value={nameCategory}
            name={'test'}
            id={'test'}
            className={`reply-text`}
            onChange={e => setNameCategory(e.target.value)}
          />
          <button
            className='button btn-reply'
            onClick={() => searchCategory(nameCategory)}
          >
            Search Category
          </button>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={categories}
        loading={loading}
        onChange={(pagination, filters, sorter) =>
          handleTableChange(pagination, filters, sorter)
        }
      />
    </div>
  );
};

export default CategoryAdminPage;
