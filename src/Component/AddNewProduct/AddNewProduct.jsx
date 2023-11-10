import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Radio, message } from 'antd';
import { AddNewProductsApi } from '../../request/api';
import styles from './AddNewProducts.module.css'

const AddNewProduct = () => {
  const [open, setOpen] = useState(false);
  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed info:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="add_new_product"
          initialValues={{
            amount: 0,
          }}
        >
          <Form.Item
            name="item_code"
            label="Item code"
            rules={[
              {
                required: true,
                message: 'Please input the item_code of collection!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="item"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input the name of item!',
              },
            ]}
          >
            <Input type="textarea" />
          </Form.Item>
          <Form.Item
            name="qty"
            label="Quantity"
            rules={[
              {
                required: true,
                message: 'Please input number of this item',
              },
            ]}
          >
            <InputNumber min={0} max={9999} />
          </Form.Item>
          <Form.Item
            name="price"
            label="MSRP"
            rules={[
              {
                required: true,
                message: 'Please input MSRP of this item',
              },
            ]}
          >
            <InputNumber min={0} max={9999.99} />
          </Form.Item>
          <Form.Item
            name="cost"
            label="Cost"
            rules={[
              {
                required: true,
                message: 'Please input cost',
              },
            ]}
          >
            <InputNumber min={0} max={9999.99} />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input type="textarea" />
          </Form.Item>
          <Form.Item name="amount">
            <Radio.Group>
              <Radio value={0}>0</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  const onCreate = async (values) => {
    try {
      await AddNewProductsApi(values);
      message.success('Add new products success!')
      setTimeout(() => {
        setOpen(false);
      },2000)
    } catch (error) {
      message.error('Something wrong, please contact manager')
      console.log(error);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add New Item
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
export default AddNewProduct;
