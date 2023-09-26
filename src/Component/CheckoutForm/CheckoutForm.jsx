import React from 'react';
import styles from './CheckoutForm.module.css';
import { Button } from 'antd';
const CheckoutForm = (props) => {
  //This components to shows items in the cart
  const orderList = props.orderList;
  const { addItemToCart, subItemToCart, removeItemToCart } = props;
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
                  <p>MSRP: ${order.price}</p>
                </li>
              </ul>

              <Button danger onClick={() => removeItemToCart(order)}>
                remove
              </Button>
              <Button
                type="primary"
                onClick={() => subItemToCart(order)}
              >
                -
              </Button>
              <Button
                onClick={() => addItemToCart(order)}
                type="primary"
              >
                +
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <h2>cart empty</h2>
      )}
    </>
  );
};

export default CheckoutForm;
