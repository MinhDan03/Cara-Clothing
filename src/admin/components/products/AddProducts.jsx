import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function AddProducts(){
      const [categories, setCategories] = useState([]);
      useEffect(() => {
        // Gọi API để lấy danh sách loại sản phẩm
        const fetchCategories = async () => {
          try {
            const response = await axios.get('http://localhost:8080/categories');
            setCategories(response.data);
          } catch (error) {
            console.error('Lỗi khi lấy danh sách loại sản phẩm:', error);
          }
        };
    
        fetchCategories();
      }, []);
    //   Validate form
    const validationSchema = Yup.object().shape({
        ten_sp: Yup.string().required('Tên Sản Phẩm không được trống'),
        iddm: Yup.string().required('Danh Mục không được trống'),
        gia: Yup.number().required('Giá không được trống').positive('Giá phải là số dương'),
        gia_km: Yup.number().required('Giá Khuyến Mãi không được trống').positive('Giá Khuyến Mãi phải là số dương'),
        hinh: Yup.string().required('Hình không được trống'),
        ngay: Yup.date().required('Ngày Tạo không được trống'),
        soluong: Yup.number().required('Số lượng không được trống').integer('Số lượng phải là số nguyên'),
        xuat_xu: Yup.string().required('Xuất Xứ không được trống'),
        tinh_trang: Yup.string().required('Tình Trạng không được trống'),
        mo_ta: Yup.string().required('Mô tả không được trống'),
      });
      const formik = useFormik({
        initialValues: {
          ten_sp: '',
          iddm: '',
          gia: 0,
          gia_km: 0,
          hinh: '',
          ngay: '',
          soluong: 0,
          xuat_xu: '',
          tinh_trang: '',
          mo_ta: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
              // Chuyển chuỗi thành mảng khi submit form
              const regex = /(https:[^ ]+\.jpg)/g;
              const imageArray = values.hinh.match(regex);
            //   console.log({ ...values, hinh: imageArray });
              // Gửi dữ liệu lên server
              const response = await axios.post('http://localhost:8080/products', {
                ...values,
                hinh: imageArray,
              });
        
              // console.log('Dữ liệu đã được gửi:', response.data);
              alert('Thêm sản phẩm thành công!');
             // Reset form
             formik.resetForm();
        
              // Xử lý logic sau khi gửi dữ liệu thành công
            } catch (error) {
              console.error('Lỗi khi gửi dữ liệu:', error);
              // Xử lý lỗi nếu có
              alert('Thêm sản phẩm không thành công');
            }
          },
      });
  
    return(
        <>
            {/* <h1>Đây là trang thêm sản phẩm</h1> */}
            <section className="bg-white">
                <div className="py-4 px-4 mx-auto max-w-2xl lg:py-14">
                    <h2 className="mb-4 font-bold text-gray-900">Thêm Sản Phẩm</h2>
                    <form action="#" onSubmit={formik.handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label htmlFor="ten_sp" className="block mb-2 text-sm font-medium text-gray-900">Tên Sản Phẩm</label>
                                <input type="text" name="ten_sp" id="ten_sp" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.ten_sp} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.ten_sp && formik.errors.ten_sp && ( <div className="text-red-600">{formik.errors.ten_sp}</div>)}
                            </div>
                            <div className="w-full">
                                <label htmlFor="iddm" className="block mb-2 text-sm font-medium text-gray-900">Danh Mục</label>
                                <select id="iddm" name="iddm" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" value={formik.values.iddm} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                    <option  value="" disabled hidden>Chọn danh mục</option>
                                    {categories.map((category)=>
                                        <option key={category._id} value={category._id}>{category.ten_loai}</option>
                                    )}
                                </select>
                                {formik.touched.iddm && formik.errors.iddm && ( <div className="text-red-600">{formik.errors.iddm}</div>)}
                            </div>
                            <div className="w-full">
                                <label htmlFor="gia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
                                <input type="number" name="gia" id="gia" value={formik.values.gia} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.gia && formik.errors.gia && ( <div className="text-red-600">{formik.errors.gia}</div>)}
                            </div>
                            <div className="w-full">
                                <label htmlFor="gia_km" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá Khuyến Mãi</label>
                                <input type="number" name="gia_km" id="gia_km" value={formik.values.gia_km} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.gia_km && formik.errors.gia_km && ( <div className="text-red-600">{formik.errors.gia_km}</div>)}                    
                            </div>
                            <div className="w-full">
                                <label htmlFor="hinh" className="block mb-2 text-sm font-medium text-gray-900">Hình</label>
                                <input type="text" name="hinh" id="hinh" value={formik.values.hinh} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.hinh && formik.errors.hinh && ( <div className="text-red-600">{formik.errors.hinh}</div>)}                    
                            </div>
                            <div className="w-full">
                                <label htmlFor="ngay" className="block mb-2 text-sm font-medium text-gray-900">Ngày Tạo</label>
                                <input type="date" name="ngay" id="ngay" value={formik.values.ngay} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.ngay && formik.errors.ngay && ( <div className="text-red-600">{formik.errors.ngay}</div>)}                    
                            </div>   
                            <div className="w-full">
                                <label htmlFor="soluong" className="block mb-2 text-sm font-medium text-gray-900">Số lượng</label>
                                <input type="number" name="soluong" id="soluong" value={formik.values.soluong} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.soluong && formik.errors.soluong && ( <div className="text-red-600">{formik.errors.soluong}</div>)}                    
                            </div>
                            <div className="w-full">
                                <label htmlFor="xuat_xu" className="block mb-2 text-sm font-medium text-gray-900">Xuất Xứ</label>
                                <input type="text" name="xuat_xu" id="xuat_xu" value={formik.values.xuat_xu} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.xuat_xu && formik.errors.xuat_xu && ( <div className="text-red-600">{formik.errors.xuat_xu}</div>)}                              
                            </div>   
                            <div className="sm:col-span-2">
                                <label htmlFor="tinh_trang" className="block mb-2 text-sm font-medium text-gray-900">Tình Trạng</label>
                                <select id="tinh_trang" name="tinh_trang" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" value={formik.values.tinh_trang} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                    <option value="" disabled hidden>Chọn tình trạng</option>
                                    <option value="Mới">Mới</option>
                                    <option value="Đã sử dụng">Đã sử dụng</option>
                                    <option value="Hàng khuyến mãi">Hàng khuyến mãi</option>
                                </select>
                                {formik.touched.tinh_trang && formik.errors.tinh_trang && ( <div className="text-red-600">{formik.errors.tinh_trang}</div>)}                              
                            </div>
                            
                            <div className="sm:col-span-2">
                                <label htmlFor="mo_ta" className="block mb-2 text-sm font-medium text-gray-900">Mô tả</label>
                                <textarea id="mo_ta" rows="8" value={formik.values.mo_ta} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"></textarea>
                                {formik.touched.mo_ta && formik.errors.mo_ta && ( <div className="text-red-600">{formik.errors.mo_ta}</div>)}                              
                            </div>
                        </div>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 mr-1 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg">
                            Thêm
                        </button>
                        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><Link to="/admin/listProducts">Danh sách</Link></button>
                    </form>
                </div>
            </section>
        </>
    );
}