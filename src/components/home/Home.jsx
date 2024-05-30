import Hero from "../hero/Hero";
import Features from "../features/Features";
import Products from "../products/Products";
import Banner from "../banner/Banner";
import SmallBanner from "../smallbanner/SmallBanner";
import Newsletter from "../newsletter/Newsletter";
export default function Home(){
    const productSummer = {
        title: "Sản phẩm nổi bật",
        desc: "Bộ sưu tập mùa hè thiết kế hiện đại",
        quantityStart: 0,
        quantityEnd: 8,
    }
    const productLaunch = {
        title: "Sản phẩm ra mắt",
        desc: "Những sản phẩm ra mắt mới nhất tại Cara",
        quantityStart: 8,
        quantityEnd: 16,
    }
    return(
   
             <>
                <Hero></Hero>
                <Features></Features>
                <Products {...productSummer}></Products>
                <Banner></Banner>
                <Products {...productLaunch}></Products>
                <SmallBanner></SmallBanner>
                <Newsletter></Newsletter>
            </>
      
    );
}