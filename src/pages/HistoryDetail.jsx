import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Descriptions } from 'antd';
const HistoryDetail = () => {
   const params = useParams();
   const order_number = params.id;
  const [orderDetail, setOrderDetail] = useState('');
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
      children: <p>${orderDetail.total}</p>,
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
      label: 'Order List Info',
      children: (
        <>
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </>
      ),
      span: 3,
    },
  ];



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
          if (data.errCode === 0) {
            setOrderDetail(data.orderDetail);
            console.log("🚀 ~ file: HistoryDetail.jsx:80 ~ .then ~ data.orderDetail:", data)
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    []
  );

  return (
    <div>
      <p>{order_number}</p>
      <Descriptions title="Order Details" items={items} />
    </div>
  );
};

export default HistoryDetail;
