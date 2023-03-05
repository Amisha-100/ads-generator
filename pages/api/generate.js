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
            message: "Please enter a valid domain",
        }
        });
        return;
    }

    try {
        const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(input),
        temperature: 0.8,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    } catch(error) {
        if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
        } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
            error: {
            message: 'An error occurred during your request.',
            }
        });
        }
    }
}

function generatePrompt(input) {
    const capitalizedinput =
    input[0].toUpperCase() + input.slice(1).toLowerCase();
    return `Suggest three captions.
    Input: Chocolate
    Captions: Taste that melts your heart, A chocolate company, Awesome chocolates
    Input: Speaker
    Captions: Groove in music, Just dance out, Forget the world!
    Input: ${capitalizedinput}
    Captions:`;
}
