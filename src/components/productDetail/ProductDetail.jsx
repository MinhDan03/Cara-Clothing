import Newsletter from "../newsletter/Newsletter";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from '../slices/cartSlice';
export default function ProductDetail(){
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    useEffect(() => {
        // Gọi API để lấy thông tin chi tiết sản phẩm dựa trên productId
        const fetchProductDetail = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/products/${id}`);
            setProductDetail(response.data);
            const productImg = response.data.hinh[0];
            setMainImg(productImg);
          } catch (error) {
            console.error('Error fetching product details:', error);
          }
        };
       
        fetchProductDetail();
      }, [id]);
      useEffect(()=>{
        const fetchRelatedProducts = async () => {
            if (productDetail && productDetail.iddm) {
              try {
                const response = await axios.get(`http://localhost:8080/products/related-products/${productDetail.iddm}`);
                 // Lấy ra 4 sản phẩm ngẫu nhiên
                const randomRelatedProducts = getRandomProducts(response.data, 4);
                setRelatedProducts(randomRelatedProducts);
              } catch (error) {
                console.error('Error fetching related products:', error);
              }
            }
          };
          fetchRelatedProducts();
      },[productDetail?.iddm])
       // Hàm lấy ra n sản phẩm ngẫu nhiên từ mảng sản phẩm
        const getRandomProducts = (products, n) => {
            const shuffled = products.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, n);
        };
    // console.log(relatedProducts);
      const [mainImg, setMainImg] = useState(null);
      const handleSmallImgClick = (src) => {
          setMainImg(src);
      };
      const handleAddToCart = () => {
        // Gửi action addToCart với thông tin sản phẩm
        dispatch(addToCart({
            id: productDetail._id,
            name: productDetail.ten_sp,
            price: productDetail.gia,
            img: productDetail.hinh[0],
            quantity: quantity, // Mặc định số lượng là 1 khi thêm vào giỏ hàng
            // Bạn có thể thêm các trường khác của sản phẩm nếu cần
        }));
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
    };
    return (
        <>
            <section id="prodetails" className="section-p1">
                {/* <!-- Image --> */}
                <div className="single-pro-image">
                    <img src={mainImg} width="100%" id="MainImg" alt="" />
                    <div className="small-img-group">
                    {productDetail?.hinh.map((src, index) => (
                        <div className="small-img-col" key={index}>
                            <img
                            src={src}
                            alt={`Product Image ${index + 1}`}
                            width="100%"
                            className="small-img"
                            onClick={() => handleSmallImgClick(src)}
                            />
                        </div>
                    ))}
                    </div>
                 </div>
                {/* <!-- Information --> */}
                <div className="single-pro-details">
                    <h6>Trang Chủ / T-Shirt</h6>
                    <h4>{productDetail?.ten_sp}</h4>
                    <h2>{Number(productDetail?.gia).toLocaleString("vi")}đ</h2>
                    <select name="size" id="size">
                        <option value="">Chọn Size</option>
                        {productDetail?.kich_thuoc.map((size, index) => (
                            <option key={index} value={size}>{size}</option>
                        ))}
                    </select>
                    <input type="number" name="quantity" id="" min={1} defaultValue={1} onChange={(e) => setQuantity(parseInt(e.target.value))}/>
                    <button className="normal" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                    <h4>Thông Tin Chi Tiết</h4>
                    <span>
                        {productDetail?.mo_ta}
                    </span>
                </div>
            </section>
            {/* Sản Phẩm Liên Quan */}
            <section id="product1" className="section-p1">
            <h2>Sản Phẩm Liên Quan</h2>
            <p>Bộ sưu tập mùa hè thiết kế hiện đại</p>
            <div className="pro-container">
                {/* <!-- Product 1 --> */}
                {relatedProducts.map((product)=>{
                    return(
                    <div className="pro" key={product?._id}>
                        <Link to={"/productDetail/" + product._id}><img src={product?.hinh[0]} alt=""/></Link>               
                        <div className="des">
                            <span></span>
                            <Link to={"/productDetail/" + product._id}><h5>{product?.ten_sp}</h5></Link>
                            <div className="star">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                            <h4>{Number(product?.gia).toLocaleString("vi")}đ</h4>
                        </div>
                        <button><i className="fas fa-shopping-cart shoppingCart"></i></button>
                    </div>        
                    );
                })}
                    
            </div>
            </section>
            <Newsletter></Newsletter>
        </>
    );
}