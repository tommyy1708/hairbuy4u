import React, { useContext, useEffect, useState } from 'react';
import CheckOutContent from '../store/CheckOutContent';
import { Link, useParams } from 'react-router-dom';
import { Space, Button, Switch, message, Spin, Select } from 'antd';
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
  const [payment, setPayment] = useState('');
  const { phone, name } = useParams();
  ctx.cartData.client = name;

  /*Start Here segment of HTML and function for input client name at checkout page
  const handleInputChange = () => {
    let clientInput = document.getElementById('clientInput');
    ctx.clientNameChange(clientInput.value);
  };

  <input
        id="clientInput"
        placeholder="Client Name"
        type="text"
        onChange={handleInputChange}
    />
    End
    */

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

  const methodChange = (value) => {
    setPayment(value);
    ctx.cartData.method = payment;
  };
  const printRecept = async () => {
    const items = ctx.cartData.items;
    const token = localStorage.getItem('token');
    let data = {
      clientSpend: ctx.cartData.total,
      clientName: name,
    };
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
      await AddSpendOnClient(data);

      if (returnData.data.errCode !== 0) {
        message.error('Something Wrong!');
        return;
      } else {
        printJS({
          printable: ctx.cartData.items,
          type: 'json',
          header: `
       <div style="text-align:center;font-size:14px;">
          <div style="padding:0;">
      <h3>Hair Natural Inc. Sales Recept</h3>
      <h4>*****(Save more Pay less at our Website: www.hairbuy4u.com )*****</h4>
      <p>4980 NW 165th Street Suite A21</p>
      <p>Miami Gardens, Florida 33014 United States</p>
      <p>(305)454-9121</p>
          </div>
      </div>
      <div styles:“line-height:14px; width:100px; margin:0 auto; text-align:right;” >
       <p>Client:${ctx.cartData.client}</p>
       <p>Phone Number:${phone}</p>
       <p>Casher:${ctx.cartData.casher}</p>
       <p>Order Number:${ctx.cartData.order_number}</p>
      <p>Subtotal:$${ctx.cartData.subtotal.toFixed(2)}</p>
      <p>Tax(7%):$${ctx.cartData.tax.toFixed(2)}</p>
      <p>Total:$${ctx.cartData.total.toFixed(2)}</p>
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
    if (payment.length <= 0) {
      message.error('Please choose payment method');
      return;
    }
    setSpin(true);
    printJS({
      printable: ctx.cartData.items,
      type: 'json',
      documentTitle: 'quote',
      repeatTableHeader:true,
      header: `
      <div style="text-align:center;font-size:14px;">
      <h3>Hair Natural Inc. Sales Quote </h3>
      <h4>*****(Save more Pay less at our Website: www.hairbuy4u.com )*****</h4>
      <p>4980 NW 165th Street Suite A21</p>
      <p>Miami Gardens, Florida 33014 United States</p>
      <p>(305)454-9121</p>
      </div>
      <div style="font-size:10px;display:flex;" >
        <div style="text-align:left;margin-right:15px;">
               <p><span style="font-weight: bold;">Order Number:</span>${
                 ctx.cartData.order_number
               }</p>
          <p><span style="font-weight:bold">Client:</span>${
            ctx.cartData.client
          }</p>
          <p><span style="font-weight: bold;">Phone Number:</span>${phone}</p>
          <p><span style="font-weight: bold;">Casher:</span>${
            ctx.cartData.casher
          }</p>

        </div>
        <div style="text-align:right;margin-right:15px;">
          <p><span style="font-weight: bold;">Date:</span>${ctx.cartData.date}</p>
          <p><span style="font-weight: bold;">Subtotal:</span>$${ctx.cartData.subtotal.toFixed(
            2
          )}</p>
          <p><span style="font-weight: bold;">Tax(7%):</span>$${ctx.cartData.tax.toFixed(
            2
          )}</p>
          <p><span style="font-weight: bold;">Total:</span>$${ctx.cartData.total.toFixed(
            2
          )}</p>
        </div>
      </div>
      `,
      gridHeaderStyle: 'border: 2px solid #3971A5;',
      gridStyle:
        'border: 2px solid #3971A5; font-size:10px; text-align:center; white-space:nowrap;',
      properties: [
        { field: 'item_code', displayName: 'Item Code' },
        { field: 'item', displayName: 'Item Name' },
        { field: 'price', displayName: 'Price' },
        { field: 'amount', displayName: 'Quantity' },
      ],
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

  const switchChanged = (e) => {
    if (e === false) {
      ctx.minusTax();
    } else {
    }
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
              <Switch
                checkedChildren="Tax"
                unCheckedChildren="No Tax"
                onChange={switchChanged}
                defaultChecked
              ></Switch>
              <h3>OrderNumber:</h3>
              <h5>{ctx.cartData.order_number}</h5>
              <p>Amount:{ctx.cartData.totalAmount}</p>
              <p>Subtotal:${ctx.cartData.subtotal.toFixed(2)}</p>
              <div>
                Tax:$
                {ctx.cartData.tax.toFixed(2)}
              </div>
              <p>Total:${ctx.cartData.total.toFixed(2)}</p>
              <p>Payment: </p>
              <Select
                className="paymentValue"
                placeholder="Choose...."
                style={{
                  width: 130,
                }}
                onChange={methodChange}
                options={[
                  {
                    value: 'CreditCard',
                    label: 'Credit Card',
                  },
                  {
                    value: 'Cash',
                    label: 'Cash',
                  },
                  {
                    value: 'Check',
                    label: 'Check',
                  },
                ]}
              />
              <div className="clientNameFrame"></div>
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
