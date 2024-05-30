import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ForgotPassword(){
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email không hợp lệ').required('Email không được trống'),
      });
      const formik = useFormik({
        initialValues: {
          email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          try {
            // Gửi email và nhận mã OTP từ server
            const response = await axios.post('http://localhost:8080/users/forgot-password', { email: values.email });
          // Kiểm tra nếu response.data.Status là 'Success'
            if (response.data.Status === 'Success') {
                // Lưu OTP vào Session Storage
                sessionStorage.setItem('otp', response.data.otp);
                sessionStorage.setItem('email', values.email);
                // Chuyển hướng đến trang OTP

                navigate("/verifyOTP");
                alert('Gửi email thành công'); 
            } else {
                // Xử lý trường hợp không thành công
                if (response.data.error) {
                // Hiển thị thông báo cho người dùng
                alert('Email không tồn tại');
                } else {
                // Xử lý các trường hợp lỗi khác (nếu cần)
                console.error('Lỗi khi gửi email:', response.data);
                }
            }
          } catch (error) {
            console.error('Lỗi khi gửi email:', error);
          }
        },
      });
    return(
        <>
             <section className="login flex items-center justify-center">
                <div className="box-login bg-white mx-auto rounded-md">
                    <h2 className="text-3xl font-semibold text-center mb-8">Quên Mật Khẩu</h2>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <div className="form-control flex flex-col mb-5">
                            <label htmlFor="email" className="mb-2 font-medium">Email</label>
                            <input type="email" name="email" id="email"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder="name@gmail.com" className="border rounded h-10 text-zinc-500 bg-slate-100 px-3"/>
                            {formik.touched.email && formik.errors.email && (<div className="text-red-600">{formik.errors.email}</div>)}
                        </div>
                        <button type="submit" className="block mx-auto h-11 w-full bg-blue-600 text-white font-medium rounded duration-75 hover:bg-blue-700 mb-5">Gửi</button>
                    </form>
                </div>
             </section>
        </>
    );
}