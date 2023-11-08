import React, { useEffect, useContext, useState } from 'react';
import {
  ProductsDetailApi,
  GotInventoryDataApi,
} from '../request/api';
import {
  Button,
  Form,
  Input,
  message,
  Spin,
  Divider,
  Table,
} from 'antd';
import { useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import {
  ProductsUpdateApi,
  AddNewInventoryApi,
  AsynchronousApi,
} from '../request/api';
const ProductDetail = () => {
  const params = useParams();
  const id = params.id;
  const [productsDetail, setProductsDetail] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [addInventoryHistory, setAddInventoryHistory] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);
  const [fetch, setFetch] = useState(true);
  const fetchProductsDetail = async (itemCode) => {
    const productInfo = await ProductsDetailApi(itemCode);
    setProductsDetail(productInfo.data.productDetail[0]);
    const productHistory = await GotInventoryDataApi(itemCode);
    setAddInventoryHistory(productHistory.data.data);
  };

  useEffect(() => {
    if (fetch) {
      fetchProductsDetail(id);
      setFetch(false);
    }
  }, [fetch]);

  const handleEditProductInfo = async (values) => {
    const invalidEdit = Object.values(values).every(
      (value) => value === undefined
    );
    if (invalidEdit) {
      setDisabledButton(true);
      message.error('Nothing changed');
      setTimeout(() => {
        setDisabledButton(false);
      }, 3000);
      return;
    }

    setDisabledButton(true);
    setShowLoading(true);
    const data = {
      id: productsDetail.item_code,
      data: values,
    };

    try {
      if (values != null) {
        await ProductsUpdateApi(data).then((res) => {
          if (res.data.errCode === 0) {
            message.success('Change success!');
            setTimeout(() => {
              window.location.reload();
            }, [2000]);
          }
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
    setDisabledButton(true);
    setShowLoading(true);
    const data = {
      item_code: productsDetail.item_code,
      item: productsDetail.item,
      qty: values.qty,
      cost: values.cost,
      date: moment()
        .tz('America/New_York')
        .format('YYYY-MM-DD-HH:mm'),
      casher: localStorage.getItem('username'),
    };
    try {
      const response = await AddNewInventoryApi(data);
      if (response.data.errCode === 0) {
        // for asynchronous data
        const asyncData = {
          item_code: productsDetail.item_code,
          qty: values.qty,
          cost: values.cost,
        };
        await AsynchronousApi(asyncData).then((res) => {
          if (res.data.errCode === 0) {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        });
      }
    } catch (error) {
      message.error('Something wrong, contact manager');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const inventoryColumns = [
    {
      title: 'Index',
      dataIndex: 'key',
      key: 'key',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.key - b.key,
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
          defaultValue={record.qty}
          type="number"
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
          type="number"
          disabled
        />
      ),
    },
    {
      title: 'Casher',
      dataIndex: 'casher',
      key: 'casher',
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
            onFinish={handleEditProductInfo}
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
              <Button
                type="primary"
                htmlType="submit"
                disabled={disabledButton}
              >
                Edit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="straightLine"></div>
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
              <Button
                type="primary"
                htmlType="submit"
                disabled={disabledButton}
              >
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
