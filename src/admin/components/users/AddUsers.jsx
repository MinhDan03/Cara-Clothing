
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function AddUsers(){
    //   Validate form
    const validationSchema = Yup.object().shape({
        full_name: Yup.string().required('Tên không được trống'),
        email: Yup.string().email('Email không hợp lệ').required('Email không được trống'),
        address: Yup.string().required('Địa chỉ không được trống'),
        phone_number: Yup.string().required('Số điện thoại không được trống'),
        date_of_birth: Yup.date().required('Ngày sinh không được trống'),
        image_thumb: Yup.string().required('Hình đại diện không được trống'),
        role: Yup.string().required('Vui lòng chọn vai trò'),
        password: Yup.string().required('Mật khẩu không được trống'),
      });
      const formik = useFormik({
        initialValues: {
            full_name: '',
            email: '',
            address: '',
            phone_number: '',
            date_of_birth: '',
            image_thumb: '',
            role: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                // Gửi dữ liệu lên server sử dụng Axios
                const response = await axios.post('http://localhost:8080/users/register', values);
                // console.log('Dữ liệu đã được gửi:', response.data);
                alert('Thêm người dùng thành công!');
                 // Reset formik khi thành công
                 resetForm();
              } catch (error) {
                console.error('Lỗi khi gửi dữ liệu:', error);
                alert('Thêm người dùng không thành công!');
              }
          },
      });
    return(
        <>
            <section className="bg-white">
                <div className="py-4 px-4 mx-auto max-w-2xl lg:py-24">
                    <h2 className="mb-4 font-bold text-gray-900">Thêm Người Dùng</h2>
                    <form action="#" onSubmit={formik.handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900">Tên Người Dùng</label>
                                <input type="text" name="full_name" id="full_name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.full_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.full_name && formik.errors.full_name && ( <div className="text-red-600">{formik.errors.full_name}</div>)}
                            </div>             
                            <div className="w-full">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.email && formik.errors.email && ( <div className="text-red-600">{formik.errors.email}</div>)}
                            </div>
                            <div className="w-full">
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa Chỉ</label>
                                <input type="text" name="address" id="address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.address && formik.errors.address && ( <div className="text-red-600">{formik.errors.address}</div>)}                    
                            </div>
                            <div className="w-full">
                                <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900">Số Điện Thoại</label>
                                <input type="text" name="phone_number" id="phone_number" value={formik.values.phone_number} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.phone_number && formik.errors.phone_number && ( <div className="text-red-600">{formik.errors.phone_number}</div>)}                    
                            </div>
                            <div className="w-full">
                                <label htmlFor="date_of_birth" className="block mb-2 text-sm font-medium text-gray-900">Ngày Sinh</label>
                                <input type="date" name="date_of_birth" id="date_of_birth" value={formik.values.date_of_birth} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.date_of_birth && formik.errors.date_of_birth && ( <div className="text-red-600">{formik.errors.date_of_birth}</div>)}                    
                            </div>   
                            <div className="w-full">
                                <label htmlFor="image_thumb" className="block mb-2 text-sm font-medium text-gray-900">Hình đại diện</label>
                                <input type="text" name="image_thumb" id="image_thumb" value={formik.values.image_thumb} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.image_thumb && formik.errors.image_thumb && ( <div className="text-red-600">{formik.errors.image_thumb}</div>)}                    
                            </div>
                            <div className="w-full">
                                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Chọn Vai Trò</label>
                                <select id="role" name="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                    <option value="" disabled hidden>Chọn Vai Trò</option>
                                    <option value="1">Người Dùng</option>
                                    <option value="3">Quản Trị</option>
                                </select>
                                {formik.touched.role && formik.errors.role && ( <div className="text-red-600">{formik.errors.role}</div>)}                              
                            </div>
                            <div className="w-full">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.password && formik.errors.password && ( <div className="text-red-600">{formik.errors.password}</div>)}                    
                            </div>
                        </div>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 mr-1 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg">
                            Thêm
                        </button>
                        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><Link to="/admin/listUsers">Danh sách</Link></button>
                    </form>
                </div>
            </section>

        </>
    );
}