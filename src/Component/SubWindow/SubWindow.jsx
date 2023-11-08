import React from 'react';
import styles from './SubWindow.module.css';
import { DollarCircleFilled, SmileFilled } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';
import env from 'react-dotenv';

const SubWindow = (props) => {
  const { username } = props;

  return (
    <div className={`${styles.frame}`}>
      <div>
        <h4>Hi {username}!</h4>
        <p>
          Welcome to {process.env.REACT_APP_COMPANY_NAME} CMS System
        </p>
      </div>
      <div className={`${styles.calendar}`}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title="October"
              value={112893}
              prefix={<DollarCircleFilled />}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Sum of 2023"
              value={112893}
              precision={2}
              prefix={<DollarCircleFilled />}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="New Client"
              value={199}
              prefix={<SmileFilled />}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="September"
              value={45678}
              prefix={<DollarCircleFilled />}
            />
          </Col>
        </Row>
        {/* <Calendar onPanelChange={onPanelChange} /> */}
      </div>
    </div>
  );
};

export default SubWindow;
