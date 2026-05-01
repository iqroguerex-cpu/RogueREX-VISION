# 👁️ RogueREX VISION.

> **Unleash your imagination.** A premium, high-performance AI image generation studio powered by Stable Diffusion XL and the Hugging Face Inference API.

![Project Banner](https://img.shields.io/badge/RogueREX-VISION-indigo?style=for-the-badge) ![Status](https://img.shields.io/badge/Status-Operational-success?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg?style=for-the-badge&logo=appveyor)](https://roguerex-vision.onrender.com/)

## 📖 Overview

**RogueREX VISION** is a modern web application that allows users to generate high-quality, 8K resolution images from text descriptions. Built with a focus on UI/UX, it features a sleek "Zinc" dark mode, local history management, and advanced generation controls, mimicking professional tools like Adobe Photoshop or Midjourney.

## ✨ Key Features

* **🚀 Powered by SDXL 1.0:** Utilizes Stability AI's latest model for photorealistic results.
* **🎨 Premium Dark UI:** A professional, distraction-free interface inspired by Vercel and Linear.
* **💾 Local Gallery & History:** Automatically saves your creations to your browser. You can view, reload, or delete past generations.
* **🎛️ Advanced Controls:**
    * **Negative Prompts:** Remove unwanted elements (e.g., "blurry", "deformed").
    * **Guidance Scale:** Control how closely the AI adheres to your text.
* **🎲 Surprise Me:** One-click random prompt generation for instant inspiration.
* **⚡ Real-time Feedback:** Custom toast notifications and loading states.
* **📥 Instant Download:** Save your masterpieces in high resolution.

## 🛠️ Tech Stack

* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Templating:** [EJS](https://ejs.co/)
* **AI Engine:** [Hugging Face Inference SDK](https://huggingface.co/docs/huggingface.js/inference/README)
* **Styling:** CSS3 (Variables, Flexbox, Glassmorphism)

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* A **Hugging Face Access Token** (Read permissions + Inference API enabled). [Get one here](https://huggingface.co/settings/tokens).

### Installation

1.  **Clone the repository** (or download source):
    ```bash
    git clone [https://github.com/your-username/roguerex-vision.git](https://github.com/your-username/roguerex-vision.git)
    cd roguerex-vision
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a file named `.env` in the root directory and add your credentials:
    ```env
    PORT=3000
    HF_TOKEN=hf_YourHuggingFaceTokenHere
    ```

4.  **Start the Server**:
    ```bash
    node server.js
    ```

5.  **Launch**:
    Open your browser and navigate to: `http://localhost:3000`

---

## 📂 Project Structure

```text
roguerex-vision/
├── node_modules/       # Dependencies
├── public/             # Static assets
│   ├── style.css       # Premium Dark Theme styles
│   └── script.js       # Client-side logic (History, API calls)
├── views/              # EJS Templates
│   └── index.ejs       # Main application interface
├── .env                # API Keys (Git ignored)
├── server.js           # Express Backend & API Proxy
└── README.md           # Documentation
