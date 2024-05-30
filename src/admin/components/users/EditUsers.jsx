import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function EditUsers(){
    const { userID } = useParams();
    const navigate = useNavigate();
    const [passwordChanged, setPasswordChanged] = useState(false);
    //   Validate form
    const validationSchema = Yup.object().shape({
        full_name: Yup.string().required('Tên không được trống'),
        email: Yup.string().email('Email không hợp lệ').required('Email không được trống'),
        address: Yup.string().required('Địa chỉ không được trống'),
        phone_number: Yup.string().required('Số điện thoại không được trống'),
        date_of_birth: Yup.date().required('Ngày sinh không được trống'),
        image_thumb: Yup.string().required('Hình đại diện không được trống'),
        role: Yup.string().required('Vui lòng chọn vai trò'),
        // password: Yup.string().required('Mật khẩu không được trống'),
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
        onSubmit: async (values) => {
            try {
                if (passwordChanged) {
                  // Nếu mật khẩu đã thay đổi, thực hiện yêu cầu cập nhật mật khẩu
                  await axios.put(`http://localhost:8080/users/${userID}`, values);
                } else {
                  // Nếu mật khẩu không thay đổi, loại bỏ trường password khỏi dữ liệu gửi đi
                  delete values.password;
                  // Thực hiện yêu cầu cập nhật mà không bao gồm mật khẩu
                  await axios.put(`http://localhost:8080/users/${userID}`, values);
                }
                // console.log('Dữ liệu đã được cập nhật thành công!');
                alert('Dữ liệu đã được cập nhật thành công');
                navigate("/admin/listUsers");
                // navigate('/admin/listUsers');
              } catch (error) {
                console.error('Lỗi khi cập nhật dữ liệu người dùng:', error);
              }
          },
      });
      useEffect(() => {
        const fetchData = async () => {
          try {
            // Gọi API để lấy dữ liệu của người dùng cụ thể
            const response = await axios.get(`http://localhost:8080/users/${userID}`);
            const userData = response.data;
            // console.log(userData);
            const date_of_birth_format = moment( userData.date_of_birth).format("YYYY-MM-DD");
            // Cập nhật giá trị của formik với dữ liệu lấy từ API
            formik.setValues({ 
              full_name: userData.full_name,
              email: userData.email,
              address: userData.address,
              phone_number: userData.phone_number,
              date_of_birth: date_of_birth_format,
              image_thumb: userData.image_thumb,
              role: userData.role,
              password: '', // Không lấy mật khẩu từ API vì an toàn
            });
          } catch (error) {
            console.error('Lỗi khi lấy dữ liệu người dùng:', error);
          }
        };
    
        fetchData();
      }, [userID]);
    return(
        <>
            <section className="bg-white">
                <div className="py-4 px-4 mx-auto max-w-2xl lg:py-24">
                    <h2 className="mb-4 font-bold text-gray-900">Cập nhật Người Dùng</h2>
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
                                <input type="password" name="password" id="password" value={formik.values.password} onChange={(e)=> {formik.handleChange(e); setPasswordChanged(true);}} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.touched.password && formik.errors.password && ( <div className="text-red-600">{formik.errors.password}</div>)}                    
                            </div>
                        </div>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 mr-1 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg">
                            Cập nhật
                        </button>
                        
                    </form>
                </div>
            </section>
        </>
    );
}