import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { get_order } from '../../../api/order';
import { LoadingOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import ProductCard from '../../elements/ProductCard';
import { displayMoney } from '../../../utils/hepler';
import Header from '../../elements/Header';
import Footer from '../../elements/Footer';
const TrackOrder = () => {
  const { orderId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    get_order({ id: orderId }).then(res => {
      setOrder(res.data.order);
      setIsLoading(false);
      console.log(order);
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
            <h1 className='title order-id'>Order: {orderId}</h1>
            <hr />
            <div className='nav-order'>
              <ArrowLeft />
              <Link to='/account'>Back to orders</Link>
            </div>
            {isLoading ? (
              <div className='text-center'>
                <LoadingOutlined />
              </div>
            ) : (
              order && (
                <>
                  <div className='infor-oder'>
                    <div className='delivery-adderss'>
                      <h3 className='title-sub'>Delivery Address</h3>
                      <p>
                        <span>Name:</span>
                        <strong> {order.shipping.fullname}</strong>
                      </p>
                      <p>
                        <span>Address:</span> {order.shipping.address}
                      </p>

                      {order.shipping.mobile.value && (
                        <p>
                          <span>Contact : </span>
                          {order.shipping.mobile.value}
                        </p>
                      )}
                    </div>
                    <div className='payment-sumary'>
                      <h3 className='title-sub'>Payment Summary</h3>
                      <div className='method-payment'>
                        <span>Method</span>
                        <span>{get(order, 'payment.method', 'Cod')}</span>
                      </div>
                      <div className='status-payment'>
                        <span>Status</span>
                        <span>
                          {get(order, 'payment.status', 'Payment-Pending')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr />
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
      </div>
      <Footer />
    </>
  );
};

export default TrackOrder;
