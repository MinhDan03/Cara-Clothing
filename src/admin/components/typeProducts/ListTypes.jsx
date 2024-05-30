import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function ListTypes(){
    const [listTypes, setListTypes] = useState([]);
    useEffect(() => {
        // Gọi API để lấy danh sách danh mục
        const fetchListTypes = async () => {
          try {
            const response = await axios.get('http://localhost:8080/categories');
            setListTypes(response.data); 
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchListTypes();
      }, []);
      // console.log(listTypes);
      const handleDelete = async (typeId) => {
        try {
          // Gửi yêu cầu DELETE tới server
          await axios.delete(`http://localhost:8080/categories/${typeId}`);
    
          // Cập nhật state để hiển thị danh sách sản phẩm mới
          const updatedTypeProducts = listTypes.filter(type => type._id !== typeId);
          setListTypes(updatedTypeProducts);
            
          // console.log('Loại sản phẩm đã được xoá');
        } catch (error) {
          console.error('Lỗi khi xoá loại sản phẩm:', error);
        }
      };
      const confirmDelete = (typeId) => {
        const userConfirmed = window.confirm("Bạn có chắc chắn muốn xoá loại sản phẩm này?");
        if (userConfirmed) {
          handleDelete(typeId);
        }
      };
    return(
        <>
            {/* <h1>Đây là trang danh sách loại sản phẩm</h1> */}
            <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium bg-neutral-800 text-white dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">Tên Loại</th>
              <th scope="col" className="px-6 py-4">Ngày Tạo</th>
              <th scope="col" className="px-6 py-4">Mô Tả</th>
              <th scope="col" className="px-6 py-4">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {listTypes.map((type, index)=>{
                return(
                <tr className="border-b text-base transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={type._id}>
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">{type.ten_loai}</td>
                    <td className="px-6 py-4">{new Date(type.ngay_tao).toLocaleDateString("vi")}</td>
                    <td className="px-6 py-4">{type.mo_ta}</td>
                    <td className="px-6 py-4">
                        <div className="flex">
                            <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => confirmDelete(type._id)}>Xoá</button>
                            <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"><Link to={"/admin/types/" + type._id}>Sửa</Link></button>
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
        </>
    );
}