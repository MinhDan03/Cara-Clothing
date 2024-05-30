import React, { useState } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './home/Home';
import AddTypes from './typeProducts/AddTypes';
import ListTypes from './typeProducts/ListTypes';
import AddProducts from './products/AddProducts';
import ListProducts from './products/ListProducts';
import Orders from './orders/Orders';
import ListOrders from './orders/ListOrders';
import AddUsers from './users/AddUsers';
import ListUsers from './users/ListUsers';
import EditTypes from './typeProducts/EditTypes';
import EditProducts from './products/EditProducts';
import EditUsers from './users/EditUsers';
export default function Dashboard(){
    const [isUsersOpen, setIsUsersOpen] = useState(false);
    const [isTypesOpen, setIsTypesOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isOrdersOpen, setIsOrdersOpen] = useState(false);
    const handleUsersClick = () => {
        setIsUsersOpen(!isUsersOpen);
        // setIsTypesOpen(false);  // Đặt isTypesOpen thành false khi click vào Users
      };
      const handleTypesClick = () => {
        setIsTypesOpen(!isTypesOpen);
        // setIsUsersOpen(false);  // Đặt isUsersOpen thành false khi click vào Types
      };
      const handleProductsClick = () => {
        setIsProductsOpen(!isProductsOpen);
        // setIsUsersOpen(false);  // Đặt isUsersOpen thành false khi click vào Types
      };
      const handleOrdersClick = () => { 
        setIsOrdersOpen(!isOrdersOpen);
        // setIsUsersOpen(false);  // Đặt isUsersOpen thành false khi click vào Types
      };
    return(
        <>
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar (25%) */}
                <div className="w-1/4 bg-gray-800 text-white">
                    <div className="p-4">
                    {/* Logo hoặc tên ứng dụng */}
                    <h1 className="text-2xl font-bold text-white">Cara Shop</h1>
                    </div>

                    {/* Danh sách các mục trong sidebar */}
                    <nav className="space-y-4">
                        <Link to="/admin"><button className="block w-full text-left p-2 hover:bg-gray-700">Trang Chủ</button></Link>
                       
                        <span  className="block p-2 hover:bg-gray-700 cursor-pointer" onClick={handleTypesClick}>Loại</span>
                        {isTypesOpen && (
                        <nav className="pl-4 space-y-2">
                        <Link to="/admin/addTypes"><span className="block p-2 hover:bg-gray-700 cursor-pointer">Thêm loại</span></Link>
                        <Link to="/admin/listTypes"><span className="block p-2 hover:bg-gray-700 cursor-pointer">Danh sách</span></Link>
                        </nav>
                    )}
                       <button className="block w-full text-left p-2 hover:bg-gray-700" onClick={handleProductsClick}>Sản Phẩm</button>
                        {isProductsOpen && (
                        <nav className="pl-4 space-y-2">
                        <Link to="/admin/addProducts"><button className="block w-full text-left p-2 hover:bg-gray-700">Thêm Sản Phẩm</button></Link>
                        <Link to="/admin/listProducts"><button className="block w-full text-left p-2 hover:bg-gray-700">Danh sách</button></Link>
                        </nav>
                    )}
                     <button className="block w-full text-left p-2 hover:bg-gray-700" onClick={handleOrdersClick}>Đơn Hàng</button>
                        {isOrdersOpen && (
                        <nav className="pl-4 space-y-2">
                        <Link to="/admin/newOrders"><button className="block w-full text-left p-2 hover:bg-gray-700">Đơn Hàng Mới</button></Link>
                        <Link to="/admin/listOrders"><button className="block w-full text-left p-2 hover:bg-gray-700">Danh sách</button></Link>
                        </nav>
                    )}
                        <button className="block w-full text-left p-2 hover:bg-gray-700" onClick={handleUsersClick}>Người Dùng</button>
                        {isUsersOpen && (
                        <nav className="pl-4 space-y-2">
                        <Link to="/admin/addUsers"><button className="bloc w-full text-left p-2 hover:bg-gray-700">Thêm Người Dùng</button></Link>
                        <Link to="/admin/listUsers"><button className="block w-full text-left p-2 hover:bg-gray-700">Danh Sách</button></Link>
                        </nav>
                    )}
                       
                    {/* Thêm các mục cần thiết khác */}
                    </nav>
                </div>

                {/* Nội dung chính */}
            <div className="flex flex-col w-full overflow-hidden">
                {/* Header (25%) */}
                <div className="bg-white border-b border-gray-200 p-4">
                    <div className='flex justify-between'>
                        <div className="right"></div>
                        <div className="left flex justify-center items-center gap-3">
                            <div><i className="far fa-bell fa-lg cursor-pointer"></i></div>
                            {/* Đặt Avatar ở đây */}
                            <img
                            className="w-10 h-10 rounded-full object-cover mr-2 cursor-pointer"
                            src="https://st.quantrimang.com/photos/image/072015/22/avatar.jpg"
                            alt="Avatar"
                            />
                        </div>
                        {/* Đặt tên người dùng ở đây */}
                        {/* <span className="text-lg font-semibold">John Doe</span> */}
                    </div>
                    
                </div>

                {/* Main (50%) */}
                <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                {/* Main Content */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/addTypes" element={<AddTypes />} />
                    <Route path="/listTypes" element={<ListTypes />} />
                    <Route path="/types/:id" element={<EditTypes />} />
                    <Route path="/addProducts" element={<AddProducts />} />
                    <Route path="/listProducts" element={<ListProducts />} />
                    <Route path="/products/:productID" element={<EditProducts />} />
                    <Route path="/newOrders" element={<Orders />} />
                    <Route path="/listOrders" element={<ListOrders />} />
                    <Route path="/addUsers" element={<AddUsers />} />
                    <Route path="/listUsers" element={<ListUsers />} />
                    <Route path="/users/:userID" element={<EditUsers />} />

                 {/* Thêm các route cho các trang con của trang admin */}
                </Routes>
                </div>
            </div>
    </div>
        </>
    );
}