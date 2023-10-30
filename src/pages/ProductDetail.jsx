import React, { useEffect, useState } from 'react';
import { ProductsDetailApi } from '../request/api';
import {
  Button,
  Form,
  Input,
  message,
  Spin,
  Divider,
  Table,
  Space,
} from 'antd';
import moment from 'moment-timezone';
import {
  ProductsUpdateApi,
  AddNewInventoryApi,
  GotInventoryDataApi,
  AsynchronousApi,
} from '../request/api';
const ProductDetail = (props) => {
  const { id } = props;
  const cleanedString = id.replace(/'/g, '');
  const [productsDetail, setProductsDetail] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [addInventoryHistory, setAddInventoryHistory] = useState('');

  useEffect(() => {
    setShowLoading(false);
    ProductsDetailApi({
      item_code: cleanedString,
    })
      .then((res) => {
        setProductsDetail(res.data.productDetail[0]);
      })
      .catch((error) => {
        message.info(error);
      });

    GotInventoryDataApi({
      item_code: cleanedString,
    }).then((res) => {
      if (res.data.errCode === 0) {
        setAddInventoryHistory(res.data.data);
      }
    });
  }, []);

  const onFinish = async (values) => {
    let itemId = productsDetail.item_code;
    const data = {
      id: itemId,
      data: values,
    };
    setShowLoading(true);
    try {
      if (values != null) {
        await ProductsUpdateApi(data).then((res) => {
          message.success('Change success!');
          setTimeout(() => {
            window.location.reload(false);
          }, [2000]);
        });
      } else {
        message.info('nothing changed');
      }
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const handleAddInventory = async (values) => {
    setShowLoading(true);
    const data = {
      item_code: productsDetail.item_code,
      item: productsDetail.item,
      qty: values.qty,
      cost: values.cost,
      date: moment()
        .tz('America/New_York')
        .format('YYYY-MM-DD-HH:mm'),
    };
    try {
      message.success('Add list success!');
      await AddNewInventoryApi(data);

      // for asynchronous data
      const asyncData = {
        item_code: productsDetail.item_code,
        qty: values.qty,
        cost: values.cost,
      };
      await AsynchronousApi(asyncData);

      setTimeout(() => {
         window.location.reload();
      }, 2000);
    } catch (error) {
      console.log('Something wrong', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // start for table
  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      date: 'Edward King 0',
      qty: 32,
      cost: 9.99,
    },
    {
      key: 1,
      date: 'Edward King 1',
      qty: 15,
      cost: 9.99,
    },
  ]);

  const inventoryColumns = [
    {
      title: 'Index',
      dataIndex: 'key',
      key: 'key',
      width: 50,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 180,
    },
    {
      title: 'Qty.',
      dataIndex: 'qty',
      key: 'qty',
      render: (_, record) => (
        <input
          className={`inventory_qty_${record.key}`}
          type="number"
          value={record.qty}
          disabled
        />
      ),
    },
    {
      title: 'Cost ($)',
      dataIndex: 'cost',
      key: 'cost',
      render: (_, record) => (
        <input
          className={`inventory_qty_${record.key}`}
          defaultValue={record.cost}
          disabled
        />
      ),
    },
    {
      title: 'Edit',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button
            danger
            type="primary"
            onClick={() => {
              let indexOfList = document.getElementsByClassName(
                `inventory_qty_${record.key}`
              );
              indexOfList[0].disabled = false;
              indexOfList[1].disabled = false;
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              let indexOfList = document.getElementsByClassName(
                `inventory_qty_${record.key}`
              );
              indexOfList[0].disabled = true;
              indexOfList[1].disabled = true;
            }}
          >
            Save
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {showLoading ? (
        <div>
          <Spin delay="500" className="spinFrame" size="large"></Spin>
        </div>
      ) : null}
      <div className="productsDetailFrame">
        <div className="productsEditorFrame">
          <Form
            name="productsEditorForm"
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 15,
            }}
            style={{
              maxWidth: 400,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Item_code" name="item_code">
              <Input
                disabled
                placeholder={productsDetail.item_code}
              />
            </Form.Item>
            <Form.Item label="Item" name="item">
              <Input placeholder={productsDetail.item} />
            </Form.Item>
            <Form.Item label="Stock" name="qty">
              <Input placeholder={productsDetail.qty} />
            </Form.Item>
            <Form.Item label="Price $" name="price">
              <Input placeholder={productsDetail.price} />
            </Form.Item>
            <Form.Item label="Cost $" name="cost">
              <Input placeholder={productsDetail.cost} />
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Input placeholder={productsDetail.category} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Edit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="addInventoryFrame">
          <Form
            name="addInventoryForm"
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 15,
            }}
            style={{
              maxWidth: 400,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleAddInventory}
            autoComplete="off"
          >
            <Form.Item
              label="Amount"
              name="qty"
              rules={[
                { required: true, message: 'Please input qty' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Cost $"
              name="cost"
              rules={[
                { required: true, message: 'Please input cost' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Add To Inventory
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Divider className="divider" orientation="right">
        Inventory History
      </Divider>
      <div className="inventoryList">
        <Table
          bordered
          dataSource={addInventoryHistory}
          columns={inventoryColumns}
        />
      </div>
    </>
  );
};

export default ProductDetail;
