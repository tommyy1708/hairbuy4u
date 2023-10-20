import React, { useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { LoginApi } from '../request/api';
import { useNavigate } from 'react-router';
export default function Login() {
  const navigate = useNavigate();
  const [showloading, setShowLoading] = useState(false);
  const [count, setCount] = useState(0);
  let lgButton = document.getElementById('loginButton');

  const onSubmit = (values) => {
    setCount(prev => prev + 1);
    if (count >= 4) {
      message.error('You had multiple wrong, please contact manager!')
      lgButton?.setAttribute('disabled', 'disabled');
    }
    setShowLoading(true);
    LoginApi(values).then((res) => {
      let code = res.data.errCode;
      if (code === 0) {
        localStorage.setItem(
          'username',
          res.data.userInfo[0].username
        );
        localStorage.setItem('token', res.data.userInfo[0].token);
        message.success(res.data.message);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else if (code === 1) {
        message.info(res.data.message);
        setTimeout(() => {
          setShowLoading(false);
        }, [2000]);
      } else {
        message.info(res.data.message);
        setTimeout(() => {
          setShowLoading(false);
        }, [2000]);
      }
    });
  };

  return (
    <div id="login">
      {showloading ? (
        <Spin
          tip="Loading..."
          delay="500"
          className="spinFrame"
          size="large"
        ></Spin>
      ) : null}
      <h3>Hair Natural Inc.</h3>
      <div className="login_box">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              id="loginButton"
              type="primary"
              htmlType="submit"
              block
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
