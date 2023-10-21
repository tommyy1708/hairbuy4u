import React, { useEffect, useState } from 'react';
import {
  Table,
  message,
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import { InquiryClientApi, AddNewClientApi } from '../request/api';

const Customer = () => {
  const [clientsData, setClientsData] = useState('');

  const addNewClient = async (values) => {
    let result = await AddNewClientApi(values);
    console.log("🚀 ~ file: Customer.jsx:17 ~ addNewClient ~ result:", result)
    if (result.data.errCode === 0) {
      message.success(result.data.message);
       setTimeout(() => {
         window.location.reload(false);
       }, [2000]);
    } else {
      message.error(result.message)
    }
    return;
  };
  useEffect(() => {
    try {
      async function fetchClients() {
        let clients = await InquiryClientApi();
        setClientsData(clients.data);
      }
      fetchClients();
    } catch (error) {
      message.info(error);
    }
  }, []);

  const history = [
    {
      title: 'Name',
      key: 'key',
      dataIndex: 'Name',
      render: (_, record) => <>{record.name}</>,
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      render: (_, record) => <>{record.address}</>,
    },
    {
      title: 'Phone',
      dataIndex: 'Phone',
      key: 'phone',
      render: (_, record) => <>{record.phone}</>,
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'Type',
      render: (_, record) => <>{record.type}</>,
    },
    {
      title: 'TotalSpend',
      key: 'total_spend',
      dataIndex: 'Total',
      render: (_, record) => record.spend === null ? `$ 0.00` : `$ ${record.spend.toFixed(2)}`,
    },
  ];
  const { Option } = Select;
  return (
    <>
      <Form
        className='newClientFrame'
        name="newClient"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={addNewClient}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input name' }]}
        >
          <Input placeholder={'name of client'} />
        </Form.Item>

        <Form.Item
          label="Contact"
          name="address"
          rules={[
            { required: true, message: 'Please input address' },
          ]}
        >
          <Input placeholder={'contact info'} />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input phone number' }]}
        >
          <Input placeholder={'phone number'} />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Please choose type' }]}
        >
          <Select placeholder={'Choose client type'}>
            <Option value="wholeSale">Whole Sale</Option>
            <Option value="retail">Retail</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add New Client
          </Button>
        </Form.Item>
      </Form>
      <Table columns={history} dataSource={clientsData.data} />
    </>
  );
};

export default Customer;
