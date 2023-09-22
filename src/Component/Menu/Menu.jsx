import React from 'react';
import styles from './Menu.module.css'
import {Link} from 'react-router-dom';

const Menu = () => {
  const items = [
    {
      key: 1,
      label: `sale`,
      // children: [
      //   { key: 2, label: 'checkOut' },
      //   { key: 3, label: 'inquiry' },
      // ],
    },
    {
      key: 2, label: 'buy',
      // children: [{ key: 5, label: 'import' }]
    },
    {
      key: 3,
      label: 'products',
      // children: [{ key: 7, label: 'inquiry' }],
    },
    {
      key: 4,
      label: 'customer',
      // children: [{ key: 9, label: 'inquiry' }],
    },
  ];

  return (
    <div className={`${styles.frame}`}>
      <ul className={`${styles.navFrame}`}>
        {items.map((e) => (
          <Link key={e.key} to={`${e.label}`}>
            <li >{e.label}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
