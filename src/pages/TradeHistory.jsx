import React, { useState, useEffect } from 'react';
import { Table, Space, Spin } from 'antd';
import { Link } from 'react-router-dom';
import {GetOrderHistoryDataApi} from '../request/api'
const TradeHistory = (props) => {
  const [order_data, setOrder_Data] = useState('');
  const [flag, setFlag] = useState(true);

  const order_historyApi = async () => {
    const result = await GetOrderHistoryDataApi();
    setOrder_Data(result.data.allOrderData);
  };

  useEffect(() => {
    if (flag) {
      order_historyApi();
      setFlag(false);
    }
  },[flag]);

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
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.order_number - b.order_number,
      render: (_, record) => (
        <Link to={`/history/order_detail/${record.order_number}`}>
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
      {order_data?.length > 0 ? (
        <Table
          columns={historyColumns}
          dataSource={order_data}
          rowKey={(record) => record.order_number}
        />
      ) : (
        <Spin className="spinFrame" size="large" />
      )}
    </div>
  );
};

export default TradeHistory;
