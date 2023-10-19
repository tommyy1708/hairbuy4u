import React from 'react';
import styles from './SubWindow.module.css';
import { Calendar } from 'antd';
const SubWindow = (props) => {
  const { username } = props;
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <div className={`${styles.frame}`}>
      <div>
        <h4>Hi {username}!</h4>
        <p>Welcome to Hair Natural Inc. CMS System</p>
      </div>
      <div className={`${styles.calendar}`}>
        <Calendar onPanelChange={onPanelChange} />
      </div>
    </div>
  );
};

export default SubWindow;
