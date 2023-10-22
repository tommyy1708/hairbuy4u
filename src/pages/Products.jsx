import React, { useState, useContext } from 'react';
import Filter from '../Component/Filter/Filter';
import { useNavigate, useParams } from 'react-router-dom';
import { Space, Table } from 'antd';
import CheckOutContent from '../store/CheckOutContent';
import ProductDetail from './ProductDetail';

export default function Products() {
  const params = useParams();
  const ctx = useContext(CheckOutContent);
  const navigate = useNavigate();
  const [itemsData, setItemsData] = useState(ctx.inventoryData);
  const goToDetail = (itemNum) => {
    navigate(`/products/'${itemNum}'`);
  };
  const columns = [
    {
      title: 'ItemCode',
      dataIndex: 'item_code',
      key: 'item_code',
      render: (_, record) => {
        return <p>{record.item_code}</p>;
      },
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
    {
      title: 'Act',
      render: (_, record) => (
        <>
          <button className='editButton' onClick={() => goToDetail(record.item_code)}>
            Edit
          </button>
        </>
      ),
    },
  ];

  const emptySearch = () => {
    setItemsData(ctx.inventoryData);
    const input = document.getElementById('filter_input');
    input.value = '';
  };

  return (
    <div className='productsFrame'>
      {params.id ? (
        <>
          <ProductDetail id={params.id} />
        </>
      ) : (
        <>
          <Filter
            setItemsData={setItemsData}
            inventoryData={ctx.inventoryData}
            emptySearch={emptySearch}
          />
          <div className="inquiry_table">
            <Table columns={columns} dataSource={itemsData} />
          </div>
        </>
      )}
    </div>
  );
}
