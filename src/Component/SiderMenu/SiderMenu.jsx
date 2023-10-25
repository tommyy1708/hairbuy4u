import React, { useState } from 'react';
import { Menu } from 'antd';

const SiderMenu = () => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('Sale', 'sub1', [
      getItem('CheckOut', '1'),
    ]),
    getItem('Buy', 'sub2',  [
      getItem('History', '2'),
    ]),
    getItem('Products', 'sub3', [
      getItem('Products', '3'),
    ]),
    getItem('Customer', 'sub4', [
      getItem('Customer', '4'),
    ]),
  ];

  const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find(
      (key) => openKeys.indexOf(key) === -1
    );
    if (
      latestOpenKey &&
      rootSubmenuKeys.indexOf(latestOpenKey) === -1
    ) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
    </>
  );
};
export default SiderMenu;
