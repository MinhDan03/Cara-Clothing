export default function Footer(){
    return (
        <>
            <footer className="section-p1">
                <div className="col">
                    <img className="logo" src="/img/logo.png" alt=""/>
                    <h4>Liên hệ</h4>
                    <p><strong>Địa chỉ:</strong> 101 Tân Chánh Hiệp, Quận 12, TP. Hồ Chí Minh</p>
                    <p><strong>Email:</strong> dannnmwork2003net@gmail.com</p>
                    <p><strong>Điện thoại:</strong> 0866732171</p>
                    <p><strong>Giờ làm việc:</strong> 9:00 - 21:00, Thứ 2 - Thứ 7</p>
                    <div className="follow">
                        <h4>Theo dõi</h4>
                        <div className="icons">
                            <a href="https://github.com/MinhDan03" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-instagram"></i>
                            <i className="fab fa-github"></i>
                            <i className="fab fa-youtube"></i>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <h4>Thông tin</h4>
                    <a href="about.html">Về chúng tôi</a>
                    <a href="#!">Thông tin giao hàng</a>
                    <a href="#!">Chính sách bảo mật</a>
                    <a href="#!">Điều khoản và điều kiện</a>
                    <a href="contact.html">Liên hệ chúng tôi</a>
                </div>
                <div className="col">
                    <h4>Tài khoản</h4>
                    <a href="#!">Đăng nhập</a>
                    <a href="#!">Xem giỏ hàng</a>
                    <a href="#!">Sản phẩm yêu thích</a>
                    <a href="#!">Theo dõi sản phẩm yêu thích</a>
                    <a href="contact.html">Giúp đỡ</a>
                </div>
                <div className="co install">
                    <h4>Cài đặt ứng dụng</h4>
                    <p>Từ App Store hoặc Google Play</p>
                    <div className="row">
                        <img src="/img/pay/app.jpg" alt=""/>
                        <img src="/img/pay/play.jpg" alt=""/>
                    </div>
                    <p>Cổng thanh toán</p>
                    <img src="/img/pay/pay.png" alt=""/>
                </div>
                <div className="copyright">
                    <p>Copyright 2023 · Thiết kế và phát triển bởi Nguyễn Ngọc Minh Đan</p>
                </div>
            </footer>
        </>
    );
}