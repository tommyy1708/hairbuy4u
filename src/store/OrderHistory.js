import React, { useState } from 'react';


export const OrderList = React.createContext({
  orderNumber: 0,
  items: [],
  date: '',
  client: '',
  discount: 0,
  tax: 0,
  total: 0,
});

export const AddToCart = (item) => {
  const [items, setItems] = useState(...items);
  const newItems = [ ...items ];
  newItems.push(item);
  setItems(newItems);
  return;
}

