/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import React from 'react';
import { Link } from 'react-router-dom';
const Footer = React.memo(props => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center'>
              <ul className='footer_nav'>
                <li>
                  <a href='#'>Blog</a>
                </li>
                <li>
                  <a href='#'>FAQs</a>
                </li>
                <li>
                  <a href='contact.html'>Contact us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='footer_nav_container social-icons '>
              <ul className='nav navbar-nav'>
                <li>
                  <Link to='#'>
                    <i className='fab fa-facebook-f'></i>
                  </Link>
                </li>
                <li>
                  <Link to='#'>
                    <i className='fab fa-twitter'></i>
                  </Link>
                </li>
                <li>
                  <Link to='#'>
                    <i className='fab fa-linkedin-in'></i>
                  </Link>
                </li>
                <li>
                  <Link to='#'>
                    <i className='fab fa-google-plus-g'></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='footer_nav_container'>
              <div className='cr'>
                ©2018 All Rights Reserverd. This template is made with{' '}
                <i className='fa fa-heart-o' aria-hidden='true'></i> by{' '}
                <a href='https://quintuslabs.com/' target='_blank'>
                  Quintus Labs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
