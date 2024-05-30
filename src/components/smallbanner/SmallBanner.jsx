import { Link } from "react-router-dom";
export default function SmallBanner() {
    return (
        <>
            <section id="sm-banner" className="section-p1">
                <div className="banner-box">
                    <h4>Ưu đãi điên rồ</h4>
                    <h2>Mua 1 tặng 1</h2>
                    <span>
                        {" "}
                        Chiếc váy cổ điển đẹp nhất đang được giảm giá tại cara
                    </span>
                    <Link to="/shopAll"><button className="white">Tìm hiểu thêm</button></Link>
                </div>
                <div className="banner-box banner-box2">
                    <h4>Spring/Summer</h4>
                    <h2>Mùa sắp tới</h2>
                    <span>
                        Chiếc áo mùa xuân đẹp nhất đang được giảm giá tại cara
                    </span>
                    <Link to="/shopAll"><button className="white">Bộ sưu tập</button></Link>
                </div>
            </section>
        </>
    );
}
