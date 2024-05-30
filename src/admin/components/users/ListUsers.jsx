import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
export default function ListUsers(){
    const [users, setUsers] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const productsPerPage = 8;
        useEffect(() => {
        const endOffset = itemOffset + productsPerPage;
        setCurrentItems(users.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(users.length / productsPerPage));
      }, [itemOffset, productsPerPage, users]);
      const handlePageClick = (event) => {
        const newOffset = (event.selected * productsPerPage) % users.length;
        setItemOffset(newOffset);
      };
      useEffect(() => {
          const fetchUsers = async () => {
            try {
              const response = await axios.get('http://localhost:8080/users');
              setUsers(response.data);
          
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchUsers();
        }, []);
      // console.log(listTypes);
      const handleDelete = async (userID) => {
        try {
          // Gửi yêu cầu DELETE tới server
          await axios.delete(`http://localhost:8080/users/${userID}`);
    
          // Cập nhật state để hiển thị danh sách sản phẩm mới
          const updatedUsers = users.filter(user => user._id !== userID);
          setUsers(updatedUsers);
            
          // console.log('Người dùng đã được xoá');
        } catch (error) {
          console.error('Lỗi khi xoá người dùng:', error);
        }
      };
      const confirmDelete = (userID) => {
        const userConfirmed = window.confirm("Bạn có chắc chắn muốn xoá người dùng này?");
        if (userConfirmed) {
          handleDelete(userID);
        }
      };
    return(
        <>
            {/* <h1>Danh sách người dùng</h1> */}
            <div className="flex flex-col mb-4 h-screen">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium bg-neutral-800 text-white dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">Tên Người Dùng</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Địa Chỉ</th>
              {/* <th scope="col" className="px-6 py-4">Số Điện Thoại</th> */}
              <th scope="col" className="px-6 py-4">Hành Động</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {currentItems.map((user, index)=>{
                return(
                <tr className="border-b text-base transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={user._id}>
                    <td className="px-6 py-4 font-medium">{index + 1 + itemOffset}</td>
                    <td className="flex items-center gap-3 px-6 py-4"><span><img src={user.image_thumb} className="w-16 h-16 rounded-full object-cover" alt="" /></span>{user.full_name}</td>
                    <td className="px-6 py-4 max-w-xs whitespace-nowrap overflow-hidden overflow-ellipsis">{user.email}</td>
                    <td className="px-6 py-4 max-w-xs whitespace-nowrap overflow-hidden overflow-ellipsis">{user.address === null ? 'null' : user.address}</td>
                    {/* <td className="px-6 py-4">{user.phone_number === null ? 'null' : user.phone_number}</td> */}
                    <td className="px-6 py-4">
                        <div className="flex">
                            <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => confirmDelete(user._id)}>Xoá</button>
                            <Link to={"/admin/users/" + user._id}><button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Sửa</button></Link>
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