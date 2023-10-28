import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Descriptions,Space } from 'antd';
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
          {itemDetail.length > 0 ? (
            itemDetail.map((item, index) => (
              <div className="detailsFromOrderFrame" key={index}>
                <Space>
                <p>Item:{item.item}</p>
                <p>Item-Code:{item.item_code}</p>
                <p>Price:${item.price}</p>
                <p>Amount:{item.amount}</p>
                </Space>
              </div>
            ))
          ) : (
            <div>Nothing</div>
          )}
        </div>
      ),
      span: 3,
    },
  ];

  return (
    <div>
      <Descriptions
        bordered={true}
        title="Order Detail Information"
        layout="horizontal"
        items={items}
      />
    </div>
  );
};

export default HistoryDetail;
