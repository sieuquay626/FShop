import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';
import { order_by_user } from '../../../api/order';
import { useSelector } from 'react-redux';
import { displayMoney } from '../../../utils/hepler';
import { order_cancel } from '../../../api/order';
import { checkout_paypal } from '../../../api/checkout';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../../elements/Header';
import Footer from '../../elements/Footer';
const UserOrdersTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const user = useSelector(state => state.auth.user);
  const CheckoutOrder = id => {
    checkout_paypal(id).then(value => {
      console.log(value);
      window.open(value.data.links, '_self');
    });
  };
  const CancelOrder = id => {
    order_cancel({ id }).then(res => {
      console.log(res);
      toast.success(res.data.msg);
      setIsLoading(true);
      order_by_user({ id: user._id }).then(res => {
        console.log(res);
        setIsLoading(false);
        setOrders(res.data.oderByUser);
      });
    });
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
          ) : (
            <Tag color={`#48c774`}>{status.toUpperCase()}</Tag>
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
            <Link to={`/account/orders/${record._id}`}>Track </Link>
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
    order_by_user({ id: user._id }).then(res => {
      setIsLoading(false);
      setOrders(res.data.oderByUser);
    });
  }, []);
  return (
    <>
      <Header />
      <div className='content-account'>
        <div className='user-tab'>
          <div className='user-tab-nav'>
            <ul className='user-tab-menu'>
              <li
                className={`user-tab-item `}
                onClick={() => history.push('/account')}
              >
                My Account
              </li>
              <li
                className={`user-tab-item user-tab-active`}
                onClick={() => history.push('/account/orders')}
              >
                My Order
              </li>
            </ul>
          </div>
          <div className='user-tab-content'>
            <h1 className='title'>My Orders</h1>
            <hr />

            {isLoading ? (
              <p className='subtitle text-center'>Loading...</p>
            ) : orders.length < 1 ? (
              <p className='subtitle is-5 has-text-centered'>
                No orders found.
              </p>
            ) : (
              <>
                <Table columns={columns} dataSource={orders} />
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default UserOrdersTab;
