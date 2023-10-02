import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge,Button, Descriptions } from 'antd';
const Item = () => {
  const [itemDetail, setItemDetail] = useState('');
   const params = useParams();
  const item_code = params.id;
  const navigate = useNavigate();


  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Item code',
      children: <p>{itemDetail[0].item}</p>,
    },
    {
      key: '2',
      label: 'Product Name',
      children: <p>{itemDetail[0].item}</p>,
    },
    {
      key: '3',
      label: 'Qty.',
      children: <p>{itemDetail[0].qty}</p>,
    },
    {
      key: '4',
      label: 'USC',
      children: <p>{itemDetail[0].usc}</p>,
    },
    {
      key: '5',
      label: 'MSRP',
      children: <p>${itemDetail[0].price}</p>,
    },
    {
      key: '6',
      label: 'Cost',
      children: <p>${itemDetail[0].cost}</p>,
    },

    {
      key: '7',
      label: 'Status',
      children: (
        <>
          <Badge status="success" text="Normal" />
        </>
      ),
      span: 1,
    },
    {
      key: '8',
      label: 'Products info',
      children: <> information here </>,
      span: 2,
    },
  ];

  useEffect(() => async (title, body) => {
      await fetch('/api/products/:id', {
        method: 'POST',
        body: JSON.stringify({
          item_code,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setItemDetail(data.productDetail);
          console.log("🚀 ~ file: Item.jsx:74 ~ .then ~ data.productDetail:", data.productDetail)
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  );

  return (
    <>
      <div>
        <Descriptions title="Products Details" items={items} />
      </div>
      </>
  );
};

export default Item;
