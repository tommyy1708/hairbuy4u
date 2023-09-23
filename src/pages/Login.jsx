import React from 'react';
import { Form, Input, Button } from 'antd';
import { InfoApi } from '../request/api';
import axios from 'axios';
export default function Login() {

  const onFinish = () => {
    axios.get('/api/login')
  }
  return (
    <div id="login">
      <div className="login_box">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
