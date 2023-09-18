import React from 'react';
import { Button } from 'antd';
import { SearchOutlined,ShoppingCartOutlined  } from '@ant-design/icons';
import styles from './Option.module.css'
import {Routes,Route, Link } from 'react-router-dom';
import Inquiry from '../../pages/Inquiry';
import Checkout from '../../pages/Checkout';

const Option = () => {
  return (
    <div className={`${styles.option}`}>
      <div className={`${styles.option_content}`}>
        <div className={`${styles.buttons}`}>
          <Link to="inquiry">
            <Button type="primary">Inquiry</Button>
          </Link>{' '}
        </div>
        <div className={`${styles.buttons}`}>
          <Link to="checkout">
            <Button type="primary">Checkout</Button>
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="inquiry" element={<Inquiry />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default Option;
