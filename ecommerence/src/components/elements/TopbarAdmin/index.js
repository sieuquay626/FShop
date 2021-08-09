import {
  NotificationsNone,
  ShoppingCartOutlined,
  ErrorOutline,
  InfoOutlined
} from '@material-ui/icons';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Dropdown from '../../../common/Dropdown/index';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../../../redux/actions/auth';
import { Home, Settings, LogOut, ShoppingCart } from 'react-feather';

const Topbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const renderUserToggle = () => (
    <div className='user-info'>
      <img src={user.profile.avatar} alt='' className='topAvatar' />
      <span className='name-info'>{user.profile.name}</span>
    </div>
  );
  const renderNotificationToggle = () => (
    <div className='topbarIconContainer'>
      <NotificationsNone />
      <span className='topIconBadge'>{notification.length}</span>
    </div>
  );
  const data = [
    {
      content: 'Home',
      component: () => {
        return <Home />;
      },
      click: () => {
        history.push('/');
      }
    },
    {
      content: 'Settings',
      component: () => {
        return <Settings />;
      },
      click: () => {
        history.push('/account');
      }
    },
    {
      content: 'Logout',
      component: () => {
        return <LogOut />;
      },
      click: () => {
        dispatch(handleLogout());
      }
    }
  ];
  const notification = [
    {
      icon: 'bx bx-cart',
      content: 'Donec at nisi sit amet tortor commodo porttitor pretium a erat',
      component: () => {
        return <InfoOutlined />;
      }
    },
    {
      icon: 'bx bx-error',
      content: 'Curabitur id eros quis nunc suscipit blandit',
      component: () => {
        return <ErrorOutline />;
      }
    },
    {
      icon: 'bx bx-package',
      content:
        'Duis malesuada justo eu sapien elementum, in semper diam posuere',
      component: () => {
        return <ShoppingCartOutlined />;
      }
    },

    {
      icon: 'bx bx-error',
      content: 'In gravida mauris et nisi',
      component: () => {
        return <InfoOutlined />;
      }
    },
    {
      icon: 'bx bx-cart',
      content: 'Curabitur id eros quis nunc suscipit blandit',
      component: () => {
        return <InfoOutlined />;
      }
    }
  ];
  const renderUserMenu = (item, index) => (
    <div className='notification-item' key={index} onClick={item.click}>
      <item.component />
      <span>{item.content}</span>
    </div>
  );

  const renderNotificationItem = (item, index) => (
    <div className='notification-item' key={index}>
      <item.component />
      <span>{item.content}</span>
    </div>
  );

  return (
    <div className='topbar'>
      <div className='topbarWrapper'>
        <div className='topLeft' onClick={() => history.push('/')}>
          <span className='logo'>NTP-Shop</span>
        </div>
        <div className='topRight'>
          <Dropdown
            customToggle={() => renderNotificationToggle()}
            contentData={notification}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to='/'>View All</Link>}
          />
          <Dropdown
            customToggle={() => renderUserToggle()}
            contentData={data}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
