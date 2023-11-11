import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import CheckOutContent from '../store/CheckOutContent';
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Space, Button, Switch, message, Spin, Select } from 'antd';
import CheckoutForm from '../Component/CheckoutForm/CheckoutForm';
import printJS from 'print-js';
import {
  AddCartDataApi,
  UpdateStockDataApi,
  AddSpendOnClient,
  GetAllInventoryDataApi,
} from '../request/api';

const Checkout = () => {
  const ctx = useContext(CheckOutContent);
  const [searchTerm, setSearchTerm] = useState([]);
  const [spin, setSpin] = useState(false);
  const [payment, setPayment] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);
  const [taxFree, setTaxFree] = useState(true);
  const { phone, name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    ctx.initialCartData();
    // eslint-disable-next-line
  }, [location.pathname]);

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

  const searchClicked = async () => {
    const result = await GetAllInventoryDataApi();
    if (result.status === 200) {
      const { data } = result.data;
      const input = document.getElementById('searchInput');
      const keyword = input.value.trim();
      const newData = data.filter(
        (element) => element.item_code.indexOf(keyword) !== -1
      );
      setSearchTerm(newData);
    }
    return;
  };

  //Recept function
  const printRecept = async () => {
    ctx.cartData.method = payment;
    ctx.cartData.client = name;
    if (payment.length <= 0) {
      message.error('Please choose payment method first');
      return;
    }
    setSpin(true);
    setDisabledButton(true);
    let data = {
      clientSpend: ctx.cartData.total,
      clientName: name,
      clientPhone:phone,
    };
    let returnData = await UpdateStockDataApi({
      data: ctx.cartData.items,
      token: localStorage.getItem('token'),
    });
    try {
      if (returnData.data.errCode !== 0) {
        message.error(`Token expired! Redirecting to login page`);
        setTimeout(() => {
          localStorage.clear();
          navigate('/login');
        }, 3000);
        return;
      } else {
        //This Api for add new order into order database
        await AddCartDataApi({
          cartData: JSON.stringify(ctx.cartData),
        });
        // This api for update stock from inventory database
        await AddSpendOnClient(data);
        printJS({
          printable: ctx.cartData.items,
          type: 'json',
          documentTitle: 'recept',
          repeatTableHeader: true,
          header: `
<div style="text-align:center;font-size:12px;">
      <h3>${process.env.REACT_APP_COMPANY_NAME} Sales Recept </h3>
      <p>${process.env.REACT_APP_COMPANY_ADDRESS1}</p>
      <p>${process.env.REACT_APP_COMPANY_ADDRESS2}</p>
      <p>${process.env.REACT_APP_COMPANY_PHONE}</p>
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
          <p><span style="font-weight: bold;">Date:</span>${
            ctx.cartData.date
          }</p>
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
            'border: 2px solid #3971A5; font-size:14px; text-align:center; white-space:nowrap;',
          properties: [
            { field: 'item_code', displayName: 'Item Code' },
            { field: 'item', displayName: 'Item Name' },
            { field: 'price', displayName: 'Price' },
            { field: 'amount', displayName: 'Quantity' },
          ],
        });
        setTimeout(() => {
          setSpin(false);
          setDisabledButton(false);
          navigate('/history');
        }, [5000]);
      }
    } catch (error) {
      setSpin(false);
      message.info('Something wrong!');
      console.log(error);
    }
  };
  //Quote function
  const printQuote = () => {
    setSpin(true);
    setDisabledButton(true);
    printJS({
      printable: ctx.cartData.items,
      type: 'json',
      documentTitle: 'quote',
      repeatTableHeader: true,
      onPrintDialogClose: () => {
        setSpin(false);
        setDisabledButton(false);
      },
      header: `
      <div style="text-align:center;font-size:12px;">
      <h3>${process.env.REACT_APP_COMPANY_NAME} Sales Quote </h3>
      <p>${process.env.REACT_APP_COMPANY_ADDRESS1}</p>
      <p>${process.env.REACT_APP_COMPANY_ADDRESS2}</p>
      <p>${process.env.REACT_APP_COMPANY_PHONE}</p>
      </div>
      <div style="font-size:12px;display:flex;" >
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
          <p><span style="font-weight: bold;">Date:</span>${
            ctx.cartData.date
          }</p>
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
        'border: 2px solid #3971A5; font-size:12px; text-align:center; white-space:nowrap;',
      properties: [
        { field: 'item_code', displayName: 'Item Code' },
        { field: 'item', displayName: 'Item Name' },
        { field: 'price', displayName: 'Price' },
        { field: 'amount', displayName: 'Quantity' },
      ],
    });

    return;
  };

  const methodChange = (value) => {
    setPayment(value);
  };

  const switchChanged = (e) => {
    if (e === false && ctx.cartData.tax !== 0) {
      setTaxFree(false);
      ctx.minusTax();
    } else if (e === true && ctx.cartData.tax === 0) {
      setTaxFree(true);
      ctx.plusTax();
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
          <p style={{ backgroundColor: '#dc1010', color: '#fff' }}>
            !!! Before editing price make sure you confirm the final
            amount of this item !!!
          </p>
        </div>
        <div className="orderTable">
          <CheckoutForm
            orderColumns={orderColumns}
            taxFree={taxFree}
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
              <p>
                Tax:$
                {ctx.cartData.tax.toFixed(2)}
              </p>
              <p>Total:${ctx.cartData.total.toFixed(2)}</p>
              <div>
                Payment:
                <Select
                  className="paymentValue"
                  placeholder="Choose...."
                  style={{
                    width: 120,
                  }}
                  onChange={methodChange}
                  options={[
                    {
                      value: 'Credit or Debit Card',
                      label: 'Credit/Debit Card',
                    },
                    {
                      value: 'Cash',
                      label: 'Cash',
                    },
                    {
                      value: 'Check',
                      label: 'Check',
                    },
                    {
                      value: 'Bank Transfer',
                      label: 'Bank Transfer',
                    },
                    {
                      value: 'Paypal',
                      label: 'Paypal',
                    },
                    {
                      value: 'others',
                      label: 'others',
                    },
                  ]}
                />
              </div>
              <div className="clientNameFrame"></div>
              <Space size={20}>
                <Button
                  type="primary"
                  onClick={() => printQuote()}
                  disabled={disabledButton}
                >
                  Quote
                </Button>
                <Button
                  type="primary"
                  onClick={() => printRecept()}
                  disabled={disabledButton}
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
