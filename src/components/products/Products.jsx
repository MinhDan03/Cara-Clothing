import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart } from '../slices/cartSlice';
export default function Products({ title, desc, quantityStart, quantityEnd }){
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        // Gọi API khi component được tạo
        axios.get('http://localhost:8080/products')
          .then(response => {
            // Xử lý dữ liệu ở đây và cập nhật state
            // console.log(response.data);
            setProducts(response.data);
          })
          .catch(error => {
            console.error('Lỗi khi gọi API:', error);
          });
      }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được tạo
    //   console.log("Số lượng sản phẩm trước khi slice:", products.length);
    const handleAddToCart = (product) => {
        // Gửi action addToCart với thông tin sản phẩm
        dispatch(addToCart({
            id: product._id,
            name: product.ten_sp,
            price: product.gia,
            img: product.hinh[0],
            quantity: 1, // Mặc định số lượng là 1 khi thêm vào giỏ hàng
            // Bạn có thể thêm các trường khác của sản phẩm nếu cần
        }));
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
    };
    return(
        <>
        <section id="product1" className="section-p1">
            <h2>{title}</h2>
            <p>{desc}</p>
            <div className="pro-container">
                {/* <!-- Product 1 --> */}
                {products.slice(quantityStart, quantityEnd).map((product) => {
                    // console.log(product)
                    return(
                        <div className="pro" key={product._id}>
                            <Link  to={"/productDetail/" + product._id}><img src={product.hinh[0]} alt=""/></Link>
                            <div className="des">
                                <span></span>
                                <Link to={"/productDetail/" + product._id}><h5>{product.ten_sp}</h5></Link>
                                <div className="star">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <h4>{Number(product.gia).toLocaleString("vi")}đ</h4>
                            </div>
                            <button onClick={() => handleAddToCart(product)}><i className="fas fa-shopping-cart shoppingCart"></i></button>
                        </div>
                    );
                        
                })}
            </div>
        </section>
        {/* Sản Phẩm Liên Quan */}
        
        </>
    );
}