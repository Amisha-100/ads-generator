import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
    const [captionInput, setCaptionInput] = useState("");
    const [imageTextInput, setImageTextInput] = useState("");
    const [result, setTextResult] = useState();
    const [imgResult, setImageResult] = useState();

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
        const response = await fetch("/api/imageGenerate", {
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

        setImageResult(data.result);
        setImageTextInput("");
        } catch(error) {
        console.error(error);
        alert(error.message);
        }
    }

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
                    name="ads"
                    placeholder="Caption for Music"
                    value={captionInput}
                    onChange={(e) => setCaptionInput(e.target.value)}
                />
                <input type="submit" value="Generate Caption" />
            </form>
            <div className={styles.result}>{result}</div>
            
            <br />
            <br />

            {/* <h4>Describe your Image</h4>
            <form onSubmit={onImageTextSubmit}>
                <input
                    type="text"
                    name="ads"
                    placeholder="A blue sky with an aeroplane"
                    value={captionInput}
                    onChange={(e) => setImageTextInput(e.target.value)}
                />
                <input type="submit" value="Generate Image" />
            </form> */}
        </main>
        </div>
    );
}
