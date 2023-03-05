import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
    const [captionInput, setCaptionInput] = useState("");
    const [imageTextInput, setImageTextInput] = useState("");
    const [result, setTextResult] = useState();
    const [imageResult, setImageResult] = useState();

    async function onSubmit(event) {
        event.preventDefault();
        try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ input: captionInput }),
        });

        const data = await response.json();
        if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
        }

        setTextResult(data.result);
        setCaptionInput("");
        } catch(error) {
        console.error(error);
        alert(error.message);
        }
    }

    async function onImageTextSubmit(event) {
        event.preventDefault();
        try {
        const response = await fetch("/api/generateImage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input: imageTextInput }),
        });

        const data = await response.json();
        if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
        }

        setImageResult(data.data);
        setImageTextInput("");
        } catch(error) {
        console.error(error);
        alert(error.message);
        }
    }
    
    console.log(imageResult)

    return (
        <div>
        <Head>
            <title>OpenAI Ads Generator</title>
            <link rel="icon" href="/adon.png" />
        </Head>

        <main className={styles.main}>
            <img src="/adon.png" className={styles.icon} />
            
            <h4>Caption for your Ad</h4>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="caption"
                    placeholder="Caption for Music"
                    value={captionInput}
                    onChange={(e) => setCaptionInput(e.target.value)}
                />
                <input type="submit" value="Generate Caption" />
            </form>
            <br/>
            <div className={styles.result}>{result}</div>
            
            <br/>
            <br/>

            <h4>Describe your Image</h4>
            <form onSubmit={onImageTextSubmit}>
                <input
                    type="text"
                    name="image_text"
                    placeholder="A blue sky with an aeroplane"
                    value={imageTextInput}
                    onChange={(e) => setImageTextInput(e.target.value)}
                />
                <input type="submit" value="Generate Image" />
            </form>
            <br/>
            <div className={styles.imageResult}><img src={imageResult} /></div>

        </main>
        </div>
    );
}
