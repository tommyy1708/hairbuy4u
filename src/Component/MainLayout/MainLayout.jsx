import React, { useEffect, useState } from 'react';
import {
  useNavigate,
  Outlet,
  useLocation,
  Link,
} from 'react-router-dom';
import styles from './MainLayout.module.css';
import Menu from '../Menu/Menu';
import { VerifyTokenApi } from '../../request/api';
import { message,Spin } from 'antd';

const MainLayout = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(
    localStorage.getItem('username')
  );
    const [showSpin, setShowSpin] = useState(false);

  const verifyToken = async (jwt) => {
    const response = await VerifyTokenApi(jwt);
    let status = response.data.status;
    if (!status) {
      message.error('Token expired, redirecting to login page');
      setShowSpin(true);
      setTimeout(() => {
        localStorage.clear();
        navigate('/login');
      },3000)
    }
    return;
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    verifyToken(token);
  }, [navigate]);

  return (
    <div className={`${styles.mainLayout}`}>
      {showSpin ? <Spin className="spinFrame" size="large" />:null}
      <div className={`${styles.dark} ${styles.header}`}>
        <Link to={'/'}>
          <h2>{process.env.REACT_APP_WEB_TITLE}</h2>
        </Link>
        <p>Casher-{username}</p>
      </div>
      <div className={`${styles.dark} ${styles.leftBar}`}>
        <Menu />
      </div>
      <div className={`${styles.subWindow}`}>
        <Outlet></Outlet>
      </div>
      <div className={`${styles.footer}`}>
        <p>
          © {process.env.REACT_APP_YEAR} Copyright by{' '}
          {process.env.REACT_APP_COMPANY_NAME} All rights reserved.
        </p>
        <p>Powered By {process.env.REACT_APP_AUTHOR_NAME}</p>
      </div>
    </div>
  );
};

export default MainLayout;
