import React from 'react';
import { Outlet } from 'react-router-dom';

const SubWindow = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}

export default SubWindow;
