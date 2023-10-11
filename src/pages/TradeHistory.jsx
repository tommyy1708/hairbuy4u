import React, { useState, useEffect } from 'react';
import { Table, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import HistoryDetail from '../pages/HistoryDetail';
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

  const order_historyApi = async () => {
    const result = await axios.get('/api/order_history');
    setOrder_Data(result.data.allOrderData);
  };

  useEffect(() => {
    order_historyApi();
  }, []);

  const [order_data, setOrder_Data] = useState('');

  const historyColumns = [
    {
      title: 'Date',
      align: 'center',
      key: 'date',
      dataIndex: 'date',
      width: '180rem',
      ellipsis: true,
      textWrap: 'word-break',
      render: (_, record) => <p>{record.date}</p>,
    },
    {
      align: 'center',
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
      align: 'center',
      key: 'total',
      dataIndex: 'total',
      render: (_, record) => (
        <Space>${record.total.toFixed(2)}</Space>
      ),
    },
  ];

  return (
    <div>
      {showDetail ? (
        <HistoryDetail></HistoryDetail>
      ) : (
        <Table
          columns={historyColumns}
          dataSource={order_data}
          rowKey={(record) => record.order_number}
        />
      )}
    </div>
  );
};

export default TradeHistory;
