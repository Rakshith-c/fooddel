/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import './NavBar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const navigate = useNavigate();
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(""); 
    navigate("/");
  }

  return (
    <div className='navbar'>
      <Link to='/'><img className="logo" src={assets.logo} alt="Logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' className={menu === 'home' ? 'active' : ''} onClick={() => setMenu('home')}>Home</Link>
        <Link to='#explore-menu' className={menu === 'menu' ? 'active' : ''} onClick={() => setMenu('menu')}>Menu</Link>
        <Link to='#app-download' className={menu === 'mobile-app' ? 'active' : ''} onClick={() => setMenu('mobile-app')}>Mobile App</Link>
        <Link to='#footer' className={menu === 'contact-us' ? 'active' : ''} onClick={() => setMenu('contact-us')}>Contact Us</Link>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="Search Icon" />
        <div className='navbar-cart-icon'>
          <Link to='/cart'><img src={assets.basket_icon} alt="Basket Icon" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button className='navbar-button' onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile Icon" />
            <ul className='navbar-profile-dropdown'>
              <li key="orders" onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="Bag Icon" />Orders</li>
              <hr key="divider" />
              <li key="logout" onClick={logout}><img src={assets.logout_icon} alt="Logout Icon" />Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
