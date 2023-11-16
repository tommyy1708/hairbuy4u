import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Space, Spin } from 'antd';
import axios from 'axios';
const HistoryDetail = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState('');
  const [orderItems, setOrderItems] = useState('');
  const [profit, setProfit] = useState(0);
  const [nTotalCost, setNTotalCost] = useState(0);
  const itemsLength = orderDetail?.items?.length || 0;

  const fetchData = async () => {
    try {
      const o_a_orders_Data = await axios.get(
        `/api/order_history/order_detail/${id}`
      );
      if (o_a_orders_Data) {
        const o_a_orderInfo = o_a_orders_Data.data.orderDetail;
        const aItemsInfo = o_a_orderInfo.items;
        setOrderDetail(o_a_orderInfo);
        setOrderItems(aItemsInfo);
        const nTotal = calculate(aItemsInfo);
        setProfit(nTotal.profit);
        setNTotalCost(nTotal.totalCost);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function calculate(items) {
    let totalCost = 0;
    let totalPrice = 0;
    let profit = 0;
    for (let i = 0; i < items.length; i++) {
      totalCost += items[i].cost * items[i].amount;
      totalPrice += items[i].price * items[i].amount;
    }
    profit = totalPrice - totalCost;

    return { profit: profit, totalCost: totalCost };
  }

  useEffect(() => {
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
      label: 'Cost',
      children: <p>${nTotalCost}</p>,
    },
    {
      key: '6',
      label: 'Profit',
      children: <p>${profit.toFixed(2)}</p>,
    },
    {
      key: '7',
      label: 'Casher',
      children: <p>{orderDetail.casher}</p>,
      span: 1,
    },
    {
      key: '8',
      label: 'Payment Method',
      children: <p>{orderDetail.method}</p>,
      span: 1,
    },
    {
      key: '9',
      label: 'Discount',
      children: <p>${orderDetail.discount}</p>,
      span: 1,
    },
    {
      key: '10',
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
