import React, { useContext, useEffect, useState } from 'react';
import styles from './CheckoutForm.module.css';

const CheckoutForm = (props) => {
  console.log('props cartdata', props.orderList.items);

  return (
    <div>
      {props.orderList && props.orderList.length > 0 ? (
        props.orderList.items.map((order, index) => (
          <div
            key={`order_${index}`}
            className={`${styles.orderContainer}`}
          >
            <h2>Order #{index + 1}</h2>
            <ul className={`${styles.listContainer}`}>
              {order.items.map((item, itemIndex) => (
                <li
                  key={`item_${itemIndex}`}
                  className={`${styles.listItem}`}
                >
                  <p>Item Code: {item.item_code}</p>
                  <p>Amount: {item.amount}</p>
                  <p>MSRP: {item.msrp}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No orders to display.</p>
      )}
    </div>
  );
};

export default CheckoutForm;
