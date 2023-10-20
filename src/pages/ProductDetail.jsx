import React, { useEffect, useState } from 'react';
import { ProductsDetailApi } from '../request/api';
import { Button, Form, Input, message ,Spin} from 'antd';
import { ProductsUpdateApi } from '../request/api';
const ProductDetail = (props) => {
  const { id } = props;
  const cleanedString = id.replace(/'/g, '');
  const [productsDetail, setProductsDetail] = useState('');
  const [showloading, setShowLoading] = useState(false);

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
  }, []);

  const onFinish =async (values) => {
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
            },[2000])
        });
      } else {
        message.info('nothing changed')
      }
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="productsDetailFrame">
      {showloading ? (
        <div>
        <Spin
          delay="500"
          className="spinFrame"
          tip="Loading"
          size="large"
        ></Spin>
        </div>
      ) : null}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Item_code" name="item_code">
          <Input disabled placeholder={productsDetail.item_code} />
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
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductDetail;
