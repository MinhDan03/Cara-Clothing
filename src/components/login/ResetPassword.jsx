import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ResetPassword(){
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
          .required('Mật khẩu mới là bắt buộc')
          .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu nhập lại không khớp')
          .required('Nhập lại mật khẩu là bắt buộc'),
      });
      const formik = useFormik({
        initialValues: {
          newPassword: '',
          confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                // Lấy email từ sessionStorage
                const email = sessionStorage.getItem('email');
        
                // Thực hiện cuộc gọi API để cập nhật mật khẩu
                const response = await axios.put('http://localhost:8080/users/reset-password', {
                  email: email,
                  newPassword: values.newPassword,
                  confirmPassword: values.confirmPassword,
                });
        
                // Kiểm tra response từ server và xử lý tương ứng
                if (response.data.status === 'Success') {
                  // Cập nhật thành công, có thể chuyển hướng hoặc thực hiện các hành động khác
                  sessionStorage.removeItem("email");
                  // console.log('Mật khẩu đã được cập nhật thành công!');
                  alert('Mật khẩu đã được cập nhật thành công');
                  navigate("/login");
                } else {
                  // Xử lý trường hợp không thành công, có thể hiển thị thông báo lỗi
                  console.error('Lỗi khi cập nhật mật khẩu:', response.data);
                  alert('Mật khẩu cập nhật không thành công');
                }
              } catch (error) {
                console.error('Lỗi khi gọi API cập nhật mật khẩu:', error);
              }
        },
      });
      
    return(
        <>
            <section className="login flex items-center justify-center">
                <div className="box-login bg-white mx-auto rounded-md">
                    <h2 className="text-3xl font-semibold text-center mb-8">Đặt Lại Mật Khẩu</h2>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <div className="form-control flex flex-col mb-5">
                            <label htmlFor="newPassword" className="mb-2 font-medium">Mật khẩu mới</label>
                            <input type="password" name="newPassword" id="newPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} placeholder="" className="border rounded h-10 text-zinc-500 bg-slate-100 px-3"/>
                            {formik.touched.newPassword && formik.errors.newPassword && (<p className="text-red-600 text-sm mt-1">{formik.errors.newPassword}</p>)}
                        </div>
                        <div className="form-control flex flex-col mb-5">
                            <label htmlFor="confirmPassword" className="mb-2 font-medium">Nhập lại mật khẩu</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} placeholder="" className="border rounded h-10 text-zinc-500 bg-slate-100 px-3"/>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (<p className="text-red-600 text-sm mt-1">{formik.errors.confirmPassword}</p>)}
                        </div>
                        <button type="submit" className="block mx-auto h-11 w-full bg-blue-600 text-white font-medium rounded duration-75 hover:bg-blue-700 mb-5">Cập nhật</button>
                    </form>
                </div>
             </section>
        </>
    );
}