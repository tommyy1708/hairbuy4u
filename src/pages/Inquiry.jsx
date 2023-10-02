import React, { useContext, useState } from 'react';
import { Space, Table } from 'antd';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import Item from './Item';
import Filter from '../Component/Filter/Filter';
import CheckOutContent from '../store/CheckOutContent';
const columns = [
  {
    title: 'ItemCode',
    dataIndex: 'item_code',
    key: 'item_code',
    render: (_, record) => {
      return (
        <Link to={`item?id=${record.item_code}`} >
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

const Inquiry = () => {
  const ctx = useContext(CheckOutContent)

  const [itemsData, setItemsData] = useState(ctx.inventoryData);

  // get path name
  const { pathname } = useLocation();


    const emptySearch = () => {
      setItemsData(ctx.inventoryData);
      const input = document.getElementById('filter_input');
      input.value = '';
    };

  return (
    <div className="inquiry">
      <Filter
        setItemsData={setItemsData}
        inventoryData={ctx.inventoryData}
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
