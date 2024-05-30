import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
export default function OTP(){
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        otp: Yup.string().required('Mã OTP là bắt buộc'),
      });
      const formik = useFormik({
        initialValues: {
          otp: '',
        },
        validationSchema,
        onSubmit: (values) => {
          // Lấy mã OTP từ Session Storage
          const storedOTP = sessionStorage.getItem('otp');
    
          // So sánh với mã OTP người dùng nhập
          if (values.otp === storedOTP) {
            // Mã OTP khớp, chuyển hướng đến trang reset mật khẩu
            navigate('/reset-password');
             // Thay thế "/reset-password" bằng đường dẫn thực tế của trang reset mật khẩu
             sessionStorage.removeItem("otp");
          } else {
            // Mã OTP không khớp, có thể thông báo lỗi hoặc thực hiện xử lý khác
            alert('Mã OTP không đúng');
            console.error('Mã OTP không đúng');
          }
        },
      });      
    return(
        <>
             <section className="login flex items-center justify-center">
                <div className="box-login bg-white mx-auto rounded-md">
                    <h2 className="text-3xl font-semibold text-center mb-8">Xác Thực OTP</h2>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <div className="form-control flex flex-col mb-5">
                            <label htmlFor="otp" className="mb-2 font-medium">Mã OTP</label>
                            <input type="text" name="otp" id="otp"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.otp} placeholder="" className="border rounded h-10 text-zinc-500 bg-slate-100 px-3"/>
                            {formik.touched.otp && formik.errors.otp && (<p className="text-red-500 text-sm mt-1">{formik.errors.otp}</p>)}
                        </div>
                        <button type="submit" className="block mx-auto h-11 w-full bg-blue-600 text-white font-medium rounded duration-75 hover:bg-blue-700 mb-5">Xác Thực</button>
                    </form>
                </div>
             </section>
        </>
    );
}