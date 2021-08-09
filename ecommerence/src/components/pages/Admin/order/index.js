import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { list_user_api } from '../../../../api/auth';
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';
import { displayDate, displayMoney } from '../../../../utils/hepler';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { get_all_order } from '../../../../api/order';
const OrderAdminPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const user = useSelector(state => state.auth.user);
  const CheckoutOrder = id => {
    // checkout_paypal(id).then(value => {
    //   console.log(value);
    //   window.open(value.data.links, '_self');
    // });
  };
  const CancelOrder = id => {
    // order_cancel({ id }).then(res => {
    //   console.log(res);
    //   toast.success(res.data.msg);
    //   setIsLoading(true);
    //   order_by_user({ id: user._id }).then(res => {
    //     console.log(res);
    //     setIsLoading(false);
    //     setOrders(res.data.oderByUser);
    //   });
    // });
  };
  const columns = [
    {
      title: 'Order Id',
      dataIndex: '_id',
      key: '_id',
      render: id => <Link to={`/account/orders/${id}`}>{id}</Link>
    },
    {
      title: 'Items',
      dataIndex: 'products',
      key: 'products',
      render: value => (
        <>
          <Space size='middle' direction='vertical'>
            {value.map((item, index) => {
              return (
                <h2 className='title-item'>
                  <Link to={`/collections/${item.product._id}`}>{`${index +
                    1}.${item.product.title}`}</Link>
                </h2>
              );
            })}
          </Space>
        </>
      )
    },
    {
      title: 'SubTotal',
      dataIndex: 'subTotal',
      key: 'subTotal',
      render: subTotal => (
        <span className='text-success'>{displayMoney(subTotal)}</span>
      )
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => (
        <>
          {status === 'payment-pending' ? (
            <Tag color={`#ffdd57`}>{status.toUpperCase()}</Tag>
          ) : status === 'cancelled' ? (
            <Tag color={`#d4380d`}>{status.toUpperCase()}</Tag>
          ) : status === 'processing' ? (
            <Tag color={`#00d1b2`}>{status.toUpperCase()}</Tag>
          ) : status === 'cod-pending' ? (
            <Tag color={`#ffdd57`}>{status.toUpperCase()}</Tag>
          ) : status === 'approved' ? (
            <Tag color={`#48c774`}>{status.toUpperCase()}</Tag>
          ) : (
            <Tag color={`#424682`}>{status.toUpperCase()}</Tag>
          )}
        </>
      )
    },
    {
      title: 'Date and Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: value => <h2>{new Date(value).toLocaleString()}</h2>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Space size='middle'>
            <Link to={`/admin/orders/${record._id}`}>Track </Link>
            {record.payment.status === 'payment-pending' && (
              <div
                className='act-checkout'
                onClick={() => CheckoutOrder(record._id)}
              >
                Checkout
              </div>
            )}
            {record.status !== 'cancelled' && (
              <div
                className='act-cancel'
                onClick={() => CancelOrder(record._id)}
              >
                Cancel
              </div>
            )}
          </Space>
        </>
      )
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    get_all_order().then(res => {
      setIsLoading(false);
      setOrders(res.data.listOrder);
    });
  }, []);
  return (
    <div className='all-order'>
      <h1 className='title'>List Orders</h1>
      <hr />
      <Table columns={columns} dataSource={orders} loading={isLoading} />
      <ToastContainer />
    </div>
  );
};

export default OrderAdminPage;
