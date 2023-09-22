import React from 'react';
import { useSearchParams } from 'react-router-dom';

const HistoryDetail = () => {
  const [params] = useSearchParams();
  console.log("🚀 ~ file: HistoryDetail.jsx:6 ~ HistoryDetail ~ params:", params)

  const id = params.get('order_number')
  return (
    <div>
      order number is {id}
    </div>
  );
}

export default HistoryDetail;
