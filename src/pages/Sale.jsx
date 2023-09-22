import React, { useContext, useState } from 'react';
import Option from '../Component/Option/Option';
import Checkout from './Checkout';
import TradeHistory from './TradeHistory';
import {useLocation} from 'react-router-dom'
import CheckOutContent from '../store/CheckOutContent';
const Sale = () => {
  const ctx = useContext(CheckOutContent)
  //@OPTIONS is settings of direction for sub pages
  const OPTIONS = [
    {
      key: '1',
      address: 'trade_history',
      name: 'trade_history',
    },
    {
      key: '2',
      address: 'checkout',
      name: 'checkout',
    },
  ];

  //Start get path name
  const { pathname } = useLocation();
  //end get path name



  return (
    <div className="sale">
      <Option options={OPTIONS}></Option>
      {pathname.indexOf('checkout') !== -1 ? (
        <Checkout />
      ) : (
        <TradeHistory />
      )}
    </div>
  );
}

export default Sale;
