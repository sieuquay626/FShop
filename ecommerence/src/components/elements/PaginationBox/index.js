import React from 'react';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';
import './style.scss';

const PaginationBox = props => {
  const showSizeChanger = false;
  return (
    <Pagination
      className='pagination'
      size='small'
      total={props.total}
      onChange={props.onChange}
      pageSize={props.pageSize}
      showSizeChanger={showSizeChanger}
      defaultCurrent={1}
    />
  );
};

export default PaginationBox;
