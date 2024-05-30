import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
export default function ListProducts(){
    const [products, setProducts] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const productsPerPage = 8;
        useEffect(() => {
        const endOffset = itemOffset + productsPerPage;
        setCurrentItems(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / productsPerPage));
      }, [itemOffset, productsPerPage, products]);
      const handlePageClick = (event) => {
        const newOffset = (event.selected * productsPerPage) % products.length;
        setItemOffset(newOffset);
      };
      useEffect(() => {
          const fetchProducts = async () => {
            try {
              const response = await axios.get('http://localhost:8080/products');
              setProducts(response.data);
          
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchProducts();
        }, []);
      // console.log(listTypes);
      const handleDelete = async (productId) => {
        try {
          // Gửi yêu cầu DELETE tới server
          await axios.delete(`http://localhost:8080/products/${productId}`);
    
          // Cập nhật state để hiển thị danh sách sản phẩm mới
          const updatedProducts = products.filter(product => product._id !== productId);
          setProducts(updatedProducts);
            
          // console.log('Loại sản phẩm đã được xoá');
        } catch (error) {
          console.error('Lỗi khi xoá loại sản phẩm:', error);
        }
      };
      const confirmDelete = (productId) => {
        const userConfirmed = window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");
        if (userConfirmed) {
          handleDelete(productId);
        }
      };
    return(
        <>
            {/* <h1>Đây là trang danh sách sản phẩm</h1> */}
            <div className="flex flex-col mb-4 h-screen">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium bg-neutral-800 text-white dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">Tên Sản Phẩm</th>
              <th scope="col" className="px-6 py-4">Giá Sản Phẩm</th>
              <th scope="col" className="px-6 py-4">Ngày Tạo</th>
              <th scope="col" className="px-6 py-4">Số Lượng</th>
              <th scope="col" className="px-6 py-4">Hành Động</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {currentItems.map((product, index)=>{
                return(
                <tr className="border-b text-base transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={product._id}>
                    <td className="px-6 py-4 font-medium">{index + 1 + itemOffset}</td>
                    <td className="flex items-center gap-3 px-6 py-4"><span><img src={product.hinh[0]} className="w-20 h-20 object-cover" alt="" /></span>{product.ten_sp}</td>
                    <td className="px-6 py-4">{Number(product.gia).toLocaleString("vi")} đ</td>
                    <td className="px-6 py-4">{new Date(product.ngay).toLocaleDateString("vi")}</td>
                    <td className="px-6 py-4">{product.soluong}</td>
                    <td className="px-6 py-4">
                        <div className="flex">
                            <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => confirmDelete(product._id)}>Xoá</button>
                            <Link to={"/admin/products/" + product._id}><button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Sửa</button></Link>
                            
                        </div>
                    </td>
                  </tr>
                );
            })}

           
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
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
        </>
    );
}