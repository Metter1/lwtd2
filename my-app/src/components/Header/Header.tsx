import { FC } from 'react';
import { Menu, Layout } from 'antd';
import logo from '../../assets/icons/sibdev.svg';
import { Link } from 'react-router-dom';
import { useActions } from './../../hooks/useActions';

const HeaderFC: FC = () => {
  const { logout } = useActions();
  return (
    <Layout.Header
      style={{ background: '#fff', borderBottom: '1px solid #F1F1F1' }}
    >
      <div className="container">
        <div
          style={{
            float: 'left',
            width: '50px',
            height: '50px'
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ maxHeight: '100%', maxWidth: '100%' }}
          />
        </div>
        <Menu theme="light" mode="horizontal" style={{ border: 'none' }}>
          <Menu.Item key="1">
            <Link to={'/search'}>Поиск</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={'/favorite'}>Избранное</Link>
          </Menu.Item>
          <Menu.Item key="3" style={{ marginLeft: 'auto' }}>
            <div onClick={logout}>Выйти</div>
          </Menu.Item>
        </Menu>
      </div>
    </Layout.Header>
  );
};

export default HeaderFC;
