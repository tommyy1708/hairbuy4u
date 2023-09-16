import React from 'react';
import styles from './Menu.module.css'
const Menu = () => {
  const items = [
    {
      key: 1,
      label: `Sale`,
      children: [
        { key: 2, label: 'CheckOut' },
        { key: 3, label: 'Inquiry' },
      ],
    },
    { key: 4, label: 'Buy', children: [{ key: 5, label: 'Import' }] },
    {
      key: 6,
      label: 'Products',
      children: [{ key: 7, label: 'Inquiry' }],
    },
    {
      key: 8,
      label: 'Inventory',
      children: [{ key: 9, label: 'Inquiry' }],
    },
  ];

  return (
    <>
    <ul className={`${styles.navFrame}`}>
      {items.map((item) => (
        <li style={{ fontSize: '20rem',}} className={`${styles.navItem}`} key={item.key}>{item.label}</li>
      ))}
    </ul>
    </>
  );
};

export default Menu;
