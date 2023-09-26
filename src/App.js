import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import axios from 'axios';
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
/**
 *
 * @cartData structure{
 *  orderNumber: oNmber(),
    items: [
        // key: '',
        // item_code: '',
        // usc: '',
        // item: '',
        // qty: 0,
        // msrp: 0,
        // cost: 0,
        // category: '',
        // amount: 0,
    ],
    date: '',
    client: '',
    discount: 0,
    totalAmount: 0,
    tax: 0,
    total: 0,
 * }
 *
 */
const App = () => {
  const fetchInventory = async () => {
    const result = await axios.get('/api/sale');
    setInventoryData(result.data.data);
  };
  useEffect(() => {
    fetchInventory();
  }, []);

  //Test data
  // const productsData = [
  //   {
  //     key: '1',
  //     item_code: 'BD1120448',
  //     usc: 32,
  //     item: 'Human Hair Bundles, Natural Black, Straight',
  //     qty: 99,
  //     msrp: 124,
  //     cost: 50,
  //     category: 'Swiss Lace Wigs & Bob Wigs',
  //     amount: 0,
  //   },
  // ];
  // const [orderHistory, setOrderHistory] = useState('');
  //inventoryData
  const [inventoryData, setInventoryData] = useState([]);
  //Initial cartData

  //order number generator
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

  const [cartData, setCartData] = useState({
    orderNumber: oNmber(),
    items: [],
    date: '',
    client: '',
    discount: 0,
    totalAmount: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
  });

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
    // let tax = (item.price*10000 * 0.07/10000);
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
    // let total = newCart.tax + item.price * item.amount;
    let item_tax = item.price * 0.07 * item.amount;
    let item_subtotal = item.price * item.amount;
      let item_total = item_tax + item_subtotal;
    newCart.tax -= item_tax;
    newCart.subtotal -= item_subtotal;
    newCart.totalAmount -= item.amount;
    newCart.total -= item_total;
    //   parseFloat(
    //   item.amount * item.price * 1.07
    // ).toFixed(2);
    newCart.items.splice(index, 1);

    setCartData(newCart);
  };

  return (
    <CheckOutContent.Provider
      value={{
        cartData,
        setCartData,
        addItemToCart,
        subItemToCart,
        removeItemToCart,
        inventoryData,
        // orderHistory,
      }}
    >
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<MainLayout />}>
              <Route path="/sale/*" element={<Sale />}>
                <Route path="checkout" element={<Checkout />} />
                <Route
                  path="trade_history/:id?"
                  element={<TradeHistory />}
                ></Route>
              </Route>
              <Route path="/buy" element={<Buy />}></Route>
              <Route
                path="/products/*"
                element={<Products />}
              ></Route>
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
