import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';
const UserDropdown = () => {
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const ref = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);
    const handleLogout = () => {
      // Gửi action để đăng xuất
      dispatch(logoutUser());
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('expiresIn');
      // Điều hướng về trang login sau khi đăng xuất
      navigate("/login");
    };
    const handleAvatarClick = () => {
      setDropdownVisibility(!isDropdownVisible);
    };
  
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownVisibility(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('click', handleOutsideClick);
      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }, []);

  return (
    <div className="user-dropdown" ref={ref}>
        <div className="avatar cursor-pointer" onClick={handleAvatarClick}>
            {/* Thêm hình avatar của người dùng ở đây */}
            <img src="https://thespiritofsaigon.net/wp-content/uploads/2022/10/avatar-vo-danh-15.jpg" className="w-8 h-8 rounded-full" alt="User Avatar" />
        </div>
      {isDropdownVisible && (
        <div className="dropdown-content">
          {/* Nội dung dropdown menu */}
          <div className="">
            <ul className="px-3 py-2">
            <li>
                <a href="#" className="block py-4 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">Tài Khoản</a>
            </li>
            <li>
                <a href="#" className="block py-4 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Đơn Hàng</a>
            </li>

            {isAuthenticated ? (
                <>
                  <li>
                    <a href="#/" className="block py-4 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={handleLogout}>Đăng xuất</a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/register" className="block py-4 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Đăng ký</Link>
                  </li>
                  <li>
                    <Link to="/login" className="block py-4 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Đăng nhập</Link>
                  </li>
                </>
              )}
           
            
            </ul>
        </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
