import React from 'react';
import styles from './Menu.module.css'
import {Link} from 'react-router-dom';

const Menu = () => {
  const items = [
    {
      key: 1,
      label: `sale`,
      children: [
        { key: 2, label: 'checkOut' },
        { key: 3, label: 'inquiry' },
      ],
    },
    { key: 4, label: 'buy', children: [{ key: 5, label: 'import' }] },
    {
      key: 6,
      label: 'products',
      children: [{ key: 7, label: 'inquiry' }],
    },
    {
      key: 8,
      label: 'inventory',
      children: [{ key: 9, label: 'inquiry' }],
    },
  ];

  return (
    <div className="menu">
      <ul className={`${styles.navFrame}`}>
        {items.map((items) => (
          <Link to={`${items.label}`}>
            <li key={items.key}>{items.label}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
