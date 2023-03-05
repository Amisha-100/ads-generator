import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
        error: {
            message: "OpenAI API key not configured, please follow instructions in README.md",
        }
        });
        return;
    }

    const input = req.body.input || '';
    if (input.trim().length === 0) {
        res.status(400).json({
        error: {
            message: "Please enter a valid input",
        }
        });
        return;
    }

    try {
        const response = await openai.createImage({
            prompt: generateImagePrompt(input),
            n: 1,
            size: "512x512",
        });
    
        const imageUrl = response.data.data[0].url;
    
        res.status(200).json({
            success: true,
            data: imageUrl,
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    
        res.status(400).json({
            success: false,
            error: 'The image could not be generated',
        });
    }
}

function generateImagePrompt(input) {
    const capitalizedinput =
    input[0].toUpperCase() + input.slice(1).toLowerCase();
    return `Suggest three captions.

Input: ${capitalizedinput}
Captions:`;
}
