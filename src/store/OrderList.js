import React from 'react';

const OrderList = React.createContext({
  orderNumber: 0,
  items: [],
  date: '',
  client: '',
  discount:0,
  tax:0,
  total:0,
  
});

export default OrderList;
