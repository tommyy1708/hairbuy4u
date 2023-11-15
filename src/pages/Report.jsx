import React, { useState } from 'react';
import {
  DatePicker,
  Space,
  Table,
  Button,
  Col,
  Row,
  Statistic,
} from 'antd';
import { InquiryOrderDataOnDate } from '../request/api';

const Report = () => {
  const [begin, setBegin] = useState('');
  const [end, setEnd] = useState('');
  const [aOrderData, setAOrderData] = useState('');
  const [nTotalProfit, setNTotalProfit] = useState(0);
  const [nTotalCost, setNTotalCost] = useState(0);
  const { RangePicker } = DatePicker;

  const gotData = async () => {
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
    }
    return;
  };

  const onChange = (date, dateString) => {
    setBegin(dateString[0]);
    setEnd(dateString[1]);
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
            <RangePicker onChange={onChange} />
            <Button type="primary" onClick={gotData}>
              Get Report
            </Button>
          </Space>
        </div>
        <div>
          <Row gutter={100}>
            <Col span={50}>
              <Statistic title="Total Cost($)" value={nTotalCost} />
            </Col>
            <Col span={50}>
              <Statistic
                title="Total Profit($)"
                value={nTotalProfit}
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
      />
    </div>
  );
};

export default Report;
