import React from 'react';
import styles from './Menu.module.css'
import {Link} from 'react-router-dom';

const Menu = () => {
  const items = [
    {
      key: 4,
      label: 'customer',
    },
    {
      key: 3,
      label: 'products',
    },
    {
      key: 5,
      label: 'history',
    },
    {
      key: 1,
      label: `sale`,
    },
    {
      key: 2,
      label: 'buy',
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
