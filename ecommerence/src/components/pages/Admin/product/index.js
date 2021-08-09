import { Table, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { all_product_api } from '../../../../api/product';
import 'antd/dist/antd.css';
import { displayDate } from '../../../../utils/hepler';

const ProductAdminPage = () => {
  const [products, setProducts] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      title: 'Product Id',
      dataIndex: '_id',
      key: '_id',
      width: 200,
      render: id => (
        <Link className={'clb'} to={`/admin/products/${id}`}>
          {id}
        </Link>
      )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => (a.title > b.title ? 1 : -1),
      sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
      ellipsis: true,
      width: 200,
      render: (title, record) => (
        <>
          <Link
            className={'clb admin-title-product'}
            to={`/admin/products/${record._id}`}
          >
            {title}
          </Link>
        </>
      )
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => <img src={image} className={'productListImg'} />
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 80,
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
      render: price => <h2>{price}</h2>
    },
    {
      title: 'Category',
      dataIndex: 'detail',
      key: 'detailcategory',
      sorter: (a, b) => (a.title > b.title ? 1 : -1),
      sortOrder: sortedInfo.columnKey === 'detailcategory' && sortedInfo.order,
      render: detail => (
        <h2 style={{ textTransform: 'capitalize' }}> {detail.category.name}</h2>
      )
    },
    {
      title: 'Brand',
      dataIndex: 'detail',
      key: 'detailbrand',
      sorter: (a, b) => (a.title > b.title ? 1 : -1),
      sortOrder: sortedInfo.columnKey === 'detailbrand' && sortedInfo.order,
      render: detail => (
        <h2 style={{ textTransform: 'capitalize' }}>{detail.brand.name}</h2>
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
            <Link to={`/admin/products/${record._id}`}>Edit </Link>
            <div
              className='act-cancel'
              // onClick={() => CancelOrder(record._id)}
            >
              Delete
            </div>
          </Space>
        </>
      )
    }
  ];
  const handleTableChange = (pagination, filters, sorter) => {
    console.log(sorter);
    setSortedInfo(sorter);
  };

  useEffect(() => {
    setLoading(true);
    all_product_api().then(res => {
      console.log(res);
      setLoading(false);
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div className='userList'>
      {/* {products.length ? (
        <Table columns={columns} dataSource={products} />
      ) : (
        <h2>...Loading</h2>
      )} */}
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        onChange={(pagination, filters, sorter) =>
          handleTableChange(pagination, filters, sorter)
        }
      />
    </div>
  );
};

export default ProductAdminPage;
