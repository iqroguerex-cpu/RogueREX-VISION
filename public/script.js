document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const generateBtn = document.getElementById('generateBtn');
    const promptInput = document.getElementById('promptInput');
    const negativeInput = document.getElementById('negativePrompt');
    const guidanceInput = document.getElementById('guidanceScale');
    const guidanceValue = document.getElementById('guidanceValue');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const advancedToggle = document.getElementById('advancedToggle');
    const advancedOptions = document.getElementById('advancedOptions');
    
    const resultImage = document.getElementById('resultImage');
    const placeholder = document.querySelector('.empty-state');
    const downloadLink = document.getElementById('downloadLink');
    const imageActions = document.getElementById('imageActions');
    const clearMainBtn = document.getElementById('clearMainBtn');
    const historyGrid = document.getElementById('historyGrid');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.getElementById('btnLoader');

    const prompts = [
        "A hyper-realistic close-up portrait of a snowy owl in a winter forest, golden hour lighting, 8k resolution.",
        "A cyberpunk samurai standing in a neon-lit alleyway, rain, glowing katana, futuristic armor.",
        "A floating island with waterfalls cascading into the void, purple sky with two moons, fantasy art.",
        "A vintage 1950s coffee shop in the rain, neon sign reflection, noir atmosphere.",
        "A cute robot holding a flower, Pixar 3D render style, soft lighting, pastel colors.",
        "Macro photography of a mechanical eye with clockwork gears inside, blue iris, metallic textures.",
        "A majestic lion made entirely of smoke and fire, dark background, dramatic contrast.",
        "A futuristic eco-city with vertical gardens, cinematic wide shot, photorealistic.",
        "Abstract fluid art with gold and turquoise swirls, marble texture, shiny metallic finish."
    ];

    // Load History
    let history = JSON.parse(localStorage.getItem('dreamHistory')) || [];
    renderHistory();

    // Toggle Advanced Options
    advancedToggle.addEventListener('click', () => {
        advancedToggle.classList.toggle('active');
        advancedOptions.classList.toggle('open');
    });

    // Update Slider Value
    guidanceInput.addEventListener('input', (e) => {
        guidanceValue.textContent = e.target.value;
    });

    // Surprise Me
    surpriseBtn.addEventListener('click', () => {
        const random = prompts[Math.floor(Math.random() * prompts.length)];
        promptInput.value = random;
        showToast('Prompt applied!', 'success');
    });

    // Clear Stage
    clearMainBtn.addEventListener('click', () => {
        resetStage();
        showToast('Stage cleared', 'success');
    });

    // Generate Button Click
    generateBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        if (!prompt) return showToast('Please enter a prompt!', 'error');

        setLoading(true);

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    negative_prompt: negativeInput.value,
                    guidance_scale: guidanceInput.value
                })
            });

            const data = await response.json();

            if (data.success) {
                displayImage(data.image);
                addToHistory(data.image, prompt);
                showToast('Image generated successfully!', 'success');
            } else {
                showToast(`Error: ${data.error}`, 'error');
            }

        } catch (error) {
            console.error(error);
            showToast('Failed to connect to server.', 'error');
        } finally {
            setLoading(false);
        }
    });

    // --- Core Functions ---

    function displayImage(base64) {
        // 1. Reset
        resultImage.classList.remove('visible');
        placeholder.style.display = 'none';

        // 2. Setup Listener (Important: Before setting src)
        resultImage.onload = () => {
            resultImage.classList.add('visible');
            imageActions.classList.remove('hidden');
            downloadLink.href = base64;
        };

        resultImage.onerror = () => {
            console.error("Image load failed");
            placeholder.style.display = 'block';
            showToast("Failed to render image", 'error');
        };

        // 3. Set Source
        resultImage.src = base64;
    }

    function resetStage() {
        resultImage.src = "";
        resultImage.classList.remove('visible');
        placeholder.style.display = 'block';
        imageActions.classList.add('hidden');
    }

    function setLoading(isLoading) {
        generateBtn.disabled = isLoading;
        if (isLoading) {
            btnText.textContent = "Creating...";
            btnLoader.style.display = 'block';
        } else {
            btnText.textContent = "Generate Image";
            btnLoader.style.display = 'none';
        }
    }

    function addToHistory(image, prompt) {
        const id = Date.now();
        history.unshift({ id, image, prompt });
        if (history.length > 20) history.pop(); // limit to 20 items
        
        localStorage.setItem('dreamHistory', JSON.stringify(history));
        renderHistory();
    }

    function deleteHistoryItem(id, event) {
        event.stopPropagation(); // Stop click from bubbling up to the "load image" event
        history = history.filter(item => item.id !== id);
        localStorage.setItem('dreamHistory', JSON.stringify(history));
        renderHistory();
        showToast('Deleted from history', 'success');
    }

    function renderHistory() {
        historyGrid.innerHTML = '';

        if (history.length === 0) {
            historyGrid.innerHTML = '<div style="color:var(--text-muted); font-size:0.8rem; padding: 10px;">No history yet.</div>';
            return;
        }

        history.forEach(item => {
            // Container
            const container = document.createElement('div');
            container.className = 'history-item';
            container.title = item.prompt;
            
            // Load on click
            container.addEventListener('click', () => {
                promptInput.value = item.prompt;
                displayImage(item.image);
            });

            // Image
            const img = document.createElement('img');
            img.src = item.image;
            
            // Delete Button
            const delBtn = document.createElement('button');
            delBtn.className = 'hist-delete-btn';
            delBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            delBtn.title = "Delete";
            delBtn.addEventListener('click', (e) => deleteHistoryItem(item.id, e));

            container.appendChild(img);
            container.appendChild(delBtn);
            historyGrid.appendChild(container);
        });
    }

    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        const color = type === 'success' ? '#4ade80' : '#f87171'; // Green or Red
        const icon = type === 'success' ? 'check-circle' : 'circle-exclamation';

        toast.innerHTML = `<i class="fa-solid fa-${icon}" style="color:${color}"></i> <span>${message}</span>`;
        
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});