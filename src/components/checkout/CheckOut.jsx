import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { clearCart, removeFromCart } from "../slices/cartSlice";
import { useState } from "react";
import axios from "axios";

export default function CheckOut(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderItems = useSelector((state)=> state.cart.listProduct);
    const [hoTen, setHoTen] = useState('');
    const [email, setEmail] = useState('');
    const [dienThoai, setDienThoai] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const subtotal = orderItems.reduce((total, product) => {
        return total + product.quantity * product.price;
        }, 0);
    const validateForm = () => {
        const errors = {};
    
        if (!hoTen.trim()) {
          errors.hoTen = 'Họ tên không được bỏ trống';
        }
    
        if (!email.trim()) {
          errors.email = 'Email không được bỏ trống';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = 'Email không hợp lệ';
        }
    
        if (!dienThoai.trim()) {
          errors.dienThoai = 'Số điện thoại không được bỏ trống';
        } else if (!/^\d{10,11}$/.test(dienThoai)) {
          errors.dienThoai = 'Số điện thoại không hợp lệ';
        }
    
        if (!diaChi.trim()) {
          errors.diaChi = 'Địa chỉ không được bỏ trống';
        }
    
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
      };
      const submitDuLieu = (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
          return;
        }
    
        let url = 'http://localhost:8080/orders/luudonhang';
        let orderData = { hoTen: hoTen, email: email, dien_thoai: dienThoai, dia_chi: diaChi, tongDonHang: subtotal, status: 1 };

        axios.post(url, orderData, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response => {
            const data = response.data;
            if (data.id_dh < 0) {
              console.log('Lỗi đơn hàng', data);
            } else {
              let id_dh = data.id_dh;
              luuchitietdonhang(id_dh, orderItems);
                
              navigate('/thankyou');
            }
          })
          .catch(error => {
            console.error('Lỗi khi gửi đơn hàng', error);
          });
    
        
      };
    
      const luuchitietdonhang = (id_dh, orderItems) => {
        const url = 'http://localhost:8080/orders/luugiohang';
        orderItems.map((item) => {
          let data = { id_dh: id_dh, id_sp: item.id, so_luong: item.quantity };
          axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response => xoaSP(response.data))
          .catch(error => console.log('Lỗi lưu sản phẩm', error));
        });
      };
    
      const xoaSP = (data) => {
        // console.log(data);
        dispatch(removeFromCart(data.id_sp));
      };
   
    return(
        <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto p-8">
      {/* Phần Thông Tin Thanh Toán */}
      <div className="col-span-1 lg:col-span-1">
        <h2 className="text-2xl font-semibold mb-4">Thông Tin Thanh Toán</h2>
    <form className="max-w-md my-10 p-4 bg-white shadow-md rounded-md" onSubmit={submitDuLieu}>
      <h2 className="text-2xl font-semibold mb-4"></h2>

      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
          Họ và Tên
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          defaultValue={hoTen} onChange={(e) => setHoTen(e.target.value)}
        />
         {validationErrors.hoTen && <span className="text-red-600 italic">{validationErrors.hoTen}</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          defaultValue={email} onChange={(e) => setEmail(e.target.value)} 
          
        />
        {validationErrors.email && <span className="text-red-600 italic">{validationErrors.email}</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-600">
          Địa Chỉ
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          defaultValue={diaChi} onChange={(e) => setDiaChi(e.target.value)} 
        />
        {validationErrors.diaChi && <span className="text-red-600 italic">{validationErrors.diaChi}</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">
          Số Điện Thoại
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          defaultValue={dienThoai} onChange={(e) => setDienThoai(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
        {validationErrors.dienThoai && <span className="text-red-600 italic">{validationErrors.dienThoai}</span>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Đặt Hàng
      </button>
    </form>
      </div>

      {/* Phần Sản Phẩm Đơn Hàng */}
      <div className="col-span-1 lg:col-span-1">
        <h2 className="text-2xl font-semibold mb-4">Đơn Hàng Của Bạn</h2>
        <div className="bg-white p-4 rounded-md shadow-md my-10">
      {orderItems.map((item, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
            <img src={item.img} alt="" className="w-28"/>
          <div><span className="inline-block uppercase pr-2">{item.name}</span> x <span className="inline-block px-2">{item.quantity}</span></div>
          <span>{(item.price * item.quantity).toLocaleString("vi")}đ</span>
        </div>
      ))}
      <hr className="my-2" />
      <div className="flex justify-between items-center">
        <span><strong>Tổng cộng</strong></span>
        <span><strong>{Number(subtotal).toLocaleString("vi")}đ</strong></span>
      </div>
    </div>
      </div>
    </div>
        </>
    );
}