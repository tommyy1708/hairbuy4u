import React, { useEffect, useState } from 'react';
import { ProductsDetailApi } from '../request/api';
import { Button, Form, Input, message } from 'antd';
const ProductDetail = (props) => {
  const { id } = props;
  const cleanedString = id.replace(/'/g, '');
  const [productsDetail, setProductsDetail] = useState('');

  useEffect(() => {
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

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
  return (
    <div className="productsDetailFrame">
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
        <Form.Item label="Item_code" name="newItem_code">
          <Input placeholder={productsDetail.item_code} />
        </Form.Item>
        <Form.Item label="Item" name="newItem">
          <Input placeholder={productsDetail.item} />
        </Form.Item>
        <Form.Item label="Price" name="newPrice">
          <Input placeholder={productsDetail.price} />
        </Form.Item>
        <Form.Item label="Stock" name="newQty">
          <Input placeholder={productsDetail.qty} />
        </Form.Item>
        <Form.Item label="Cost" name="newCost">
          <Input placeholder={productsDetail.cost} />
        </Form.Item>
        <Form.Item label="Category" name="newCategory">
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
        {/* <Form.Item label="item_code">
          <Input placeholder={`${productsDetail.item_code}`} />
        </Form.Item>
        <Form.Item label="item">
          <Input placeholder={`${productsDetail.item}`} />
        </Form.Item>
        <Form.Item label="price">
          <Input placeholder={`${productsDetail.price}`} />
        </Form.Item>
        <Form.Item label="qty">
          <Input placeholder={`${productsDetail.qty}`} />
        </Form.Item>
        <Form.Item label="cost">
          <Input placeholder={`${productsDetail.cost}`} />
        </Form.Item>
        <Form.Item label="category">
          <Input placeholder={`${productsDetail.category}`} />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default ProductDetail;
