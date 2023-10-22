import React from 'react';
import styles from './CheckoutForm.module.css';
import { Button, Result } from 'antd';
const CheckoutForm = (props) => {
  //This components to shows items in the cart
  const orderList = props.orderList;
  const {
    editPrice,
    addItemToCart,
    subItemToCart,
    removeItemToCart,
  } = props;
  const handleUpPrice = (item) => {
    let newPrice = document.getElementsByClassName(
      `input${item.key}`
    )[0].value;
    let buttons = document.getElementsByClassName(`adjustButton${item.key}`);
    for (let i = 0; i < buttons.length; i++){
      buttons[i].setAttribute('disabled', 'disabled');
    }
    let newAmount = item.amount;
    editPrice(item, newPrice, newAmount);
  };

  return (
    <div className={`${styles.orderListComponent}`}>
      {orderList && orderList.items.length > 0 ? (
        <div className={`${styles.orderListFrame}`}>
          {orderList.items.map((item) => (
            <div
              key={item.key}
              className={`${styles.orderContainer}`}
            >
              <div className={`${styles.listContainer}`}>
                  <p>Item Code: {item.item_code}</p>
                  <p>Item Code: {item.item}</p>
                  <p>Amount: {item.amount}</p>
                  <p>Final Price: ${item.price}</p>
              </div>
              <div className={`${styles.editPrice}`}>
                <input
                  className={`input${item.key}`}
                  type="text"
                  style={{ width: '20rem' }}
                />
              </div>
              <div className={`${styles.buttons}`}>
                <Button
                  danger
                  onClick={() => handleUpPrice(item)}
                >
                  update
                </Button>
                <Button
                  danger
                  onClick={() => removeItemToCart(item)}
                >
                  remove
                </Button>
              <Button
                className={`adjustButton${item.key}`}
                onClick={() => subItemToCart(item)}
              >
                -
              </Button>
              <Button
                className={`adjustButton${item.key}`}
                onClick={() => addItemToCart(item)}
                type="primary"
              >
                +
              </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Result title="Please add item by search" />
      )}
    </div>
  );
};

export default CheckoutForm;
