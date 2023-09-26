import React from 'react';
import { Form, Input, Button } from 'antd';
import { LoginApi } from '../request/api';
export default function Login() {

  const onFinish = (values) => {
    LoginApi({
      username: values.username,
      password:values.password
    }).then(res => {
      let password = res.data.password;
      console.log("🚀 ~ file: Login.jsx:12 ~ onFinish ~ password:", password)
      let username = res.data.username;
      console.log("🚀 ~ file: Login.jsx:14 ~ onFinish ~ username:", username)
      if (values.password === password) {
        localStorage.setItem('username', username);
      } else {
        console.log('something wrong!')
      }
    })
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
