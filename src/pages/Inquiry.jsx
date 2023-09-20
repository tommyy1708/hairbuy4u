import React, { useState } from 'react';
import { Space, Table } from 'antd';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import Item from './Item';
import Filter from '../Component/Filter/Filter';
const columns = [
  {
    title: 'ItemCode',
    dataIndex: 'item_code',
    key: 'item_code',
    render: (_, record) => {
      return (
        <Link key={record.key} to="item">
          {record.item_code}
        </Link>
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
          ${parseFloat(record.msrp).toFixed(2)}
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
const data = [
  {
    key: '1',
    item_code: 'BD1120448',
    usc: 32,
    item: 'Human Hair Bundles, Natural Black, Straight',
    qty: 99,
    msrp: 124,
    cost: 50,
    category: 'Swiss Lace Wigs & Bob Wigs',
  },
  {
    key: '2',
    item_code: 'BD1120449',
    usc: 32,
    item: 'Human Hair Bundles, Natural Black, Straight',
    qty: 99,
    msrp: 124,
    cost: 50,
    category: 'Swiss Lace Wigs & Bob Wigs',
  },
  {
    key: '3',
    item_code: 'BD1120450',
    usc: 32,
    item: 'Human Hair Bundles, Natural Black, Straight',
    qty: 99,
    msrp: 124,
    cost: 50,
    category: 'Swiss Lace Wigs & Bob Wigs',
  },
  {
    key: '4',
    item_code: 'BD1120448',
    usc: 32,
    item: 'Human Hair',
    qty: 49,
    msrp: 134,
    cost: 50,
    category: 'Swiss Lace Wigs & Bob Wigs',
  },
];
const Inquiry = () => {

  const [itemsData, setItemsData] = useState(data);
  //Start get path name
  const { pathname } = useLocation();
  //end get path name

    const emptySearch = () => {
      setItemsData(data);
      const input = document.getElementById('filter_input');
      input.value = '';
    };

  return (
    <div className="inquiry">
      <Filter
        setItemsData={setItemsData}
        itemsData={itemsData}
        emptySearch={emptySearch}
      ></Filter>
      {pathname.indexOf('item') !== -1 ? (
        <Item />
      ) : (
        <div className="inquiry_table">
          <Table columns={columns} dataSource={itemsData} />
        </div>
      )}
    </div>
  );
};

export default Inquiry;
