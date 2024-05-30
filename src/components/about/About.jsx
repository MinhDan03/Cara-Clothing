import Features from "../features/Features";
import Newsletter from "../newsletter/Newsletter";
export default function About() {
    return (
        <>
            <section id="page-header" className="about-header">
                <h2>#Về Chúng Tôi</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </section>
            {/* <!-- About --> */}
            <section id="about-head" className="section-p1">
                <img src="img/about/a6.jpg" alt="" />
                <div className="info">
                    <h2>Chúng tôi là ai?</h2>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Commodi, similique ad beatae pariatur quia sequi
                        placeat ut earum perferendis mollitia distinctio
                        laborum! Deleniti veritatis magni in quis inventore
                        voluptatem dicta explicabo corrupti incidunt soluta quos
                        alias tempora repellat debitis earum, et voluptatum.
                        Dolore, error. Odio, rem deleniti obcaecati veritatis
                        est vitae et dignissimos laudantium, quis totam ea
                        nostrum minus, aliquam neque quae perferendis. Excepturi
                        quas commodi, perferendis aperiam, velit nostrum id
                        doloremque quam quasi corporis debitis similique!
                    </p>
                    {/* <!-- <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">Cảm ơn các bạn đã ghé thăm của hàng của chúng tôi!</marquee> --> */}
                    <br />
                </div>
            </section>
            <Features></Features>
            <Newsletter></Newsletter>
        </>
    );
}
