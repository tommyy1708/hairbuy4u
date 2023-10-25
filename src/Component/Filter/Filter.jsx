import React from 'react';
import Styles from './Filter.module.css';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Filter = (props) => {
  const { setItemsData, inventoryData, emptySearch } = props;

  const inputChangeHandler = (e) => {
    const input = document.getElementById('filter_input');
    const keyword = input.value.trim();
    const newData = inventoryData.filter(
      (e) => e.item_code.indexOf(keyword) !== -1
    );
    setItemsData(newData);
  };
  return (
    <div className={`${Styles.searchInput}`}>
      <input
        id="filter_input"
        className={`${Styles.content}`}
        type="text"
        placeholder={'Enter here'}
      />
      <Button
        className={`${Styles.content}`}
        icon={<SearchOutlined />}
        onClick={inputChangeHandler}
      >
        Search
      </Button>
      <Button
        className={`${Styles.content}`}
        icon={<SearchOutlined />}
        onClick={() => emptySearch()}
      >
        Show All Items
      </Button>
    </div>
  );
};

export default Filter;
