import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

//Components
import MainLayout from './Component/MainLayout/MainLayout.jsx';
//Pages
import Sale from './pages/Sale';
import Buy from './pages/Buy';
import Login from './pages/Login';
import Products from './pages/Products';
import Customer from './pages/Customer';
import Missing from './pages/404.jsx';
import Inquiry from './pages/Inquiry.jsx';
import Checkout from './pages/Checkout.jsx';
import TradeHistory from './pages/TradeHistory.jsx';
import CheckOutContent from './store/CheckOutContent.js';
import HistoryDetail from './pages/HistoryDetail.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

const App = () => {
  const fetchInventory = async () => {
    const result = await axios.get('/api/sale');
    setInventoryData(result.data.data);
  };
  useEffect(() => {
    fetchInventory();
  }, []);
  //inventoryData
  const [inventoryData, setInventoryData] = useState('');
  //Initial cartData

  //Start order number generator
  const oNmber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(
      3,
      '0'
    );

    const orderNumber = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    return orderNumber;
  };
  //End order number generator

  const [cartData, setCartData] = useState({
    order_number: oNmber(),
    items: [],
    date: moment(),
    client: '',
    discount: 0,
    totalAmount: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
  });
  //! function
  const clientNameChange = (name) => {
    const newCart = { ...cartData };
    newCart.client = name;
    setCartData(newCart);
  };

  //! function
  const addItemToCart = (item) => {

    const newCart = { ...cartData };
    if (cartData.items.indexOf(item) === -1) {
      item.amount = 1;
      newCart.items.push(item);
    } else {
      item.amount += 1;
    }
    let subtotal = item.price;
    let item_tax = item.price * 0.07;
    let item_total = item_tax + item.price;
    newCart.tax += item_tax;
    newCart.subtotal += subtotal;
    newCart.totalAmount += 1;
    newCart.total += item_total;
    setCartData(newCart);
  };
  //! function
  const subItemToCart = (item) => {
    const newCart = { ...cartData };
    if (cartData.items.indexOf(item) === -1) {
      console.log(`item doesn't appear`);
    }
    if (item.amount > 1) {
      item.amount -= 1;
      let item_tax = item.price * 0.07;
      let item_total = item_tax + item.price;
      newCart.tax -= item_tax;
      newCart.subtotal -= item.price;
      newCart.totalAmount -= 1;
      newCart.total -= item_total;
    }

    setCartData(newCart);
  };
  //! function
  const removeItemToCart = (item) => {
    const newCart = { ...cartData };
    const index = cartData.items.indexOf(item);
    if (cartData.items.indexOf(item) === -1) {
      console.log(`item doesn't appear`);
    }

    let item_tax = item.price * 0.07 * item.amount;
    let item_subtotal = item.price * item.amount;
    let item_total = item_tax + item_subtotal;
    newCart.tax -= item_tax;
    newCart.subtotal -= item_subtotal;
    newCart.totalAmount -= item.amount;
    newCart.total -= item_total;
    newCart.items.splice(index, 1);

    setCartData(newCart);
  };

//! function
  const editPrice = (item, newPrice, newAmount) => {
    const newCart = { ...cartData };
    const updatedItem = {
      ...item,
      price: newPrice,
      amount: newAmount,
    };

    const oldPrice = item.price;
    const discount = oldPrice - newPrice;
    const discountTax = discount * 0.07 * newAmount;

    newCart.items = newCart.items.map((cartItem) =>
      cartItem.key === updatedItem.key ? updatedItem : cartItem
    );
    newCart.discount += (discount * newAmount);
    newCart.tax -= discountTax;
    newCart.subtotal = newCart.items.reduce((total, cartItem) => total + cartItem.price * cartItem.amount,0);
    newCart.total = newCart.subtotal + newCart.tax;

    setCartData(newCart);
  };


  return (
    <CheckOutContent.Provider
      value={{
        cartData,
        setCartData,
        editPrice,
        addItemToCart,
        subItemToCart,
        removeItemToCart,
        clientNameChange,
        inventoryData,
      }}
    >
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<MainLayout />}>
              <Route path="/sale/*" element={<Sale />}>
                <Route
                  path="order_history"
                  element={<TradeHistory />}
                >
                  <Route
                    path="order_detail/:id"
                    element={<HistoryDetail />}
                  />
                </Route>
                <Route path="checkout" element={<Checkout />} />
              </Route>
              <Route path="/buy" element={<Buy />}></Route>
              <Route
                path="/products/"
                element={<Products />}
              >
                <Route path=':id' element={<ProductDetail/>}></Route>
              </Route>
              <Route path="/customer" element={<Customer />}>
                <Route path="inquiry" element={<Inquiry />}></Route>
              </Route>
            </Route>
            <Route path="*" element={<Missing />}></Route>
          </Routes>
        </Router>
      </div>
    </CheckOutContent.Provider>
  );
};

export default App;
