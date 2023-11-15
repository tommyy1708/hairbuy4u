import React from 'react';
import styles from './Menu.module.css'
import {Link} from 'react-router-dom';

const Menu = () => {

  const items = [
    {
      key: 1,
      label: 'customer',
    },
    {
      key: 2,
      label: 'products',
    },
    {
      key: 3,
      label: 'history',
    },
    {
      key: 4,
      label: 'report',
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
