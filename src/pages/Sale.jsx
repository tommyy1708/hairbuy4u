import React from 'react';
import Option from '../Component/Option/Option';
import { Outlet } from 'react-router-dom'

const Sale = () => {
  return (
    <div className="sale">
      <Option></Option>
      <Outlet/>
    </div>
  );
}

export default Sale;

