import Hero2 from "../hero2/Hero2";
import Newsletter from "../newsletter/Newsletter";
import { useState, useEffect } from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";

export default function Shop() {
    const imgValue = false;
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const productsPerPage = 12;
    useEffect(() => {
      const endOffset = itemOffset + productsPerPage;
      setCurrentItems(products.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(products.length / productsPerPage));
    }, [itemOffset, productsPerPage, products]);
    const handlePageClick = (event) => {
      const newOffset = (event.selected * productsPerPage) % products.length;
      setItemOffset(newOffset);
    };
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        // Có thể thực hiện các tác vụ khác liên quan đến việc chọn danh mục
      };
      
    useEffect(() => {
        // Gọi API để lấy danh sách danh mục
        const fetchCategories = async () => {
          try {
            const response = await axios.get('http://localhost:8080/categories');
            setCategories(response.data);
            // Nếu danh sách danh mục không rỗng, chọn danh mục đầu tiên
            if (response.data.length > 0) {
                setSelectedCategory(response.data[0]._id);
            }
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();
      }, []); // Chỉ gọi một lần khi component được tạo ra
    //   console.log(categories);
    useEffect(() => {
        // Gọi API để lấy danh sách sản phẩm dựa trên danh mục đã chọn
        const fetchProductsByCategory = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/products/productByType/${selectedCategory}`);
            setProducts(response.data);
          } catch (error) {
            console.error('Error fetching products by category:', error);
          }
        };
      
        if (selectedCategory) {
          fetchProductsByCategory();
        }
      }, [selectedCategory]);
    return (
     
            <>
                <Hero2
                    title="Cửa Hàng"
                    desc="Tiết kiệm nhiều hơn với phiếu giảm giá và giảm giá tới 70%!"
                    img={imgValue}
                ></Hero2>
                <div className="category-search flex justify-between items-center px-5 mt-4">
                   <div className="category-list">
                   <h3 className="text-2xl font-medium">Danh Mục</h3>
                    <ul className="flex gap-4 mt-2">
                        {categories.map((category) => (
                        <li className={`border border-solid border-emerald-600 rounded px-2 py-1 duration-300 hover:scale-110 ${selectedCategory === category._id ? 'active-category' : ''}`} key={category._id} onClick={() => handleCategoryClick(category._id)}>
                            <a href="#">{category.ten_loai}</a>
                        </li>
                        ))}
                    </ul>
                   </div>
                   <div className="search flex gap-2">
                        <input type="text" className="border border-solid border-emerald-600 outline-emerald-700 rounded p-2" name="" id="" placeholder="Tìm kiếm sản phẩm"/>
                        <button type="submit" className="border p-2 bg-emerald-700 rounded text-white duration-300 hover:scale-95">Tìm</button>
                   </div>
                </div>
                <section id="product1" className="section-p1">
                    <div className="pro-container">
                        {/* <!-- Product 1 --> */}
                        {currentItems.map((product) => (
                            <div className="pro" key={product._id}>
                            <Link to={"/productDetail/" + product._id}><img src={product.hinh[0]} alt="" /></Link>
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
                            <button>
                                <i className="fas fa-shopping-cart shoppingCart"></i>
                            </button>
                        </div>
                        ))}
                        
                    </div>
                 
                </section>
                <ReactPaginate
                        previousLabel={<i className="fas fa-arrow-left"></i>}
                        nextLabel={<i className="fas fa-arrow-right"></i>}
                        breakLabel={'...'}
                        pageCount={pageCount}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        renderOnZeroPageCount={null}
                        containerClassName={'pagination'}
                        pageLinkClassName="page-num"
                        previousLinkClassName="page-num"
                        nextLinkClassName="page-num"
                        activeLinkClassName="active"
                  />
                <Newsletter></Newsletter>
            </>

    );
}
