/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */
import * as Icon from 'react-feather';
import React from 'react';

const Benefit = React.memo(props => {
  return (
    /* data-aos='fade-up'*/
    <div className='benefit'>
      <div className='container'>
        <div className='row benefit-row'>
          <div className='col-lg-3 benefit-col'>
            <div className='benefit-item'>
              <div className='benefit-icon'>
                <Icon.Truck />
              </div>
              <div className='benefit-content'>
                <h6>free shipping</h6>
                <p>Suffered Alteration in Some Form</p>
              </div>
            </div>
          </div>
          <div className='col-lg-3 benefit-col'>
            <div className='benefit-item d-flex flex-row align-items-center'>
              <div className='benefit-icon'>
                <Icon.DollarSign />
                {/* <i className='far fa-money-bill-alt'></i> */}
              </div>
              <div className='benefit-content'>
                <h6>cach on delivery</h6>
                <p>The Internet Tend To Repeat</p>
              </div>
            </div>
          </div>
          <div className='col-lg-3 benefit-col'>
            <div className='benefit-item d-flex flex-row align-items-center'>
              <div className='benefit-icon'>
                <Icon.RotateCcw />
                {/* <i className='fa fa-undo' aria-hidden='true'></i> */}
              </div>
              <div className='benefit-content'>
                <h6>45 days return</h6>
                <p>Making it Look Like Readable</p>
              </div>
            </div>
          </div>
          <div className='col-lg-3 benefit-col'>
            <div className='benefit-item d-flex flex-row align-items-center'>
              <div className='benefit-icon'>
                <Icon.Clock />
                {/* <i className='far fa-clock'></i> */}
              </div>
              <div className='benefit-content'>
                <h6>opening all week</h6>
                <p>8AM - 09PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Benefit;
