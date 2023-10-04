import React from 'react';
import {Table} from 'antd'


const Customer = () => {

  // test data
  const clientData = [
    {
      key: '1',
      Name: 'Tommy',
      Type: 'Retail',
      Total: 0,
      contact: 'Miami',
      Phone:3058888888,
    }
  ]
   const history = [
     {
       title: 'Name',
       key: 'key',
       dataIndex: 'Name',
       render: (_, record) => <>{record.Name}</>,
     },
     {
       title: 'Contact',
       dataIndex: 'contact',
       key: 'contact',
     },
     {
       title: 'Phone',
       dataIndex: 'Phone',
       key: 'phone',
     },
     {
       title: 'Type',
       key: 'type',
       dataIndex: 'Type',
     },
     {
       title: 'TotalSpend',
       key: 'total_spend',
       dataIndex: 'Total',
       render: (_, record) => `$ ${record.Total}`,
     },
   ];
  return (
    <React.Fragment>
      <Table columns={history} dataSource={clientData} />
    </React.Fragment>
  );
};

export default Customer;
