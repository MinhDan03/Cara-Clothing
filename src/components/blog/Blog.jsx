import Hero2 from "../hero2/Hero2";
import BlogItem from "../blogitem/BlogItem";
import Pagination from "../pagination/Pagination";
import Newsletter from "../newsletter/Newsletter";
export default function Blog() {
    const imgValue = true;
    return (
        <>
            <Hero2
                title="Đọc Thêm"
                desc="Đọc tất cả các nghiên cứu điển hình về sản phẩm của chúng tôi"
                img={imgValue}
            ></Hero2>
            <BlogItem></BlogItem>
            <Pagination></Pagination>
            <Newsletter></Newsletter>
        </>
    );
}
