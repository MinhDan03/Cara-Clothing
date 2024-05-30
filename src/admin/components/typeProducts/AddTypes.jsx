import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function AddTypes(){
    const [formData, setFormData] = useState({
        ten_loai: "",
        ngay_tao: "",
        mo_ta: "",
       
      });
      const [errors, setErrors] = useState([]);
      const formRef = useRef(null);
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
         // Xóa thông báo lỗi khi người dùng thay đổi dữ liệu
            setErrors({
                ...errors,
                [e.target.id]: undefined,
            });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Thực hiện validate
         const validationErrors = validateFormData();
         // Nếu có lỗi, hiển thị thông báo và không gửi dữ liệu
         if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
          }
        try {
          // Gửi dữ liệu lên server sử dụng axios
          // console.log(formData)
          const response = await axios.post('http://localhost:8080/categories', formData);
          // console.log('Dữ liệu đã được gửi:', response.data);
          alert('Loại sản phẩm đã được thêm vào');
        //    Reset form
        formRef.current.reset();
        } catch (error) {
          console.error('Lỗi khi gửi dữ liệu:', error);
          // Xử lý lỗi nếu có
        }
      };
      const validateFormData = () => {
        const validationErrors = {};
      
        // Kiểm tra tên sản phẩm
        if (!formData.ten_loai.trim()) {
          validationErrors.ten_loai = 'Tên loại sản phẩm không được để trống';
        } else if (formData.ten_loai.length < 3) {
          validationErrors.ten_loai = 'Tên sản phẩm phải có ít nhất 3 ký tự';
        }
      
        // Kiểm tra loại sản phẩm
        if (!formData.ngay_tao.trim() ) {
          validationErrors.ngay_tao = 'Ngày tạo không được để trống';
        }
      
        // Kiểm tra giá sản phẩm
        if (!formData.mo_ta.trim()) {
          validationErrors.mo_ta = 'Mô tả loại sản phẩm không được để trống';
        }
      
        
        return validationErrors;
      };
    return(
        <>
            <section className="bg-white">
                <div className="py-4 px-4 mx-auto max-w-2xl lg:py-14">
                    <h2 className="mb-4 font-bold text-gray-900">Thêm Loại</h2>
                    <form action="#" ref={formRef} onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="ten_loai" className="block mb-2 text-sm font-medium text-gray-900">Tên Loại</label>
                                <input type="text" name="ten_loai" id="ten_loai" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder=""/>
                                {errors.ten_loai && (<div className="text-red-600">{errors.ten_loai}</div>)}
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="ngay_tao" className="block mb-2 text-sm font-medium text-gray-900">Ngày Tạo</label>
                                <input type="date" name="ngay_tao" id="ngay_tao" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder=""/>
                                {errors.ngay_tao && (<div className="text-red-600">{errors.ngay_tao}</div>)}
                            </div>        
                            <div className="sm:col-span-2">
                                <label htmlFor="mo_ta" className="block mb-2 text-sm font-medium text-gray-900">Mô tả</label>
                                <textarea id="mo_ta" rows="8" onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder=""></textarea>
                                {errors.mo_ta && (<div className="text-red-600">{errors.mo_ta}</div>)}    
                            </div>
                        </div>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 mr-1 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg">
                            Thêm
                        </button>
                        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><Link to="/admin/listTypes">Danh sách</Link></button>
                    </form>
                </div>
            </section>
        </>
    );
}