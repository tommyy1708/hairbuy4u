import React, { useState,useEffect } from 'react';
import { Table, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import HistoryDetail from '../pages/HistoryDetail'

const TradeHistory = (props) => {
  //! save for later checking
//     useEffect(() => {
//       if (path.pathname.indexOf('detail') !== -1) {
//         setShowDetail(true);
//       } else {
//         setShowDetail(false);
//       }
// });

  const [showDetail, setShowDetail] = useState(false);
  // const path = useLocation();
//!

  // const [orderdata, setOrderData] = useState(|| [{
  //     key: '',
  //     order_number: '',
  //     total: '',
  //     client: '',
  //     date: '',
  // }])

  // const orderdata = [
  //   {
  //     key: '',
  //     order_number: '',
  //     total: '',
  //     client: '',
  //     date: '',
  //   },
  // ];

  const history = [
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
      render: (_, record) => <>{record.date}</>,
    },
    {
      title: 'OrderNumber',
      dataIndex: 'order_number',
      key: 'order_number',
      render: (_, record) => (
        <Link to={`detail?order_number=${record.order_number}`}>{record.order_number}</Link>
      ),
    },
    {
      title: 'Total',
      key: 'total',
      dataIndex: 'total',
      render: (_, record) => <Space>${record.total}</Space>,
    },
    {
      title: 'Client',
      key: 'client',
      dataIndex: 'client',
      render: (_, record) => record.client,
    },
  ];

  return (
    <div>
      {showDetail ? (
        <HistoryDetail></HistoryDetail>
      ) : (
        <Table columns={history} dataSource={props.orderdata} />
      )}
    </div>
  );
};

export default TradeHistory;
