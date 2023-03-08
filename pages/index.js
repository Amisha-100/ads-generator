import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
    const [inputText, setInputText] = useState("");
    const [result, setTextResult] = useState();
    const [imageResult, setImageResult] = useState();

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const response1 = await fetch(
                "/api/generate", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ input: inputText })
                }
            );

            const response2 = await fetch(
                "/api/generateImage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ input: inputText })
                }
            );

            const data1 = await response1.json();
            const data2 = await response2.json();

            if (response1.status !== 200) {
                throw data1.error || new Error(`Request failed with status ${response1.status}`);
            }
            if (response2.status !== 200) {
                throw data2.error || new Error(`Request failed with status ${response2.status}`);
            }

            setTextResult(data1.result);
            setImageResult(data2.data);
        } catch(error) {
            console.error(error);
            alert(error.message);
        }
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

                <h4>Mention campaign details</h4>
                <form onSubmit={onSubmit}>
                    <input
                        type = "text"
                        name = "input_text"
                        placeholder = "Purple donuts with chocolates around"
                        value = {inputText}
                        onChange = {(e) => setInputText(e.target.value)}
                    />
                    <input type="submit" value="Generate" />
                </form>
                <br/>
                <div className={styles.imageResult}>
                    <img src={imageResult} />
                </div>
                <br/>
                <div className={styles.result}>
                    {result}
                </div>

                <footer className={styles.footer}>
                    Made with 💜 by <b>Team Asteroids</b>
                </footer>
            </main>
        </div>
    );
}
