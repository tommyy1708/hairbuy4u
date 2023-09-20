import React from 'react';
import {  useLocation} from 'react-router-dom';
import Inquiry from './Inquiry';

export default function Products() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div>
      <div style={{ backgroundColor: '#bfc', height: '100vh' }}>
        <Inquiry></Inquiry>
      </div>
    </div>
  );
}
