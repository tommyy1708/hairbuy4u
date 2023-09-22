import React, { useContext, useEffect, useState } from 'react';
import CheckOutContent from '../store/CheckOutContent';
import {Link} from 'react-router-dom'
import { Table ,Space,Button, message} from 'antd'
import CheckoutForm from '../Component/CheckoutForm/CheckoutForm';
const Checkout = () => {
  const ctx = useContext(CheckOutContent);
  console.log("checkout page",ctx.cartData);
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

    const addItemToCart = (item) => {
      const newCart = { ...ctx.cartData };
      if (ctx.cartData.items.indexOf(item) === -1) {
        newCart.items.push(item);
      } else {
        item.amount += 1;
      }
      newCart.tax += item.msrp * 0.07;
      newCart.totalAmount += 1;
      newCart.total += item.msrp;
      ctx.setCartData(newCart);
    };

  const searchClicked = () => {
    const input = document.getElementById('searchInput');
    const keyword = input.value.trim();
    const newData = ctx.inventoryData.filter(
      (element) => element.item_code.indexOf(keyword) !== -1
    );
    setSearchTerm(newData);
  };

  return (
    <div>
      <div className="searchInput">
        <input id="searchInput" type="text" />
        <button onClick={searchClicked}>Search</button>
      </div>

      <div>
        <ul className="searchContainer">
          {searchTerm.length > 0
            ? searchTerm.map((item) => (
                <li key={item.key} className="searchItem">
                  <h3>{item.item_code}</h3>
                  <p>${item.msrp}</p>
                  <h4>{item.item}</h4>
                  <button onClick={() => addItemToCart(item)}>
                    add To Cart
                  </button>
                </li>
              ))
            : null}
        </ul>
      </div>

      <div className="orderTable">
        <CheckoutForm
          orderColumns={orderColumns}
          orderList={ctx.cartData}/>
      </div>
      <div className="buttonContainer">
        <Space size={100}>
          <Button>Submit</Button>
          <Button type="primary">Cancel</Button>
        </Space>
      </div>
    </div>
  );
}

export default Checkout;
