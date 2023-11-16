import React, { useState } from 'react';
import {
  DatePicker,
  Space,
  Table,
  Button,
  Col,
  Row,
  Statistic,
  message,
} from 'antd';
import { InquiryOrderDataOnDate } from '../request/api';

const Report = () => {
  const [begin, setBegin] = useState('');
  const [end, setEnd] = useState('');
  const [aOrderData, setAOrderData] = useState('');
  const [nTotalProfit, setNTotalProfit] = useState(0);
  const [nTotalCost, setNTotalCost] = useState(0);
  const [nRevenue, setNRevenue] = useState(0);
  const [dateNotNone, setDateNotNone] = useState(false);
  const { RangePicker } = DatePicker;

  const gotData = async () => {
    if (dateNotNone) {
      const data = {
        begin: begin,
        end: end,
      };
      const aOrderData = await InquiryOrderDataOnDate(data);
      if (aOrderData) {
        setAOrderData(aOrderData.data.data.aReports);
        setNTotalCost(aOrderData.data.data.aStatistics[0].totalCost);
        setNTotalProfit(
          aOrderData.data.data.aStatistics[0].totalProfit
        );
        setNRevenue(aOrderData.data.data.aStatistics[0].totalTotal);
      }
    } else {
      message.info('Please select date!');
      return;
    }
  };

  const onChange = (date, dateString) => {
    if (dateString !== '') {
      setBegin(dateString[0]);
      setEnd(dateString[1]);
      setDateNotNone(true);
      return;
    } else {
      message.info('Date invalid, reselect date!');
      return;
    }
  };

  const columns = [
    {
      title: 'Order Number',
      dataIndex: 'order_number',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Client Name',
      dataIndex: 'client',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
    },
    {
      title: 'Total Cost',
      dataIndex: 'total_cost',
    },
    {
      title: 'Margin',
      dataIndex: 'profit',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'Payment Method',
      dataIndex: 'method',
    },
  ];
  return (
    <div>
      <div className="report-header">
        <div>
          <Space>
            <RangePicker
              className="report-datePicker"
              onChange={onChange}
              inputReadOnly={true}
            />
            <Button type="primary" onClick={gotData}>
              Get Report
            </Button>
          </Space>
        </div>
        <div>
          <Row gutter={100}>
            <Col span={50}>
              <Statistic
                title="Total Cost($)"
                value={nTotalCost}
                precision={2}
              />
            </Col>
            <Col span={50}>
              <Statistic
                title="Total Profit($)"
                value={nTotalProfit}
                precision={2}
              />
            </Col>
            <Col span={50}>
              <Statistic
                title="Total Revenue($)"
                value={nRevenue}
                precision={2}
              />
            </Col>
          </Row>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={aOrderData}
        size="middle"
        rowKey={(record)=> record.order_number}
      />
    </div>
  );
};

export default Report;
