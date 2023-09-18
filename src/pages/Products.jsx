import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useParams } from 'react-router-dom';

export default function Products() {
  const { id } = useParams();
  return (
    <div>
      <h2>products-{id}</h2>
    </div>
  );
}
