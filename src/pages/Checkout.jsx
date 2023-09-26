import React, { useContext, useState } from 'react';
import CheckOutContent from '../store/CheckOutContent';
import {Link} from 'react-router-dom'
import {Space,Button} from 'antd'
import CheckoutForm from '../Component/CheckoutForm/CheckoutForm';
import printJS from 'print-js';
const Checkout = () => {
  const ctx = useContext(CheckOutContent);
  const [searchTerm, setSearchTerm] = useState('');

  const orderColumns = [
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
      title: 'SalePrice',
      key: 'saleprice',
      dataIndex: 'saleprice',
      render: (_, record) => (
        <>
          <Space key={record.key}>
            ${parseFloat(record.saleprice).toFixed(2)}
          </Space>
        </>
      ),
    },
  ];

  const searchClicked = () => {
    const input = document.getElementById('searchInput');
    const keyword = input.value.trim();
    const newData = ctx.inventoryData.filter(
      (element) => element.item_code.indexOf(keyword) !== -1
    );
    setSearchTerm(newData);
  };

// template for print
  const printRecept=()=> {
      printJS({
        printable: ctx.cartData.items,
        type: 'json',
        header: `<p>Total:$${ctx.cartData.total}</p>`,
        properties: [
         'item_code',
         'item',
         'price',
          'amount',
         'subtotal',
         'tax',
         'total',
        ],
      });
  }
  return (
    <div>
      <div className="searchInput">
        <input id="searchInput" type="text" />
        <button onClick={searchClicked}>Search</button>
      </div>
      <div className="searchList">
        <ul>
          {searchTerm.length > 0
            ? searchTerm.map((item) => (
                <li key={item.key} className="searchItem">
                  <h3>{item.item_code}</h3>
                  <p>${item.price}</p>
                  <h4>{item.item}</h4>
                  <button onClick={() => ctx.addItemToCart(item)}>
                    add To Cart
                  </button>
                </li>
              ))
            : null}
        </ul>
      </div>
      <div className="orderDetails">
        <div className="orderTable">
          <CheckoutForm
            orderColumns={orderColumns}
            orderList={ctx.cartData}
            addItemToCart={ctx.addItemToCart}
            subItemToCart={ctx.subItemToCart}
            removeItemToCart={ctx.removeItemToCart}
          />
        </div>
        <div className="buttonContainer">
          {ctx.cartData && ctx.cartData.items.length > 0 ? (
            <div className={'orderSummarize'}>
              <h3>OrderNumber:</h3>
              <h5>{ctx.cartData.orderNumber}</h5>
              <p>Discount:${(ctx.cartData.discount).toFixed(2)}</p>
              <p>Amount:{ctx.cartData.totalAmount}</p>
              <p>Subtotal:${(ctx.cartData.subtotal).toFixed(2)}</p>
              <p>Tax:${(ctx.cartData.tax).toFixed(2)}</p>
              <p>Total:${(ctx.cartData.total).toFixed(2)}</p>
              <Space size={20}>
                <Button>Cancel</Button>
                <Button type="primary" onClick={printRecept}>
                  Submit
                </Button>
              </Space>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
