import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
export default function ListOrders(){
    const [orders, setOrders] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const productsPerPage = 8;
        useEffect(() => {
        const endOffset = itemOffset + productsPerPage;
        setCurrentItems(orders.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(orders.length / productsPerPage));
      }, [itemOffset, productsPerPage, orders]);
      const handlePageClick = (event) => {
        const newOffset = (event.selected * productsPerPage) % orders.length;
        setItemOffset(newOffset);
      };
      useEffect(() => {
          const fetchOrders = async () => {
            try {
              const response = await axios.get('http://localhost:8080/orders');
              setOrders(response.data);
          
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchOrders();
        }, []);
     
    return(
        <>
            <div className="flex flex-col mb-4 h-screen">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium bg-neutral-800 text-white dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">Người Đặt Hàng</th>
              <th scope="col" className="px-6 py-4">Số Điện Thoại</th>
              <th scope="col" className="px-6 py-4">Địa Chỉ</th>
              <th scope="col" className="px-6 py-4">Tổng Đơn Hàng</th>
              <th scope="col" className="px-6 py-4">Hành Động</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
                {currentItems.map((order, index)=>{
                    return(
                        <tr className="border-b text-base transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={order._id}>
                        <td className="px-6 py-4 font-medium">{index + 1 +itemOffset}</td>
                        <td className="px-6 py-4">{order.hoTen}</td>
                        <td className="px-6 py-4">{order.dien_thoai}</td>
                        <td className="px-6 py-4">{order.dia_chi}</td>
                        <td className="px-6 py-4">{Number(order.tongDonHang).toLocaleString("vi")}đ</td>
                        <td className="px-6 py-4">
                            <div className="flex">
                                <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2" >Xem</button>
                                <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Sửa</button>
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