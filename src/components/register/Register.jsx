import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function Register(){
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          full_name: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
        validationSchema: Yup.object({
        full_name: Yup.string().required('Tên không được trống'),
          email: Yup.string().email('Email không hợp lệ').required('Email không được trống'),
          password: Yup.string().required('Mật khẩu không được trống'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
            .required('Mật khẩu xác nhận không được trống'),
        }),
        onSubmit: async (values) => {
            try {
                const {confirmPassword, ...dataUser} = values;

                // console.log(data);
              // Gửi dữ liệu lên server sử dụng Axios
              const response = await axios.post('http://localhost:8080/users/register', dataUser);
        
            //   console.log('Dữ liệu đã được gửi:', response.data);
              alert('Đăng ký thành công!'); // Hoặc có thể thực hiện chuyển hướng đến trang đăng nhập
              navigate("/login");
            } catch (error) {
              console.error('Lỗi khi gửi dữ liệu:', error);
              alert('Đăng ký không thành công!');
            }
          },
      });
    return(
        <>
            <section className="login register flex items-center justify-center">
                <div className="box-login box-register bg-white mx-auto my-auto rounded-md">
                    <h2 className="text-3xl font-semibold text-center mb-5">Tạo Tài Khoản</h2>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <div className="form-control flex flex-col mb-3">
                            <label htmlFor="full_name" className="mb-2 font-medium">Tên </label>
                            <input type="text" name="full_name" id="full_name"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.full_name} placeholder="" className="border rounded h-10 text-zinc-500 bg-slate-100 px-3"/>
                            {formik.touched.full_name && formik.errors.full_name && (<div className="text-red-600">{formik.errors.full_name}</div>)}
                        </div>
                        <div className="form-control flex flex-col mb-3">
                            <label htmlFor="email" className="mb-2 font-medium">Email</label>
                            <input type="email" name="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder="name@gmail.com" className="border rounded h-10 text-zinc-500 bg-slate-100 px-3"/>
                            {formik.touched.email && formik.errors.email && (<div className="text-red-600">{formik.errors.email}</div>)}
                        </div>
                        <div className="form-control  flex flex-col mb-3">
                            <label htmlFor="password" className="mb-2 font-medium">Mật khẩu</label>
                            <input type="password" name="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="border rounded h-10 text-zinc-500 bg-slate-100 px-3" placeholder="**********"/>
                            {formik.touched.password && formik.errors.password && (<div className="text-red-600">{formik.errors.password}</div>)}
                        </div>
                        <div className="form-control  flex flex-col mb-3">
                            <label htmlFor="confirmPassword" className="mb-2 font-medium">Nhập lại mật khẩu</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} className="border rounded h-10 text-zinc-500 bg-slate-100 px-3" placeholder="**********"/>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (<div className="text-red-600">{formik.errors.confirmPassword}</div>)}
                        </div>
                        <div className="form-control flex justify-between mb-2">
                            <div></div>
                            <div><a href="#" className="text-blue-800 font-semibold hover:underline">Quên mật khẩu?</a></div>     
                        </div>
                        <button type="submit" className="block mx-auto h-11 w-full bg-blue-600 text-white font-medium rounded duration-75 hover:bg-blue-700 mb-5">Đăng ký</button>
                        <div className="text-center"><Link to="/login" className="text-blue-800 font-semibold hover:underline">Tôi đã có tài khoản?</Link></div>
                    </form>
                </div>
             </section>
        </>
    );
}