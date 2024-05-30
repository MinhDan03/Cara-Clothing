import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import UserDropdown from '../dropdown/UserDropdown';
const Header = () => {
  useEffect(() => {
    const bar = document.getElementById('bar');
    const nav = document.getElementById('navbar');
    const close = document.getElementById('close');

    const handleBarClick = () => {
      nav.classList.add('active');
    };

    const handleCloseClick = () => {
      nav.classList.remove('active');
    };

    if (bar) {
      bar.addEventListener('click', handleBarClick);
    }

    if (close) {
      close.addEventListener('click', handleCloseClick);
    }

    // Cleanup event listeners when component unmounts
    return () => {
      if (bar) {
        bar.removeEventListener('click', handleBarClick);
      }

      if (close) {
        close.removeEventListener('click', handleCloseClick);
      }
    };
  }, []); // Empty dependency array ensures that the effect runs only once after the initial render

  return (
    <>
      <section id="header">
          <NavLink to="/"><img src="/img/logo.png" alt="" /></NavLink>
        <div>
          <ul id="navbar">
            <li>
              <NavLink to="/">Trang chủ</NavLink>
            </li>
            <li>
              <NavLink to="/shopAll">Cửa hàng</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Bài viết</NavLink>
            </li>
            <li>
              <NavLink to="/about">Về chúng tôi</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Liên hệ</NavLink>
            </li>
            <li id="lg-bag">
              <NavLink to="/cart">
                <i className="fas fa-shopping-bag"></i>
              </NavLink>
            </li>
            <a href="#" id="close">
              <i className="fas fa-times"></i>
            </a>
            <li>
                <UserDropdown></UserDropdown>
            </li>
          </ul>
        </div>
        <div id="mobile">
              <NavLink to="/cart">
                <i className="fas fa-shopping-bag"></i>
              </NavLink>
          <i id="bar" className="fas fa-bars"></i>
        </div>
      </section>
    </>
  );
};

export default Header;
