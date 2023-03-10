import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

import Carousel1 from "./components/Carousel";

export default function Home() {
    const [campaignText, setcampaignText] = useState("");
    const [imageText, setimageText] = useState("");
    const [colorText, setcolorText] = useState("");
    const [toneText, settoneText] = useState("");
    const [captionResult, setCaptionResult] = useState([]);
    const [imageResult, setImageResult] = useState([]);
    const [hashtagResult, setHashtagResult] = useState([]);

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const response1 = await fetch(
                "/api/generate", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ input: campaignText + ' in ' + toneText + ' manner' })
                }
            );
            
            let imageInputString = ''
            if (colorText == '' && imageText == '') {
                imageInputString = campaignText;
            } else if (colorText == '' && imageText != '') {
                imageInputString = campaignText + ', ' + imageText;
            } else if (colorText != '' && imageText == '') {
                imageInputString = campaignText + ' in ' + colorText + ' color';
            } else {
                imageInputString = campaignText + ', ' + imageText + ' in ' + colorText + ' color';
            }
            const response2 = await fetch(
                "/api/generateImages", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ input: imageInputString })
                }
            );

            const response3 = await fetch(
                "/api/generateHashtags", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ input: campaignText })
                }
            );


            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            
            if (response1.status !== 200) {
                throw data1.error || new Error(`Request failed with status ${response1.status}`);
            }
            if (response2.status !== 200) {
                throw data2.error || new Error(`Request failed with status ${response2.status}`);
            }
            if (response3.status !== 200) {
                throw data3.error || new Error(`Request failed with status ${response3.status}`);
            }

            let imageArray = data2.data.map(a => a.url);

            let temp1 = data1.result;
            let captionArray = temp1.split(',');

            let temp2 = data3.result
            let hashtagArray = temp2.split(',');

            setCaptionResult(captionArray);
            setImageResult(imageArray);
            setHashtagResult(hashtagArray);
        } catch(error) {
            console.error(error);
            alert(error.message);
        }
        console.log(captionResult)
    }

    return (
        <div>
            <Head>
                <title>Adon: Ads Generator</title>
                <link rel="icon" href="/adon-logo.png" />
            </Head>

            <main className={styles.main}>
                <img src="/adon.png" className={styles.icon} />
                <br/>

                <p className={styles.text1}>
                    AI-powered social media assistant
                </p>
                <p className={styles.text2}>
                    Make cool campaings in few clicks with Adon!
                </p>
                <div className={styles.flexParent}>
                    <div className={styles.flexChild}>
                        <p className={styles.text3}>Mention campaign details:</p>
                        <form onSubmit={onSubmit}>
                            <p className={styles.text4}>What do you want to promote?</p>
                            <input
                                type = "text"
                                name = "campaign_details"
                                placeholder = "Donuts with chocolates"
                                value = {campaignText}
                                onChange = {(e) => setcampaignText(e.target.value)}
                            />
                            <p className={styles.text4}>Communication tone</p>
                            <input
                                type = "text"
                                name = "communication_tone"
                                placeholder = "Friendly, Funny, Professional"
                                value = {toneText}
                                onChange = {(e) => settoneText(e.target.value)}
                            />
                            <p className={styles.text4}>Describe the image you want (optional)</p>
                            <input
                                type = "text"
                                name = "image_details"
                                placeholder = "Describe with proper details"
                                value = {imageText}
                                onChange = {(e) => setimageText(e.target.value)}
                            />    
                            <p className={styles.text4}>Any color choices (optional)</p>
                            <input
                                type = "text"
                                name = "brand_color"
                                placeholder = "Purple, Blue, White, Golden, Silver"
                                value = {colorText}
                                onChange = {(e) => setcolorText(e.target.value)}
                            />
                            <input type="submit" value="Generate" />
                        </form>
                    </div>
                    <div className={styles.flexImageChild}>
                        <p className={styles.text3}>Generated Data:</p>
                        <p className={styles.text4}>Create Cool Campaigns 🔥, Chill 😎, and Celebrate 🥳</p>
                        <div>
                            <Carousel1 images={imageResult} captionArray={captionResult} hashtagArray={hashtagResult}/>
                        </div>
                    </div>
                </div>
                {/* 
                <div className={styles.result}>
                    {result}
                </div> */}

                <footer className={styles.footer}>
                    Made with 💜 by <b>Team Asteroids</b>
                </footer>
            </main>
        </div>
    );
}
