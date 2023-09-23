import React from 'react';
import { Form, Input, Button } from 'antd';
import { InfoApi } from '../request/api';
export default function Login() {
  // const onFinish = (values) => {
  //   console.log('success',values)
  //   LoginApi({
  //     username: values.username,
  //     password:values.password
  //   })
  // }
  const axios = require('axios').default;
  const onFinish = (values) => {
     axios
       .get('/login')
       .then(function (response) {
         // handle success
         console.log(response);
       })
       .catch(function (error) {
         // handle error
         console.log(error);
       })
       .finally(function () {
         // always executed
       });
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
