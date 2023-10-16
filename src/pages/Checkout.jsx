import React, { useContext, useState } from 'react';
import CheckOutContent from '../store/CheckOutContent';
import { Link } from 'react-router-dom';
import { Space, Button, Modal, message } from 'antd';
import CheckoutForm from '../Component/CheckoutForm/CheckoutForm';
import printJS from 'print-js';
import { CartDataApi } from '../request/api';
const Checkout = () => {
  const ctx = useContext(CheckOutContent);
  const [searchTerm, setSearchTerm] = useState('');
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


  // Start template for print
  const printRecept = () => {
    printJS({
      printable: ctx.cartData.items,
      type: 'json',
      header: `
      <div>
      <div style="padding:0; margin=0; font-size:14px;line-height: normal;">
      <h4>Hairbuy4u Receipt
      (Save more Pay less at our Website: www.hairbuy4u.com )</h4>
      <p>4980 NW 165th Street Suite A21</p>
      <p>Miami Gardens, Florida 33014 United States</p>
      <p>(305)454-9121</p>
      </div>
      <div styles:“line-height:14px; width:100px” >
      <p>Subtotal:$${ctx.cartData.subtotal.toFixed(2)}</p>
      <p>Tax(7%):$${ctx.cartData.tax.toFixed(2)}</p>
      <p>Total:$${ctx.cartData.total.toFixed(2)}</p>
      </div>
       </div>
      `,
      properties: ['item_code', 'item', 'price', 'amount'],
      onPrintDialogClose: () => {
        CartDataApi({
          cartData: JSON.stringify(ctx.cartData),
        }).then((res) => {
          if (res.errCode === 0) {
            message.success(res.data.message);
          } else {
            message.info(res.data.message);
          }
        });

        Modal.destroyAll();
        ctx.setCartData('');
        message.loading(`Print...`, [1500]);

        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
        // message.success('Order Success!');
      },
    });
  };
  //end template for print

  const printQuote = () => {
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
      <p>Subtotal:$${ctx.cartData.subtotal.toFixed(2)}</p>
      <p>Tax(7%):$${ctx.cartData.tax.toFixed(2)}</p>
      <p>Total:$${ctx.cartData.total.toFixed(2)}</p>
      </div>
       </div>
      `,
      properties: ['item_code', 'item', 'price', 'amount'],
      onPrintDialogClose: () => {
        Modal.destroyAll();
        ctx.setCartData('');
        message.loading(`Print...`, [2000]);
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
        message.success('Order Success!');
      },
    });
  };

  return (
    <div>
      <div className="searchInputFrame">
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
        <div className="note">
          <p>!!! Before editing price make sure you confirm to the final amount of this item !!!</p>
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
                <Button
                  onClick={() => {
                    Modal.confirm({
                      title: 'Quote Confirm',
                      content:
                        'This action to print out the quotation',
                      footer: (_, { CancelBtn }) => (
                        <>
                          <CancelBtn />
                          <Button type="primary" onClick={printQuote}>
                            Print
                          </Button>
                        </>
                      ),
                    });
                  }}
                >
                  Quote
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    Modal.confirm({
                      title: 'Confirm',
                      content:
                        'This action to print out the recept and not allow undo!!!',
                      footer: (_, { CancelBtn }) => (
                        <>
                          <CancelBtn />
                          <Button
                            type="primary"
                            onClick={printRecept}
                          >
                            Print
                          </Button>
                        </>
                      ),
                    });
                  }}
                >
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
