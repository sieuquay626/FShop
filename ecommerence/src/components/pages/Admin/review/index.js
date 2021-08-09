import { Table, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { list_user_api } from '../../../../api/auth';
import 'antd/dist/antd.css';
import { displayDate } from '../../../../utils/hepler';

const ReviewAdminPage = () => {
  const [users, setUsers] = useState([]);
  const columns = [
    {
      title: 'User Id',
      dataIndex: '_id',
      key: '_id',
      render: id => <Link to={`/account/orders/${id}`}>{id}</Link>
    },
    {
      title: 'Name',
      dataIndex: 'profile',
      key: 'profile',
      sorter: true,
      render: profile => (
        <>
          <img src={profile.avatar} className={'userListImg'} />
          <Link to={`#`}>{profile.name}</Link>
        </>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      render: email => <Link to={`/account/orders/${email}`}>{email}</Link>
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: role => (
        <>
          {role === 'USER' ? (
            <Tag color={`#C988B3`}>{role.toUpperCase()}</Tag>
          ) : (
            <Tag color={`#FA92A5`}>{role.toUpperCase()}</Tag>
          )}
        </>
      )
    },
    {
      title: 'UpdatedAt',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: true,
      render: updatedAt => <h2>{displayDate(updatedAt)}</h2>
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: createdAt => <h2>{displayDate(createdAt)}</h2>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Space size='middle'>
            <Link to={`/account/orders/${record._id}`}>Track </Link>
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

  useEffect(() => {
    list_user_api().then(res => {
      console.log(res);
      setUsers(res.data.users);
    });
  }, []);

  return (
    <div className='userList'>
      {users.length ? (
        <Table columns={columns} dataSource={users} />
      ) : (
        <h2>...Loading</h2>
      )}
    </div>
  );
};

export default ReviewAdminPage;
