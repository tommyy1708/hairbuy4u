import React, { useState } from 'react';
import { ProductsDetailApi } from '../request/api';
const ProductDetail = (props) => {
  const { id } = props;
//  TestApi({
//    cartData: JSON.stringify(ctx.cartData),
//  }).then((res) => {
//    console.log(res.data.message);
//  });

  ProductsDetailApi({
    item_code: id,
  }).then((res) => {
    console.log(res)
  })
  // const { proDetail, setProDetail } = useState();
  return (
    <div>
      <p>{id}</p>
    </div>
  );
}

export default ProductDetail;
