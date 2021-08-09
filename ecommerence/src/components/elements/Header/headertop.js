import React from 'react';
import { Link } from 'react-router-dom';
import {
  GooglePlusOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
const HeaderTop = () => {
  return (
    <div className='header_top'>
      <div className='container'>
        <div className='row'>
          <ul className='contactinfo'>
            <li>
              <Link to='#'>
                <PhoneOutlined />
                <span>0334862484</span>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <MailOutlined />
                <span>tanphat261098@gmail.com</span>
              </Link>
            </li>
          </ul>
          <ul className='social-icons '>
            <li>
              <Link to='#'>
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link to='#'>
                <TwitterOutlined />
              </Link>
            </li>
            <li>
              <Link to='#'>
                <LinkedinOutlined />
              </Link>
            </li>
            <li>
              <Link to='#'>
                <GooglePlusOutlined />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
