import React, { useEffect, useState } from 'react';
import {
  Space,
  Table,
  message,
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import { InquiryClientApi, AddNewClientApi } from '../request/api';
import { SearchOutlined } from '@ant-design/icons';
import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';

const Customer = () => {
  const [originData, setOriginData] = useState('');
  const [clientsData, setClientsData] = useState('');
  const [showSub, setShowSub] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === '/customer') {
      setShowSub(false);
    } else {
      setShowSub(true);
    }
    try {
      async function fetchClients() {
        let clients = await InquiryClientApi();
        setOriginData(clients.data.data);
      }
      fetchClients();
    } catch (error) {
      message.info(error);
    }
  }, [navigate]);

  const addNewClient = async (values) => {
    setDisabledButton(true);
    let result = await AddNewClientApi(values);
    if (result.data.errCode === 0) {
      message.success(result.data.message);
      setTimeout(() => {
        window.location.reload(false);
      }, [2000]);
    } else {
      message.error(result.message);
    }
    return;
  };

  const emptySearch = () => {
    setClientsData(originData);
    const input = document.getElementById('filter_input');
    input.value = '';
  };

  const handleNewOrder = (e) => {
    const clientName = e.name;
  };

  const header = [
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
      render: (_, record) =>
        record.spend === null
          ? `$ 0.00`
          : `$ ${record.spend.toFixed(2)}`,
    },
    {
      title: 'New Order',
      key: 'newOrder',
      dataIndex: 'newOrder',
      render: (_, record) => (
        <Button>
          <Link to={`/customer/checkout/${record.phone}/${record.name}`}>
            New Order
          </Link>
        </Button>
      ),
    },
  ];

  const inputChangeHandler = (e) => {
    const input = document.getElementById('filter_input');
    const keyword = input.value.trim();
    if (keyword.length !== 0) {
      const newData = originData.filter(
        (e) => e.phone.indexOf(keyword) !== -1
      );
      setClientsData(newData);
    } else {
      message.info('Please input phone number of client');
    }
  };

  const { Option } = Select;
  return (
    <>
      {showSub === false ? (
        <>
          <div className="searchFrame">
            <Space>
              <input
                id="filter_input"
                className="content"
                type="text"
                placeholder={'Enter phone number'}
              />
              <Button
                className="content"
                icon={<SearchOutlined />}
                onClick={inputChangeHandler}
                type="primary"
              >
                Search
              </Button>
              <Button
                className="content"
                icon={<SearchOutlined />}
                onClick={() => emptySearch()}
              >
                Show All Clients
              </Button>
            </Space>
          </div>

          <Form
            className="newClientFrame"
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
              rules={[
                { required: true, message: 'Please input name' },
              ]}
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
              rules={[
                {
                  required: true,
                  message: 'Please input phone number',
                },
              ]}
            >
              <Input placeholder={'phone number'} />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[
                { required: true, message: 'Please choose type' },
              ]}
            >
              <Select placeholder={'Choose client type'}>
                <Option value="wholeSale">Whole Sale</Option>
                <Option value="retail">Retail</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={disabledButton}>
                Add New Client
              </Button>
            </Form.Item>
          </Form>
          <Table columns={header} dataSource={clientsData} />
        </>
      ) : (
        <Outlet></Outlet>
      )}
    </>
  );
};

export default Customer;
