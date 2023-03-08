import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import { useState } from "react";
import styles from "./index.module.css";

export default function Carousel1(props){
    const [carouselIndex, setCarouselIndex] = useState();
    const [textIndex, setTextIndex] = useState();

    function handleChange(index){
        setCarouselIndex(index);
    }

    function handleTextChange(index){
        setTextIndex(index);
    }
    console.log(props.images)
    console.log(props.headlineArray)
    return (
        <div>
        <Carousel showArrows={true} showThumbs={true} autoPlay={true} infiniteLoop={true} selectedItem={props.images[carouselIndex]} onChange={handleChange} className={styles.carouselContainer}>
        {props.images.map(
        (img_url, index)=> (
            <div key={index}>
                <img src={img_url}/>
                <p className="legend">{props.headlineArray[index%5]}</p>
            </div>
        ))}
        </Carousel>
        <br/>

        <Carousel showArrows={true} showThumbs={false} autoPlay={true} infiniteLoop={true} selectedItem={props.headlineArray[textIndex]} onChange={handleTextChange} className={styles.carouselContainer}>
            {props.headlineArray.map(
                (x,idx)=> (
                <div key={idx}>
                    <p>{x}</p>
                    <br/>
                    <br/>
                </div>
            ))}
        </Carousel>
        </div>
        
    )
}
