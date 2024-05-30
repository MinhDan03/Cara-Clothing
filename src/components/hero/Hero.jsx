import { Link } from "react-router-dom";
export default function Hero() {
    return (
        <>
            <section id="hero">
                <h4>Ưu đãi trao đổi</h4>
                <h2>Ưu đãi siêu giá trị</h2>
                <h1>Trên tất cả các sản phẩm</h1>
                <p>
                    Tiết kiệm nhiều hơn với phiếu giảm giá và giảm giá tới 70%!
                </p>
                <Link to="/shopAll"><button>Mua Ngay</button></Link>
            </section>
        </>
    );
}
