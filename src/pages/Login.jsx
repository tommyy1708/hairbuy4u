import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { LoginApi } from '../request/api';
import { useNavigate } from 'react-router';
export default function Login() {
  const navigate = useNavigate();

  const onSubmit = (values) => {
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
      } else {
        message.info(res.data.message);
      }
    });
  };

  return (
    <div id="login">
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
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
