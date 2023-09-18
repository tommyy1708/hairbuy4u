import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
//Components
import MainLayout from './Component/MainLayout/MainLayout.jsx';
//Pages
import Sale from './pages/Sale';
import Buy from './pages/Buy';
import Login from './pages/Login';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Missing from './pages/404.jsx';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<MainLayout />}>
            <Route path="/sale/*" element={<Sale />}>
            </Route>
            <Route path="/buy" element={<Buy />}></Route>
            <Route
              path="/products/:id?"
              element={<Products />}
            ></Route>
            <Route path="/inventory" element={<Inventory />}></Route>
          </Route>
          <Route path="*" element={<Missing />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
