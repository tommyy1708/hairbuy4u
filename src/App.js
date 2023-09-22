import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
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
const App = () => {
  //Test data
  const ItemsData = [
    {
      key: '1',
      item_code: 'BD1120448',
      usc: 32,
      item: 'Human Hair Bundles, Natural Black, Straight',
      qty: 99,
      msrp: 124,
      cost: 50,
      category: 'Swiss Lace Wigs & Bob Wigs',
      amount: 1,
    },
  ];
  const [orderHistory, setOrderHistory] = useState('');
  //inventoryData
  const [inventoryData, setInventoryData] = useState(ItemsData);
  //Initial cartData
  const [cartData, setCartData] = useState({
    orderNumber: '',
    items: [
      {
        key: 'kjhgf',
        item_code: 'fsdfdsf',
        usc: 'dsfdsf',
        item: 'fsdfsdfsf',
        qty: 1,
        msrp: 124,
        cost: 12,
        category: 'fsdfds',
        amount: 1,
      },
    ],
    date: '',
    client: '',
    discount: 0,
    totalAmount: 1,
    tax: 0,
    total: 0,
  });

  const addItemToCart = (item) => {
    const newCart = { ...cartData };
    if (cartData.items.indexOf(item) === -1) {
      newCart.items.push(item);
    } else {
      item.amount += 1;
    }
    newCart.tax += item.msrp * 0.07;
    newCart.totalAmount += 1;
    newCart.total += item.msrp;
    setCartData(newCart);
    console.log(cartData.items);
  };

  const subItemToCart = (item) => {
    const newCart = { ...cartData };
    item.amount -= 1;
    if (item.amount === 0) {
      newCart.items.splice(newCart.items.indexOf(item), 1);
    }

    newCart.totalAmount -= 1;
    newCart.totalPrice -= item.msrp;

    setCartData(newCart);
  };

  return (
    <CheckOutContent.Provider
      value={{
        cartData,
        setCartData,
        addItemToCart,
        inventoryData,
        orderHistory,
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
