import React from 'react';
import MainLayout from './Component/MainLayout/MainLayout';

import { BrowserRouter,Link,Route,Switch } from 'react-router-dom';
import { Home } from './pages/Home'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
          <Route exact path='/' Component={Home}></Route>
      <MainLayout />
      </BrowserRouter>
    </div>
  );
};

export default App;
