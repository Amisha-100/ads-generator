import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import { useState } from "react";
import styles from "../pages/index.module.css";

function CarouselView(props){
    const [carouselIndex, setCarouselIndex] = useState();
    const [textIndex, setTextIndex] = useState();

    function handleChange(index){
        setCarouselIndex(index);
    }

    function handleTextChange(index){
        setTextIndex(index);
    }

    return (
        <div>
        <Carousel showArrows={true} showThumbs={true} autoPlay={false} infiniteLoop={true} selectedItem={props.images[carouselIndex]} onChange={handleChange} className={styles.carouselContainer}>
            {props.images.map(
            (img_url, index)=> (
                <div key={index}>
                    <img src={img_url}/>
                    {/* <p className="legend">{props.captionArray[index%5]}</p> */}
                </div>
            ))}
        </Carousel>
        <br/>

        <Carousel showArrows={true} showThumbs={false} autoPlay={false} infiniteLoop={true} selectedItem={props.captionArray[textIndex]} onChange={handleTextChange} className={styles.carouselContainer}>
            {props.captionArray.map(
                (value,idx) => (
                <div key={idx}>
                    <p>{value}</p>
                    <br/>
                    <br/>
                </div>
            ))}
        </Carousel>

        <Carousel showArrows={true} showThumbs={false} autoPlay={false} infiniteLoop={true} selectedItem={props.hashtagArray[textIndex]} onChange={handleTextChange} className={styles.carouselContainer}>
            {props.hashtagArray.map(
                (value,idx) => (
                <div key={idx}>
                    <p>{value}</p>
                    <br/>
                    <br/>
                </div>
            ))}
        </Carousel>

        </div>
        
    )
}

export default CarouselView