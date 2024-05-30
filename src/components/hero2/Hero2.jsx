export default function Hero2({title, desc, img}) {

    return (
        <>
            <section id="page-header" className={img ? 'blog-header' : ''}>
                <h2>#{title}</h2>
                <p>{desc}</p>
            </section>
        </>
    );
}
