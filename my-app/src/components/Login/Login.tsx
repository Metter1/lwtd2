import { Button, Card, Form, Input, Row, Tooltip } from 'antd';

import {
  UserOutlined,
  LockOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/sibdev.svg';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Login: FC = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { login } = useActions();
  const { error } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();

  const tailFormItemLayout = {
    wrapperCol: {
      xxl: {
        span: 20,
        offset: 2
      },
      xs: {
        span: 16,
        offset: 4
      }
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '70vh' }}>
      <Card
        style={{ minHeight: '400px', minWidth: '400px' }}
        cover={
          <img
            alt="logo"
            src={logo}
            style={{ margin: '20px auto 0px', width: '88px', height: '88px' }}
          />
        }
      >
        <Card.Meta
          title="Вход"
          style={{ marginBottom: '40px', textAlign: 'center' }}
        />
        <Form
          {...tailFormItemLayout}
          size="large"
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            validateStatus={error ? 'error' : 'success'}
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              suffix={
                <Tooltip title="username1 | password1">
                  <InfoCircleOutlined />
                </Tooltip>
              }
            />
          </Form.Item>
          <Form.Item
            validateStatus={error ? 'error' : 'success'}
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item style={{ width: '70%', margin: '0 auto' }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="middle"
              onClick={() => {
                login(username, password);
                navigate('/search', { replace: true });
              }}
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
};
export default Login;
