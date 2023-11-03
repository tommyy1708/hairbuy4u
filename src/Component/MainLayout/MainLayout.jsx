import React, { useEffect, useState } from 'react';
import {
  useNavigate,
  Outlet,
  useLocation,
  Link,
} from 'react-router-dom';
import { message} from 'antd';
import styles from './MainLayout.module.css';
import Menu from '../Menu/Menu';
import SubWindow from '../SubWindow/SubWindow';
import axios from 'axios';
import env from 'react-dotenv';
// console.log(process.env.TITLE);
const MainLayout = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [showSub, setShowSub] = useState(false);
  let location = useLocation();

  useEffect(() => {
    let token = localStorage.getItem('token');
    setUsername(localStorage.getItem('username'));
    if (location.pathname === '/') {
      setShowSub(true);
    } else {
      setShowSub(false);
    }
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
          <h2>{env.WEB_TITLE}</h2>
        </Link>
        <p>Casher-{username}</p>
      </div>
      <div className={`${styles.dark} ${styles.leftBar}`}>
        <Menu />
      </div>
      <div className={`${styles.subWindow}`}>
        {showSub === true ? (
          <SubWindow username={username}></SubWindow>
        ) : (
          <Outlet></Outlet>
        )}
      </div>
      <div className={`${styles.footer}`}>
        <p>{env.COPYRIGHT}</p>
      </div>
    </div>
  );
};

export default MainLayout;
