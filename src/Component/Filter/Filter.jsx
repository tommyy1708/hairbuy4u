import React from 'react';
import Styles from './Filter.moducle.css';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const Filter = () => {

  const inputChangeHandler = (data) => {
    const input = document.getElementById('filter_input');
    const keyword = input.value.trim();
  };
  return (
    <div className={Styles.searchInput}>
      <input id='filter_input' type="text" placeholder={'Please input here'} />
      <Button icon={<SearchOutlined />} onClick={inputChangeHandler}>
      Search
      </Button>
    </div>
  );
};

export default Filter;
