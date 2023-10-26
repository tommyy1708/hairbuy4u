import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Descriptions } from 'antd';
const HistoryDetail = () => {
  const params = useParams();
  const order_number = params.id;
  const [orderDetail, setOrderDetail] = useState('');
  const [itemDetail, setItemDetail] = useState('');

  useEffect(
    () => async (title, body) => {
      await fetch('/api/order_history/order_detail/:id', {
        method: 'POST',
        body: JSON.stringify({
          order_number,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setOrderDetail(data.orderDetail);
          setItemDetail(data.orderDetail.items);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    []
  );

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Client',
      children: <p>{orderDetail.client}</p>,
    },
    {
      key: '2',
      label: 'Created Date',
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
      label: 'Order Info',
      children: (
        <div>
          {itemDetail.length > 0 ? (
            itemDetail.map((item, index) => (
              <div key={index}>
                <p>{item.item}</p>
                <p>{item.item_code}</p>
                <p>${item.price}</p>
                <p>x{item.amount}</p>
              </div>
            ))
          ) : (
            <div>Nothing</div>
          )}
        </div>
      ),
      span: 3,
    },
    {
      key: '8',
      label: 'Casher',
      children: <p>{orderDetail.casher}</p>,
    },
  ];

  return (
    <div>
      <p>{order_number}</p>
      <Descriptions
        bordered={true}
        title="Order Details"
        items={items}
      />
    </div>
  );
};

export default HistoryDetail;
