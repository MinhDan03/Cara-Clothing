import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { loginSuccessAdmin } from "../../../features/auth/authAdminSlice";
import { useNavigate } from "react-router-dom";
export default function LoginAdmin(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Email không hợp lệ').required('Email không được trống'),
          password: Yup.string().required('Mật khẩu không được trống'),
        }),
        onSubmit: async (values) => {
            try {
              // Gửi dữ liệu đăng nhập tới server
              const response = await axios.post('http://localhost:8080/users/login', values);
                 // console.log(response.data);
            if (response.status === 200) {
                // console.log(response.data);
                // Lưu thông tin người dùng và token vào trạng thái
                dispatch(loginSuccessAdmin({ admin: response.data.user, token: response.data.token , expiresIn: response.data.expiresIn}));
        
                // // Lưu thông tin người dùng và token vào localStorage hoặc cookie nếu cần
                localStorage.setItem('admin', JSON.stringify(response.data.user));
                localStorage.setItem('tokenAd', response.data.token);
                localStorage.setItem('expiresInAd', response.data.expiresIn);
                 // Kiểm tra vai trò của người dùng và điều hướng đến trang phù hợp
               
                // Vai trò là 3, điều hướng đến trang admin
                if (response.data.user.role === 3) {
                    // Vai trò là 1 hoặc 3, điều hướng đến trang khách hàng
                    alert('Đăng nhập Admin thành công');
                    navigate('/admin');
                }else{
                    alert('Đăng nhập Admin không thành công');
                    navigate('/loginAdmin');
                }
                
                
            } else {
                // Xử lý lỗi tại đây nếu status code không phải 200
                console.error('Đăng nhập không thành công. Status code:', response.status);
            }
            } catch (error) {
              console.error('Lỗi khi đăng nhập:', error);
              alert('Đăng nhập không thành công!');
            }
          },
      });
   
    return(
        <>
             <section className="login flex items-center justify-center">
                <div className="box-login bg-white mx-auto rounded-md">
                    <h2 className="text-3xl font-semibold text-center mb-8">Đăng Nhập</h2>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <div className="form-control flex flex-col mb-5">
                            <label htmlFor="email" className="mb-2 font-medium">Email</label>
                            <input type="email" name="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder="name@gmail.com" className="border rounded h-10 text-zinc-500 bg-slate-100 px-3"/>
                            {formik.touched.email && formik.errors.email && (<div className="text-red-600">{formik.errors.email}</div>)}
                        </div>
                        <div className="form-control  flex flex-col mb-5">
                            <label htmlFor="password" className="mb-2 font-medium">Password</label>
                            <input type="password" name="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="border rounded h-10 text-zinc-500 bg-slate-100 px-3" placeholder="**********"/>
                            {formik.touched.password && formik.errors.password && (<div className="text-red-600">{formik.errors.password}</div>)}
                        </div>
                        <div className="form-control flex justify-between mb-5">
                            <div></div>
                            <div><a href="#" className="text-blue-800 font-semibold hover:underline">Quên mật khẩu?</a></div>     
                        </div>
                        <button type="submit" className="block mx-auto h-11 w-full bg-blue-600 text-white font-medium rounded duration-75 hover:bg-blue-700 mb-5">Đăng nhập</button>
                        {/* <div className="text-center"><Link to="/register" className="text-blue-800 font-semibold hover:underline">Tôi chưa có tài khoản?</Link></div> */}
                    </form>
                </div>
             </section>
        </>
    );
}