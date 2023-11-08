import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Descriptions, Space, Spin } from 'antd';
import axios from 'axios';
const HistoryDetail = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState('');
  const itemsLength = orderDetail?.items?.length || 0;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/order_history/order_detail/${id}`
        );
        if (response) {
          const orderInfo = response.data.orderDetail;
          setOrderDetail(orderInfo);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Client',
      children: <p>{orderDetail.client}</p>,
    },
    {
      key: '2',
      label: 'Date',
      children: <p>{orderDetail.date}</p>,
    },
    {
      key: '3',
      label: 'Order Number',
      children: <p>{orderDetail.order_number}</p>,
    },
    {
      key: '4',
      label: 'Total',
      children: <p>${parseFloat(orderDetail.total).toFixed(2)}</p>,
    },
    {
      key: '5',
      label: 'Discount',
      children: <p>${orderDetail.discount}</p>,
    },
    {
      key: '6',
      label: 'Status',
      children: <Badge status="success" text="Finished" />,
    },
    {
      key: '7',
      label: 'Casher',
      children: <p>{orderDetail.casher}</p>,
      span: '1',
    },
    {
      key: '8',
      label: 'Payment Method',
      children: <p>{orderDetail.method}</p>,
      span: 2,
    },
    {
      key: '9',
      label: 'Order Info',
      children: (
        <div>
          {itemsLength > 0 &&
            orderDetail.items.map((item, index) => (
              <div className="detailsFromOrderFrame" key={index}>
                <Space>
                  <p>Item:{item.item}</p>
                  <p>Item-Code:{item.item_code}</p>
                  <p>Price:${item.price}</p>
                  <p>Amount:{item.amount}</p>
                </Space>
              </div>
            ))}
        </div>
      ),
      span: 3,
    },
  ];

  return (
    <div>
      {itemsLength > 0 ? (
        <Descriptions
          bordered={true}
          title={`Order:${id} Information`}
          layout="horizontal"
          items={items}
        />
      ) : (
        <Spin className="spinFrame" size="large" />
      )}
    </div>
  );
};

export default HistoryDetail;
