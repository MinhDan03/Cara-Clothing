import Newsletter from "../newsletter/Newsletter";
export default function Contact() {
    return (
        <>
            <section id="page-header" className="about-header">
                <h2>#Hãy Nói Chuyện Với Chúng Tôi</h2>
                <p>
                    Hãy để lại tin nhắn, chúng tôi rất mong nhận được phản hồi
                    từ bạn!
                </p>
            </section>
            <section id="contact-details" className="section-p1">
            <div className="details">
                <span>LIÊN LẠC</span>
                <h2> Hãy ghé thăm một trong những địa điểm đại lý của chúng tôi hoặc liên hệ với chúng tôi ngay hôm nay</h2>
                <h3>Trụ sở chính</h3>
                <div className="info">
                    <li>
                        <i className="far fa-map"></i>
                        <p>Công viên phần mềm Quang Trung, Quận 12</p>
                    </li>
                    <li>
                        <i className="far fa-envelope"></i>
                        <p>dannnmwork2003@gmail.com</p>
                    </li>
                    <li>
                        <i className="fas fa-phone-alt"></i>
                        <p>0866732171</p>
                    </li>
                    <li>
                        <i className="far fa-clock"></i>
                        <p>Thứ 2 - Thứ 7 : 9:00 - 21:00</p>
                    </li>
                </div>
            </div>
            <div className="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1188.5738003988572!2d106.62613926467651!3d10.853541268830272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1699519758123!5m2!1svi!2s"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            </section>

            <section id="form-details">
                <form action="">
                    <span>ĐỂ LẠI LỜI NHẮN</span>
                    <h2>Chúng tôi thích nghe từ bạn</h2>
                    <input type="text" placeholder="Tên của bạn" required/>
                    <input type="email" name="" id="" placeholder="Email của bạn" required/>
                    <input type="text" name="" id="" placeholder="Chủ đề" required/>
                    <textarea name="" id="" cols="30" rows="10" placeholder="Nội dung của bạn!"></textarea>
                    <button type="submit" className="normal">Gửi</button>
                </form>
                    <div className="people">
                        <div className="item-people">
                            <img src="img/people/1.png" alt="" className="avatar"/>
                            <p><span>Minh Đan</span> Fresher Front-end Developer <br/> 
                            Số điện thoại: 0866732171 <br/>
                            Email: dannnmwork2003@gmail.com
                            </p>
                    </div>
                    </div>
            </section>
            <Newsletter></Newsletter>
        </>
    );
}
