import React, { useState } from 'react';
import { Space, Table } from 'antd';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const columns = [
  {
    title: 'CKU',
    dataIndex: 'cku',
    key: 'cku',
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
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
        <Space>${parseFloat(record.msrp).toFixed(2)}</Space>
      </>
    ),
  },
  {
    title: 'Cost',
    key: 'cost',
    dataIndex: 'cost',
    render: (_, record) => (
      <>
        <Space>${parseFloat(record.cost).toFixed(2)}</Space>
      </>
    ),
  },
];
const data = [
  {
    key: '1',
    cku: 'BD1120448',
    sku: 32,
    category: 'Swiss Lace Wigs & Bob Wigs',
    name: 'Human Hair Bundles, Natural Black, Straight',
    qty: 99,
    msrp: 124,
    cost: 50,
  },
  {
    key: '2',
    cku: 'BD1120449',
    sku: 32,
    category: 'Swiss Lace Wigs & Bob Wigs',
    name: 'Human Hair Bundles, Natural Black, Straight',
    qty: 99,
    msrp: 124,
    cost: 50,
  },
  {
    key: '3',
    cku: 'BD1120450',
    sku: 32,
    category: 'Swiss Lace Wigs & Bob Wigs',
    name: 'Human Hair Bundles, Natural Black, Straight',
    qty: 99,
    msrp: 124,
    cost: 50,
  },
  {
    key: '4',
    cku: 'BD1120448',
    sku: 32,
    category: 'Swiss Lace Wigs & Bob Wigs',
    name: 'Human Hair',
    qty: 49,
    msrp: 134,
    cost: 50,
  },
];
const Inquiry = () => {
  const [itemsData, setItemsData] = useState(data);

  const inputChangeHandler = (e) => {
    const input = document.getElementById('filter_input');
    const keyword = input.value.trim();
    const newData = data.filter((e) => e.cku.indexOf(keyword) !== -1);
    setItemsData(newData);
  };
  const emptySearch = () => {
    setItemsData(data);
    const input = document.getElementById('filter_input');
    input.value = '';
  };

  return (
    <div className="inquiry">
      <div className="searchInput">
        <input
          id="filter_input"
          type="text"
          placeholder={'Enter here'}
        />
        <Button
          icon={<SearchOutlined />}
          onClick={inputChangeHandler}
        >
          Search
        </Button>
        <Button icon={<SearchOutlined />} onClick={emptySearch}>
          Empty
        </Button>
      </div>
      <div className="inquiry_table">
        <Table columns={columns} dataSource={itemsData} />
      </div>
    </div>
  );
};

export default Inquiry;
