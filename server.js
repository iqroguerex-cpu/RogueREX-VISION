require('dotenv').config();
const express = require('express');
const path = require('path');
const { InferenceClient } = require("@huggingface/inference");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Client with Token
const client = new InferenceClient(process.env.HF_TOKEN);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/generate', async (req, res) => {
    const { prompt, negative_prompt, guidance_scale } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const imageBlob = await client.textToImage({
            model: "stabilityai/stable-diffusion-xl-base-1.0",
            inputs: prompt,
            parameters: { 
                negative_prompt: negative_prompt || "blurry, low quality, bad anatomy, disfigured, watermark",
                num_inference_steps: 25, 
                guidance_scale: parseFloat(guidance_scale) || 7.5,
            },
            provider: "hf-inference",
        });

        const arrayBuffer = await imageBlob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString('base64');
        const mimeType = imageBlob.type || 'image/jpeg';

        res.json({ success: true, image: `data:${mimeType};base64,${base64Image}` });

    } catch (error) {
        console.error("Generation Error:", error);
        res.status(500).json({ success: false, error: error.message || 'Failed to generate image.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});