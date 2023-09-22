import React, { useState,useEffect } from 'react';
import { Table, Space } from 'antd';
import {Routes,Route, Link, useLocation } from 'react-router-dom';
import HistoryDetail from '../pages/HistoryDetail'
const TradeHistory = () => {
    useEffect(() => {
      if (path.pathname.indexOf('detail') !== -1) {
        setShowDetail(true);
      } else {
        setShowDetail(false);
      }
    });
  const [showDetail, setShowDetail] = useState(false);
  const path = useLocation();

  const ORDERDATA = [
    {
      key: '1',
      order_number: 'OD202309091122',
      total: '1240',
      client: 'Tommy',
      date: '2023-09-10',
    },
  ];

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
      {showDetail ?<HistoryDetail></HistoryDetail> :  <Table columns={history} dataSource={ORDERDATA} /> }
    </div>
  );
};

export default TradeHistory;
