import React,{useState} from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

const SiderMenu = () =>{
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
  getItem('Sale', 'sub1', <MailOutlined />, [
    getItem('CheckOut', '1'),
    getItem('Inquiry', '2'),
  ]),
  getItem('Buy', 'sub2', <AppstoreOutlined />, [
    getItem('History', '3'),
  ]),
  getItem('Products', 'sub3', <SettingOutlined />, [
    getItem('Inquiry', '4'),
  ]),
  getItem('Customer', 'sub4', <SettingOutlined />, [
    getItem('Inquiry', '5'),
  ]),
];

  const rootSubmenuKeys = ['sub1', 'sub2','sub4', 'sub4'];
const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <>
      <Menu
        theme='dark'
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={items}
    />
    </>
  );
};
export default SiderMenu;
