import React, { useContext, useState } from 'react';
import CheckOutContent from '../store/CheckOutContent';
import { Link } from 'react-router-dom';
import { Space, Button, message, Spin } from 'antd';
import CheckoutForm from '../Component/CheckoutForm/CheckoutForm';
import printJS from 'print-js';
import {
  AddCartDataApi,
  UpdateStockDataApi,
  AddSpendOnClient,
} from '../request/api';

const Checkout = () => {
  const ctx = useContext(CheckOutContent);
  const [searchTerm, setSearchTerm] = useState('');
  const [spin, setSpin] = useState(false);

  const handleInputChange = () => {
    let clientInput = document.getElementById('clientInput');
    ctx.clientNameChange(clientInput.value);
  };

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
      key: 'price',
      dataIndex: 'price',
      render: (_, record) => (
        <>
          <Space key={record.key}>
            ${parseFloat(record.price).toFixed(2)}
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

  const printRecept = async () => {
    const items = ctx.cartData.items;
    const token = localStorage.getItem('token');
    const clientName = ctx.cartData.client;
    let data = {
      clientSpend: ctx.cartData.total,
      clientName: ctx.cartData.client
    }
    let returnData = await UpdateStockDataApi({
      data: items,
      token: token,
    });
    setSpin(true);
    try {
      //This Api for add new order into order database
      await AddCartDataApi({
        cartData: JSON.stringify(ctx.cartData),
      });
      // This api for update stock from inventory database
      if (clientName !== null) {
        const returnResult =  await AddSpendOnClient(data);
        console.log("🚀 ~ file: Checkout.jsx:102 ~ printRecept ~ data:", data)


      }
      if (returnData.data.errCode !== 0) {
        message.error('Something Wrong!');
        return;
      } else {
        printJS({
          printable: ctx.cartData.items,
          type: 'json',
          header: `
        <div>
        <div style="padding:0; margin=0; font-size:14px;line-height: normal;">
        <h4>Hair Natural Inc. Receipt
        (Save more Pay less at our Website: www.hairbuy4u.com )</h4>
        <p>4980 NW 165th Street Suite A21</p>
        <p>Miami Gardens, Florida 33014 United States</p>
        <p>(305)454-9121</p>
        </div>
        <div styles:“line-height:14px; width:100px” >
        <p>Client:${ctx.cartData.client}</p>
        <p>Subtotal:$${ctx.cartData.subtotal.toFixed(2)}</p>
        <p>Tax(7%):$${ctx.cartData.tax.toFixed(2)}</p>
        <p>Total:$${ctx.cartData.total.toFixed(2)}</p>
        </div>
         </div>
        `,
          properties: ['item_code', 'item', 'price', 'amount'],
        });
        setSpin(false);
        setTimeout(() => {
          window.location.reload(false);
        }, [5000]);
      }
    } catch (error) {
      setSpin(false);
      message.info('Something wrong!');
      console.log(error);
    }
  };

  const printQuote = () => {
    setSpin(true);
    printJS({
      printable: ctx.cartData.items,
      type: 'json',
      header: `
      <div>
      <div style="padding:0; margin=0; font-size:14px;line-height: normal;">
      <h4>Hair Natural Inc. Receipt
      (Save more Pay less at our Website: www.hairbuy4u.com )</h4>
      <p>4980 NW 165th Street Suite A21</p>
      <p>Miami Gardens, Florida 33014 United States</p>
      <p>(305)454-9121</p>
      </div>
      <div styles:“line-height:14px; width:100px” >
       <p>Client:${ctx.cartData.client}</p>
      <p>Subtotal:$${ctx.cartData.subtotal.toFixed(2)}</p>
      <p>Tax(7%):$${ctx.cartData.tax.toFixed(2)}</p>
      <p>Total:$${ctx.cartData.total.toFixed(2)}</p>
      </div>
       </div>
      `,
      properties: ['item_code', 'item', 'price', 'amount'],
    });
    try {
      setTimeout(() => {
        window.location.reload(false);
      }, [10000]);
    } catch (error) {
      message.info('Something wrong!');
      console.log(error);
    }
    return;
  };

  return (
    <div>
      {spin ? <Spin className="spinFrame" size="large" /> : null}
      <div className="searchInputFrame">
        <input id="searchInput" type="text" />
        <button onClick={searchClicked}>Search</button>
      </div>
      <div className="searchList">
        <ul>
          {searchTerm.length > 0
            ? searchTerm.map((item) => (
                <li key={item.key} className="searchItem">
                  <p>{item.item_code}</p>
                  <p>${item.price}</p>
                  <p>{item.item}</p>
                  <p>{item.qty}</p>
                  <button onClick={() => ctx.addItemToCart(item)}>
                    add To Cart
                  </button>
                </li>
              ))
            : null}
        </ul>
      </div>
      <div className="orderDetails">
        <div className="note">
          <p>
            !!! Before editing price make sure you confirm to the
            final amount of this item !!!
          </p>
        </div>
        <div className="orderTable">
          <CheckoutForm
            orderColumns={orderColumns}
            orderList={ctx.cartData}
            addItemToCart={ctx.addItemToCart}
            subItemToCart={ctx.subItemToCart}
            editPrice={ctx.editPrice}
            removeItemToCart={ctx.removeItemToCart}
          />
        </div>
        <div className="buttonContainer">
          {ctx.cartData && ctx.cartData.items.length > 0 ? (
            <div className={'orderSummarize'}>
              <h3>OrderNumber:</h3>
              <h5>{ctx.cartData.order_number}</h5>
              <p>Amount:{ctx.cartData.totalAmount}</p>
              <p>Subtotal:${ctx.cartData.subtotal.toFixed(2)}</p>
              <p>Tax:${ctx.cartData.tax.toFixed(2)}</p>
              <p>Total:${ctx.cartData.total.toFixed(2)}</p>
              <div className="clientNameFrame">
                <p>Client Name:</p>
                <input
                  id="clientInput"
                  placeholder="Client Name"
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
              <Space size={20}>
                <Button type="primary" onClick={() => printQuote()}>
                  Quote
                </Button>
                <Button type="primary" onClick={() => printRecept()}>
                  Recept
                </Button>
              </Space>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
