import React, { useContext, useEffect, useState } from 'react';
import styles from './CheckoutForm.module.css';

const CheckoutForm = (props) => {
  const orderList = props.orderList;

  return (
    <>
      {orderList && orderList.items.length > 0 ? (
        <div className={`${styles.orderListFrame}`}>
          {orderList.items.map((order) => (
            <div
              key={order.key}
              className={`${styles.orderContainer}`}
            >
              <ul className={`${styles.listContainer}`}>
                <li className={`${styles.listItem}`}>
                  <p>Item Code: {order.item_code}</p>
                  <p>Item Code: {order.item}</p>
                  <p>Amount: {order.amount}</p>
                  <p>MSRP: ${order.msrp}</p>
                </li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>cart empty</p>
      )}
    </>
  );
};

export default CheckoutForm;
