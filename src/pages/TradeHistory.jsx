import React, { useState,useEffect } from 'react';
import { Table, Space } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HistoryDetail from '../pages/HistoryDetail'
import axios from 'axios';

const TradeHistory = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  const path = useLocation();
  useEffect(() => {
    if (path.pathname.indexOf('detail') !== -1) {
      setShowDetail(true);
    } else {
      setShowDetail(false);
    }
  }, [path.pathname]);
  // const navigate = useNavigate();
  // const seeDetail = (orderNumber) => {
  //   navigate(`order_detail/${orderNumber}`);
  // };
    const order_historyApi = async () => {
      const result = await axios.get('/api/order_history');
      setOrder_Data(result.data.orderData);
    };
  
    useEffect(() => {
      order_historyApi();
    }, []);

    const [order_data, setOrder_Data] = useState('');

  const historyColumns = [
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
        <Link to={`order_detail/${record.order_number}`}>
          {record.order_number}
        </Link>
      ),
    },
    {
      title: 'Total Spend',
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
        <Table columns={historyColumns} dataSource={order_data} />
      )}
    </div>
  );
};

export default TradeHistory;
