import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import styles from './MainLayout.module.css';
import Menu from '../Menu/Menu';
import SubWindow from '../SubWindow/SubWindow';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MainLayout = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');
    setUsername(username);
    axios
      .get('/api/verify', {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        let flag = response.data.status;
        if (!flag) {
          message.info(response.data.message);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      });
  }, [navigate]);

  return (
    <div className={`${styles.mainLayout}`}>
      <div className={`${styles.dark} ${styles.header}`}>
        <Link to={'/'}>
          <h2>HairBuy4u CMS</h2>
        </Link>
        <p>Welcome-{username}</p>
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
