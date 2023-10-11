import React from 'react';
import styles from './MainLayout.module.css';
import Menu from '../Menu/Menu';
import SubWindow from '../SubWindow/SubWindow';
import { Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className={`${styles.mainLayout}`}>
      <div className={`${styles.dark} ${styles.header}`}>
        <Link to={'/'}>
          <h2>HairBuy4u CMS</h2>
        </Link>
      </div>
      <div className={`${styles.dark} ${styles.leftBar}`}>
        <Menu />
      </div>
      <div className={`${styles.subWindow}`}>
        <SubWindow />
      </div>
      <div className={`${styles.footer}`}></div>
    </div>
  );
};

export default MainLayout;
