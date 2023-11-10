import React, { useState, useContext, useEffect, useCallback } from 'react';
import Filter from '../Component/Filter/Filter';
import { useNavigate } from 'react-router-dom';
import {
  Space,
  Table,
  Col,
  Row,
  Statistic,
  Button,
} from 'antd';
import { DollarCircleFilled } from '@ant-design/icons';
import CheckOutContent from '../store/CheckOutContent';
import { InquiryTotalCostApi } from '../request/api';
import AddNewProduct from '../Component/AddNewProduct/AddNewProduct';

export default function Products() {
  const ctx = useContext(CheckOutContent);
  const navigate = useNavigate();
  const [itemsData, setItemsData] = useState(ctx.inventoryData);
  const [fetch, setFetch] = useState(true);
  const userName = localStorage.getItem('username')
  const [totalCost, setTotalCost] = useState('')
  const goToDetail = useCallback((itemNum) => {
    navigate(`/product-edit/${itemNum}`);
  },[navigate]);

  useEffect(() => {
    if (fetch) {
      fetchData();
      setFetch(false);
    }
  }, [fetch]);


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
      title: 'Act',
      render: (_, record) => {
       return ( <>
          <Button type='primary' className='editButton' onClick={() =>goToDetail(record.item_code)}>
          Edit
        </Button >
        </>
        );
      },
    },
  ];

  //got total cost
  const fetchData = async () => {
      let result = await InquiryTotalCostApi();
      let resultCost = parseFloat(result.data.data.total_cost).toFixed(2);
      setTotalCost(resultCost);
  };

  const emptySearch = () => {
    setItemsData(ctx.inventoryData);
    const input = document.getElementById('filter_input');
    input.value = '';
  };

  return (
    <div className="productsFrame">
      <>
        {userName === 'admin' ? (
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Total Cost"
                value={totalCost}
                prefix={<DollarCircleFilled />}
              />
            </Col>
          </Row>
        ) : (
          ''
        )}
        <Filter
          setItemsData={setItemsData}
          inventoryData={ctx.inventoryData}
          emptySearch={emptySearch}
        />
        <div className="inquiry_table">
          <Table columns={columns} dataSource={itemsData} />
        </div>
      </>
    </div>
  );
}
