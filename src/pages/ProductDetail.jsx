import React, { useState } from 'react';
import { ProductsDetailApi } from '../request/api';
const ProductDetail = (props) => {
  const { id } = props;
  console.log("🚀 ~ file: ProductDetail.jsx:5 ~ ProductDetail ~ id:", id)
  const cleanedString = id.replace(/'/g, '');
//  TestApi({
//    cartData: JSON.stringify(ctx.cartData),
//  }).then((res) => {
//    console.log(res.data.message);
//  });

  ProductsDetailApi({
    item_code: cleanedString,
  }).then((res) => {
    console.log(res);
  });
  // const { proDetail, setProDetail } = useState();
  return (
    <div>
      <p>{cleanedString}</p>
    </div>
  );
}

export default ProductDetail;
