import React, { useEffect, useState } from 'react';
import { Table, message, Button } from 'antd';
import { InquiryClientApi } from '../request/api';

const Customer = () => {
  const [clientsData, setClientsData] = useState('');

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
      render: (_, record) => `$ ${record.spend.toFixed(2)}`,
    },
  ];

  return (
    <React.Fragment>
      <div className='addingButton'>
        <Button onClick={()=>console.log('123')} type="primary">Add New Client</Button>
      </div>
      <Table columns={history} dataSource={clientsData.data} />
    </React.Fragment>
  );
};

export default Customer;
