import { Table, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { list_user_api, delete_user_api } from '../../../../api/auth';
import 'antd/dist/antd.css';
import { displayDate } from '../../../../utils/hepler';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserAdminPage = () => {
  const [users, setUsers] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: 'User Id',
      dataIndex: '_id',
      key: '_id',
      render: id => (
        <Link className={'clb'} to={`/admin/users/${id}`}>
          {id}
        </Link>
      )
    },
    {
      title: 'Name',
      dataIndex: 'profile',
      key: 'profile',
      sorter: (a, b) => (a.profile.name > b.profile.name ? 1 : -1),
      sortOrder: sortedInfo.columnKey === 'profile' && sortedInfo.order,
      render: (profile, record) => (
        <>
          <img src={profile.avatar} className={'userListImg'} />
          <Link className={'clb'} to={`/admin/users/${record._id}`}>
            {profile.name}
          </Link>
        </>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => (a.email > b.email ? 1 : -1),
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
      render: (email, record) => (
        <Link className={'clb'} to={`/admin/users/${record._id}`}>
          {email}
        </Link>
      )
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
            <Link to={`/admin/users/${record._id}`}>Edit </Link>
            <div className='act-cancel' onClick={() => deleteUser(record._id)}>
              Delete
            </div>
          </Space>
        </>
      )
    }
  ];

  useEffect(() => {
    setLoading(true);
    list_user_api().then(res => {
      setLoading(false);
      setUsers(res.data.users);
    });
  }, []);

  const deleteUser = id => {
    setLoading(true);
    delete_user_api(id)
      .then(res => {
        toast.success(res.data.msg);
        list_user_api().then(res => {
          setLoading(false);
          setUsers(res.data.users);
        });
      })
      .catch(err => {
        toast.error(err.response.data.msg);
      });
  };
  return (
    <div className='userList'>
      <ToastContainer />
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        onChange={(pagination, filters, sorter) =>
          handleTableChange(pagination, filters, sorter)
        }
      />
    </div>
  );
};

export default UserAdminPage;
