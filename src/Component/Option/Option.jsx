import React from 'react';
import { Button } from 'antd';
import styles from './Option.module.css';
import {  Link } from 'react-router-dom';


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
