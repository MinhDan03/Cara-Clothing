import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { removeFromCart, clearCart, updateQuantity  } from '../slices/cartSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Cart() {
    const cartProducts = useSelector((state) => state.cart.listProduct);
    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleCheckoutClick = () => {
        if (isAuthenticated) {
          // Nếu đã đăng nhập, chuyển hướng đến trang Checkout
          navigate('/checkout');
        } else {
          // Nếu chưa đăng nhập, chuyển hướng đến trang Login
          navigate('/login');
        }
      };
    // console.log(cartProducts);
     // Tính tổng giỏ hàng
     const totalCartAmount = cartProducts.reduce((total, product) => {
        return total + product.quantity * product.price;
        }, 0);
        // console.log(totalCartAmount)
        const handleQuantityChange = (productId, newQuantity) => {
            // Dispatch action để cập nhật số lượng sản phẩm trong Redux store
            dispatch(updateQuantity({ productId, newQuantity }));
        };
        const handleRemoveProduct = (productId) => {
                // Hiển thị hộp thoại xác nhận trước khi xoá
            const shouldRemove = window.confirm('Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?');
            if (shouldRemove) {
                // Dispatch action để xoá sản phẩm từ Redux store
                dispatch(removeFromCart(productId));
            }
        };
    return (
        
        <>
        <section id="page-header" className="about-header">
            <h2>#Giỏ Hàng</h2>
            <p>Thêm mã giảm giá của bạn sẽ tiết kiệm lên tới 70%</p>
        </section>
        {/* Cart */}
        <section id="cart" className="section-p1">
            <table width="100%">
                <thead>
                    <tr>
                        <td>Xoá</td>
                        <td>Hình Ảnh</td>
                        <td>Sản Phẩm</td>
                        <td>Giá</td>
                        <td>Số Lượng</td>
                        <td>Tổng</td>
                    </tr>
                </thead>
                <tbody>
                        {cartProducts.map((product) => (
                            <tr key={product?.id}>
                                <td><a href="#" className="remove" onClick={() => handleRemoveProduct(product?.id)}><i className="fas fa-times-circle"></i></a></td>
                                <td><img src={product?.img} alt={product?.ten_sp} className="mx-auto" /></td>
                                <td>{product?.name}</td>
                                <td>{Number(product?.price).toLocaleString("vi")}đ</td>
                                <td><input type="number" className="border" name="" id="" defaultValue={product.quantity} min="1" onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}/></td>
                                <td>{Number(product?.quantity * product?.price).toLocaleString("vi")}đ</td>
                            </tr>
                        ))}
                   
                </tbody>
            </table>
        </section>
        <section id="cart-add" className="section-p1">
                <div className="coupon">
                    <h3>Áp Dụng Phiếu Giảm Giá</h3>
                    <div className="form-coupon">
                        <input type="text" name="" id="" placeholder="Nhập Coupon của bạn"/>
                        <button type="submit" className="normal hover:scale-95" style={{background: '#088178', color: '#fff', padding: '12px 20px'}}>Áp dụng</button>
                    </div>
                </div>
                <div id="subtotal">
                    <h3>Tổng Giỏ Hàng</h3>
                    <table>
                        <tr>
                            <td>Tổng Của Giỏ Hàng</td>
                            <td>{Number(totalCartAmount).toLocaleString("vi")}đ</td>
                        </tr>
                        <tr>
                            <td>Phí Chuyển Hàng</td>
                            <td>Miễn Phí</td>
                        </tr>
                        <tr>
                            <td><strong>Tổng</strong></td>
                            <td><strong>{Number(totalCartAmount).toLocaleString("vi")}đ</strong></td>
                        </tr>
                    </table>
                    <button type="submit" className="normal hover:scale-95" onClick={handleCheckoutClick}>Thanh Toán</button>
                    
                </div>
            </section>
        </>
    );
}
