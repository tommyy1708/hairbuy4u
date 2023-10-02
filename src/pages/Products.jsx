import React, { useState, useContext, useEffect } from 'react';
import Filter from '../Component/Filter/Filter';
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { Space, Table } from 'antd';
import CheckOutContent from '../store/CheckOutContent';
import axios from 'axios';

export default function Products() {
  const ctx = useContext(CheckOutContent);
  const navigate = useNavigate();
  const [itemsData, setItemsData] = useState(ctx.inventoryData);
  const goToDetail = (itemNum) => {
    navigate(`/products/'${itemNum}'`);
}
  const columns = [
    {
      title: 'ItemCode',
      dataIndex: 'item_code',
      key: 'item_code',
      render: (_, record) => {
        return (
          <p onClick={() => goToDetail(record.item_code)}>
            {record.item_code}
          </p>
        );
      },
    },
    {
      title: 'USC',
      dataIndex: 'usc',
      key: 'usc',
    },
    {
      title: 'Item',
      key: 'item',
      dataIndex: 'item',
    },
    {
      title: 'Qty.',
      key: 'qty',
      dataIndex: 'qty',
    },
    {
      title: 'MSRP',
      key: 'msrp',
      dataIndex: 'msrp',
      render: (_, record) => (
        <>
          <Space key={record.key}>
            ${parseFloat(record.price).toFixed(2)}
          </Space>
        </>
      ),
    },
    {
      title: 'Cost',
      key: 'cost',
      dataIndex: 'cost',
      render: (_, record) => (
        <>
          <Space key={record.key}>
            ${parseFloat(record.cost).toFixed(2)}
          </Space>
        </>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
  ];

  const emptySearch = () => {
    setItemsData(ctx.inventoryData);
    const input = document.getElementById('filter_input');
    input.value = '';
  };
  return (
    <>
      <Filter
        setItemsData={setItemsData}
        inventoryData={ctx.inventoryData}
        emptySearch={emptySearch}
      ></Filter>
      <div className="inquiry_table">
        <Table columns={columns} dataSource={itemsData} />
      </div>
    </>
  );
}
