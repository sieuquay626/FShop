import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { get } from 'lodash';
import { ArrowLeft, RefreshCw } from 'react-feather';
import ProductCard from '../../../elements/ProductCard';
import { displayMoney, displayDate } from '../../../../utils/hepler';
import { get_order, update_status_order } from '../../../../api/order';
import { LoadingOutlined } from '@ant-design/icons';
import { XCircle, ArrowUpCircle } from 'react-feather';

import 'react-toastify/dist/ReactToastify.css';
import { Tag } from 'antd';
import 'antd/dist/antd.css';
const AdminEditProductPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    get_order({ id }).then(res => {
      setOrder(res.data.order);
    });
  }, []);

  const statusColor = value => {
    let color;
    if (value === 'payment-pending') {
      color = `#ffdd57`;
      console.log(1);
    } else if (value === 'cod-pending') {
      console.log(2);
      color = `#FA92A5`;
      console.log(3);
    } else if (value === 'paid') {
      color = '#007D86';
      console.log(4);
    } else if (value === 'cod') {
      color = 'gold';
      console.log(5);
    } else if (value === 'paypal') {
      color = 'cyan';
      console.log(6);
    } else if (value === 'processing') {
      color = `#00d1b2`;
      console.log(7);
    } else if (value === 'approved') {
      color = '#48c774';
      console.log(8);
    } else if (value === 'shipped') {
      color = 'geekblue';
      console.log(9);
    } else if (value === 'delivered') {
      color = 'magenta';
      console.log(10);
    } else if (value === 'cancelled') {
      color = `#d4380d`;
      console.log(11);
    } else {
      color = 'yellow';
      console.log(12);
    }
    return color;
  };
  const nextStatus = () => {
    if (order.status == 'processing') {
      return 'approved';
    }
    if (order.status == 'approved') {
      return 'shipped';
    }
    if (order.status == 'shipped') {
      return 'delivered';
    }
  };

  const updateStatus = () => {
    console.log('hio');
    update_status_order({ id: order._id, status: nextStatus() })
      .then(res => {
        console.log(res);
        toast.success(res.data.msg);
        get_order({ id }).then(res => {
          setOrder(res.data.order);
        });
      })
      .catch(err => {
        toast.error(err.response.data.msg);
      });
  };

  const cancelStatus = () => {
    console.log('hio');
    update_status_order({ id: order._id, status: nextStatus() }).then(res => {
      console.log(res);
      get_order({ id }).then(res => {
        setOrder(res.data.order);
      });
    });
  };

  return (
    <>
      <ToastContainer />
      <div className='all-order'>
        <div className='user-tab-content'>
          <h1 className='title order-id'>Order: {id}</h1>
          <hr />
          <div className='nav-order'>
            <ArrowLeft />
            <Link to='/admdin/orders'>Back to orders</Link>
          </div>
          {isLoading ? (
            <div className='text-center'>
              <LoadingOutlined />
            </div>
          ) : (
            order && (
              <>
                <div className='order-top'>
                  <div className='order-top-left'>
                    <div className='delivery-address'>
                      <h3 className='title-sub'>Delivery Sumary</h3>
                      <p>
                        <span>Name: </span>
                        {order.shipping.fullname}
                      </p>
                      <p>
                        <span>Email: </span>
                        {order.shipping.email}
                      </p>
                      <p>
                        <span>Address: </span> {order.shipping.address}
                      </p>

                      {order.shipping.mobile.value && (
                        <p>
                          <span>Contact : </span>
                          {order.shipping.mobile.value}
                        </p>
                      )}

                      <p>
                        <span>Shipped Date : </span>
                        {order.shippedDate
                          ? displayDate(order.shippedDate)
                          : 'Not Set'}
                      </p>

                      <p>
                        <span>Deleveried Date : </span>
                        {order.deliveredDate
                          ? displayDate(order.deliveredDate)
                          : 'Not Set'}
                      </p>
                    </div>
                  </div>
                  <div className='order-top-right'>
                    <div className='payment-sumary'>
                      <h3 className='title-sub'>Payment Summary</h3>
                      <div className='method-payment'>
                        <span>Method</span>
                        <span>
                          <Tag color={statusColor(order.payment.method)}>
                            {get(
                              order,
                              'payment.method',
                              'cod-pending'
                            ).toUpperCase()}
                          </Tag>
                        </span>
                      </div>
                      <div className='status-payment'>
                        <span>Status</span>
                        <span>
                          <Tag color={statusColor(order.payment.status)}>
                            {get(
                              order,
                              'payment.status',
                              'processing'
                            ).toUpperCase()}
                          </Tag>
                        </span>
                      </div>

                      <h3 className='title-sub'>Order Summary</h3>
                      <div className='status-payment'>
                        <span>Status</span>
                        <span>
                          <Tag color={statusColor(order.status)}>
                            {get(order, 'status', 'processing').toUpperCase()}
                          </Tag>
                        </span>
                      </div>
                      {order.status !== 'cancelled' &&
                      order.status !== 'delivered' ? (
                        <h3 className='title-sub'>Action</h3>
                      ) : (
                        ''
                      )}
                      <div className='action-admin-order'>
                        {order.status !== 'cancelled' &&
                        order.status !== 'delivered' ? (
                          <div
                            className='btn-create-category'
                            onClick={() => {
                              updateStatus();
                            }}
                          >
                            <ArrowUpCircle />
                            <h2
                              style={{ 'text-transform': 'capitalize' }}
                            >{`Update Status ${nextStatus()}`}</h2>
                          </div>
                        ) : (
                          ''
                        )}

                        {order.status !== 'cancelled' &&
                        order.status !== 'delivered' ? (
                          <div
                            className='btn-create-category'
                            onClick={() => cancelStatus()}
                          >
                            <XCircle />
                            <h2>Cancel Order</h2>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='carts-order'>
                  <div className='product-sumary'>
                    <h3 className='title-sub'>Products Summary</h3>
                    {order.products.map((item, index) => (
                      <div className='order-card'>
                        <ProductCard key={index} itemData={item} />
                        <span className='order-card-amount'>
                          x {item.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className='price-sumary'>
                    <h3 className='title-sub'>Price Summary</h3>
                    <div className='method-payment'>
                      <span>SubTotal</span>
                      <span>{displayMoney(order.subTotal)}</span>
                    </div>
                    <div className='method-payment'>
                      <span>Shipping Charge</span>
                      <span>{displayMoney(order.shippingCharges)}</span>
                    </div>
                    <div className='status-payment'>
                      <span>Total</span>
                      <span>{displayMoney(order.totalAmount)}</span>
                    </div>
                  </div>
                </div>
                <hr />
                <h3 className='title-sub'>Tracking</h3>
                <div className='table-container'>
                  <table className='table is-bordered is-fullwidth'>
                    <thead>
                      <tr>
                        <th>Date and Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    {order.events.map((event, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{new Date(event.date).toLocaleString()}</td>
                          <td>{event.remarks}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default AdminEditProductPage;
