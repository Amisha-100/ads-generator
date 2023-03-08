import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import { useState } from "react";
import styles from "./index.module.css";

export default function Carousel1({images}){
    const [carouselIndex, setCarouselIndex] = useState();

    function handleChange(index){
        setCarouselIndex(index);
    }

    return(
        <Carousel showArrows={true} showThumbs={true} autoPlay={true} infiniteLoop={true} selectedItem={images[carouselIndex]} onChange={handleChange} className={styles.carouselContainer}>
        {images.map(
        (img_url, index)=> (
            <div key={index}>
                <img src={img_url}/>
                <p className="legend">legend</p>
            </div>
        ))}
        </Carousel>
    )
}
