import React from 'react';

const CheckOutContent = React.createContext({
  cartData: [
    {
      orderNumber: `OD+${new Date()}`,
      items: [],
      date: new Date(),
      client: '',
      discount: 0,
      amount: 0,
      tax: 0,
      total: 0,
    },
  ],
  inventoryData: [
    {
      key: '',
      item_code: '',
      usc: '',
      item: '',
      qty: 0,
      msrp: 0,
      cost: 0,
      category: '',
    },
  ],
  orderHistory: [
    {
      orderNumber: 0,
      items: [],
      date: '',
      client: '',
      discount: 0,
      tax: 0,
      total: 0,
    },
  ],
  addItemToCart: () => {},
  subItemToCart: () => {},
});

export default CheckOutContent;
