import React from 'react';
import { Button } from 'antd';
import {
  SearchOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import styles from './Option.module.css';
import { Routes, Route, Link } from 'react-router-dom';
import Inquiry from '../../pages/Inquiry';
import Checkout from '../../pages/Checkout';

const Option = (props) => {
  const { options } = props;

  return (
    <div className={`${styles.option}`}>
      <div className={`${styles.option_content}`}>
        {options.map((item) =>(
            <div key={item.key} className={`${styles.buttons}`}>
              <Link to={item.address}>
                <Button type="primary">{item.name}</Button>
              </Link>
            </div>
        ))}

      </div>
    </div>
  );
};

export default Option;
