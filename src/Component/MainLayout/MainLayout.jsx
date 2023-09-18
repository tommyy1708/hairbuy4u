import React from 'react';
import styles from './MainLayout.module.css';
import Menu from '../Menu/Menu';
import SubWindow from '../SubWindow/SubWindow';
const list = ['buy', 'sale', 'products', 'inventory'];


const MainLayout = () => {
  return (
    <div className={`${styles.mainLayout}`}>
      <div className={`${styles.dark} ${styles.header}`}>
        <p>HairBuy4u</p>
      </div>
      <div className={`${styles.dark} ${styles.leftBar}`}>
        <Menu />
      </div>
      <div className={`${styles.subWindow}`}>
        <SubWindow />
      </div>
      <div className={`${styles.footer}`}>footer</div>
    </div>
  );
};

export default MainLayout;
