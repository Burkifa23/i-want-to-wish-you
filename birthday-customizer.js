class BirthdayCustomizer {
    constructor() {
        this.themes = {
            original: {
                background: "linear-gradient(#a2d2ff, #EFB0C9)",
                accentColor: "#EFB0C9",
                borderColor: "#EFB0C9",
                textColor: "#ffffff",
            },
            sunset: {
                background: "linear-gradient(#ff9a9e, #fecfef)",
                accentColor: "#ff9a9e",
                borderColor: "#ff9a9e",
                textColor: "#ffffff",
            },
            ocean: {
                background: "linear-gradient(#4facfe, #00f2fe)",
                accentColor: "#4facfe",
                borderColor: "#4facfe",
                textColor: "#ffffff",
            },
            forest: {
                background: "linear-gradient(#56ab2f, #a8e6cf)",
                accentColor: "#56ab2f",
                borderColor: "#56ab2f",
                textColor: "#ffffff",
            },
            lavender: {
                background: "linear-gradient(#667eea, #764ba2)",
                accentColor: "#667eea",
                borderColor: "#667eea",
                textColor: "#ffffff",
            },
            coral: {
                background: "linear-gradient(#ff8a80, #ffcc80)",
                accentColor: "#ff8a80",
                borderColor: "#ff8a80",
                textColor: "#ffffff",
            },
            black: {
                background: "linear-gradient(#2c3e50, #34495e)",
                accentColor: "#34495e",
                borderColor: "#e74c3c",
                textColor: "#ffffff",
            },
            white: {
                background: "linear-gradient(#f8f9fa, #e9ecef)",
                accentColor: "#6c757d",
                borderColor: "#e74c3c",
                textColor: "#212529",
            },
            bw: {
                background: "linear-gradient(to bottom, #000000, #111111)",
                accentColor: "#ffffff",
                borderColor: "#333333",
                textColor: "#ffffff",
            },
            liquidglass: {
                background:
                    "radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.1) 100%), linear-gradient(135deg, rgba(147, 112, 219, 0.6) 0%, rgba(138, 43, 226, 0.5) 25%, rgba(72, 61, 139, 0.4) 50%, rgba(25, 25, 112, 0.6) 75%, rgba(0, 0, 139, 0.7) 100%)",
                accentColor: "rgba(255, 255, 255, 0.25)",
                borderColor: "rgba(255, 255, 255, 0.4)",
                textColor: "#ffffff",
                special: "liquidglass",
            },
            custom: {
                background: "",
                accentColor: "",
                borderColor: "",
                textColor: "#ffffff",
            },
        };

        this.defaultConfig = {
            name: "name",
            age: 22,
            date: "date.month.year",
            imageUrl: "images/...",
            creator: "Frank",
            theme: "bw",
            music: {
                enabled: true,
                volume: 0.5,
                autoplay: true,
                selectedTrack: "default",
                customUrl: "",
            },
            customColors: {
                primary: "#EFB0C9",
                secondary: "#a2d2ff",
                accent: "#EFB0C9",
                border: "#EFB0C9",
            },
            gifts: {
                gift1: {
                    title: "Here's how happy I am for you today 🥳",
                    imageUrl: "images/happy.gif",
                },
                gift2: {
                    title: "How people react when you enter the room 😍",
                    imageUrl: "images/hot.gif",
                },
                gift3: {
                    title: "If I had to describe you with ONE word 👇",
                    imageUrl: "images/genius.gif",
                },
                gift4: {
                    title: "The only person as badass as you 💪",
                    imageUrl: "images/badass.gif",
                },
                gift5: {
                    title: "This one's for you, my friend 🥂",
                    imageUrl: "images/cheers.gif",
                },
            },
        };

        this.config = { ...this.defaultConfig };
        this.audioPlayer = null;
        this.musicTracks = {
            default: "music/happy.MP3",
            party: "music/party-time.mp3",
            celebration: "music/celebration.mp3",
            ambient: "music/ambient-birthday.mp3",
        };
        this.init();
    }

    init() {
        // Wait for DOM to load
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () =>
                this.setupCustomizer()
            );
        } else {
            this.setupCustomizer();
        }
    }

    setupCustomizer() {
        this.createCustomizerPanel();
        this.attachEventListeners();
        this.loadFromLocalStorage();
    }

    createCustomizerPanel() {
        const panel = document.createElement("div");
        panel.id = "customizer-panel";
        panel.innerHTML = `
            <div id="customizer-toggle">⚙️ Customize</div>
            <div id="customizer-content" style="display: none;">
                <h3>🎉 Customize Birthday Website</h3>
                
                <div class="customizer-section">
                    <label for="cust-name">Birthday Person's Name:</label>
                    <input type="text" id="cust-name" value="${this.config.name
            }">
                </div>
                
                <div class="customizer-row">
                    <div class="customizer-section">
                        <label for="cust-age">Age:</label>
                        <input type="number" id="cust-age" value="${this.config.age
            }" min="1" max="150">
                    </div>
                    <div class="customizer-section">
                        <label for="cust-date">Date:</label>
                        <input type="text" id="cust-date" value="${this.config.date
            }" placeholder="DD.MM.YYYY">
                    </div>
                </div>
                
                <div class="customizer-section">
                    <label for="cust-image">Photo URL:</label>
                    <input type="url" id="cust-image" value="${this.config.imageUrl
            }" placeholder="https://example.com/photo.jpg">
                </div>
                
                <div class="customizer-section">
                    <label for="cust-creator">Your Name (Creator):</label>
                    <input type="text" id="cust-creator" value="${this.config.creator
            }">
                </div>
                
                <div class="customizer-section">
                    <label for="cust-theme">Theme:</label>
                    <select id="cust-theme">
                        ${Object.keys(this.themes)
                .map(
                    (theme) =>
                        `<option value="${theme}" ${theme === this.config.theme ? "selected" : ""
                        }>${this.formatThemeName(theme)}</option>`
                )
                .join("")}
                    </select>
                </div>
                
                <div id="custom-color-section" style="display: ${this.config.theme === "custom" ? "block" : "none"
            };">
                    <h4>🎨 Custom Colors:</h4>
                    <div class="color-picker-grid">
                        <div class="color-picker-item">
                            <label for="cust-color-primary">Primary Color:</label>
                            <input type="color" id="cust-color-primary" value="${this.config.customColors.primary
            }">
                        </div>
                        <div class="color-picker-item">
                            <label for="cust-color-secondary">Secondary Color:</label>
                            <input type="color" id="cust-color-secondary" value="${this.config.customColors.secondary
            }">
                        </div>
                        <div class="color-picker-item">
                            <label for="cust-color-accent">Accent Color:</label>
                            <input type="color" id="cust-color-accent" value="${this.config.customColors.accent
            }">
                        </div>
                        <div class="color-picker-item">
                            <label for="cust-color-border">Border Color:</label>
                            <input type="color" id="cust-color-border" value="${this.config.customColors.border
            }">
                        </div>
                    </div>
                    <div class="custom-color-tips">
                        💡 <strong>Tips:</strong> Primary & Secondary create the background gradient. Accent colors the age/date badges. Border colors the profile image.
                    </div>
                </div>
                
                <h4>🎵 Birthday Music:</h4>
                <div class="music-section">
                    <div class="music-toggle">
                        <label>
                            <input type="checkbox" id="music-enabled" ${this.config.music.enabled ? "checked" : ""
            }>
                            Enable Background Music
                        </label>
                    </div>
                    
                    <div id="music-controls" style="display: ${this.config.music.enabled ? "block" : "none"
            };">
                        <div class="customizer-section">
                            <label for="music-track">Music Track:</label>
                            <select id="music-track">
                                <option value="default" ${this.config.music.selectedTrack === "default"
                ? "selected"
                : ""
            }>Happy Birthday Classic</option>
                                <option value="party" ${this.config.music.selectedTrack === "party"
                ? "selected"
                : ""
            }>Party Time</option>
                                <option value="celebration" ${this.config.music.selectedTrack ===
                "celebration"
                ? "selected"
                : ""
            }>Celebration</option>
                                <option value="ambient" ${this.config.music.selectedTrack === "ambient"
                ? "selected"
                : ""
            }>Ambient Birthday</option>
                                <option value="custom" ${this.config.music.selectedTrack === "custom"
                ? "selected"
                : ""
            }>Custom URL</option>
                            </select>
                        </div>
                        
                        <div id="custom-music-url" style="display: ${this.config.music.selectedTrack === "custom"
                ? "block"
                : "none"
            };">
                            <div class="customizer-section">
                                <label for="music-url">Custom Music URL:</label>
                                <input type="url" id="music-url" value="${this.config.music.customUrl
            }" placeholder="https://example.com/music.mp3">
                            </div>
                        </div>
                        
                        <div class="customizer-section">
                            <label for="music-volume">Volume: <span id="volume-display">${Math.round(
                this.config.music.volume * 100
            )}%</span></label>
                            <input type="range" id="music-volume" min="0" max="1" step="0.1" value="${this.config.music.volume
            }">
                        </div>
                        
                        <div class="music-toggle">
                            <label>
                                <input type="checkbox" id="music-autoplay" ${this.config.music.autoplay ? "checked" : ""
            }>
                                Auto-play when page loads
                            </label>
                        </div>
                        
                        <div class="music-controls-buttons">
                            <button id="test-music" type="button">🎵 Test Music</button>
                            <button id="stop-music" type="button">⏹️ Stop</button>
                        </div>
                    </div>
                </div>
                
                <h4>Gift Messages & Images:</h4>
                ${Object.keys(this.config.gifts)
                .map(
                    (giftKey, index) => `
                    <div class="gift-customizer">
                        <h5>Gift ${index + 1}:</h5>
                        <input type="text" id="cust-${giftKey}-title" value="${this.config.gifts[giftKey].title
                        }" placeholder="Gift title">
                        <input type="url" id="cust-${giftKey}-image" value="${this.config.gifts[giftKey].imageUrl
                        }" placeholder="Image URL">
                    </div>
                `
                )
                .join("")}
                
                <div class="customizer-buttons">
                    <button id="apply-changes">Apply Changes</button>
                    <button id="reset-default">Reset to Default</button>
                    <button id="export-config">Export Config</button>
                </div>
            </div>
        `;

        // Add CSS for the customizer panel
        const style = document.createElement("style");
        style.textContent = `
            #customizer-panel {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.95);
                border-radius: 10px;
                padding: 15px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                max-width: 350px;
                color: #333;
                font-family: 'Happy Monkey', cursive;
                max-height: 80vh;
                overflow-y: auto;
            }
            
            #customizer-toggle {
                background: #EFB0C9;
                color: white;
                padding: 8px 15px;
                border-radius: 20px;
                cursor: pointer;
                text-align: center;
                margin-bottom: 10px;
                font-weight: bold;
            }
            
            #customizer-toggle:hover {
                background: #d49bb8;
            }
            
            .customizer-section {
                margin-bottom: 15px;
            }
            
            .customizer-row {
                display: flex;
                gap: 10px;
            }
            
            .customizer-row .customizer-section {
                flex: 1;
            }
            
            .customizer-section label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
                font-size: 12px;
            }
            
            .customizer-section input, .customizer-section select {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 12px;
            }
            
            .gift-customizer {
                background: #f5f5f5;
                padding: 10px;
                border-radius: 5px;
                margin-bottom: 10px;
            }
            
            .gift-customizer h5 {
                margin: 0 0 8px 0;
                color: #EFB0C9;
            }
            
            .gift-customizer input {
                margin-bottom: 5px;
            }
            
            .customizer-buttons {
                display: flex;
                gap: 5px;
                flex-wrap: wrap;
            }
            
            .customizer-buttons button {
                flex: 1;
                padding: 8px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-family: inherit;
                font-size: 11px;
                min-width: 80px;
            }
            
            .color-picker-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                margin-bottom: 10px;
            }
            
            .color-picker-item {
                display: flex;
                flex-direction: column;
            }
            
            .color-picker-item label {
                font-size: 11px;
                margin-bottom: 3px;
            }
            
            .color-picker-item input[type="color"] {
                width: 100%;
                height: 35px;
                border: 1px solid #ddd;
                border-radius: 5px;
                cursor: pointer;
                padding: 2px;
            }
            
            .custom-color-tips {
                background: #e8f4f8;
                padding: 8px;
                border-radius: 5px;
                font-size: 11px;
                color: #2c3e50;
                border-left: 3px solid #3498db;
            }
            
            #custom-color-section {
                background: #f0f8ff;
                padding: 10px;
                border-radius: 8px;
                margin-bottom: 15px;
                border: 1px solid #ddd;
            }
            
            #custom-color-section h4 {
                margin: 0 0 10px 0;
                color: #3498db;
            }
            
            .music-section {
                background: #fff7e6;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 15px;
                border: 1px solid #ffd700;
            }
            
            .music-toggle {
                margin-bottom: 10px;
            }
            
            .music-toggle label {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 12px;
                cursor: pointer;
            }
            
            .music-toggle input[type="checkbox"] {
                width: auto;
                margin: 0;
            }
            
            .music-controls-buttons {
                display: flex;
                gap: 8px;
                margin-top: 10px;
            }
            
            .music-controls-buttons button {
                flex: 1;
                padding: 8px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-family: inherit;
                font-size: 11px;
                background: #ffd700;
                color: #333;
            }
            
            .music-controls-buttons button:hover {
                background: #ffed4e;
            }
            
            #volume-display {
                font-weight: bold;
                color: #ff6b6b;
            }
            
            input[type="range"] {
                width: 100%;
                margin: 5px 0;
            }
            
            #apply-changes {
                background: #4CAF50;
                color: white;
            }
            
            #reset-default {
                background: #ff9800;
                color: white;
            }
            
            #export-config {
                background: #2196F3;
                color: white;
            }
            
            h3, h4 {
                margin: 0 0 15px 0;
                color: #EFB0C9;
            }
            
            @media (max-width: 768px) {
                #customizer-panel {
                    position: relative;
                    top: 0;
                    right: 0;
                    margin: 20px;
                    max-width: none;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(panel);
    }

    attachEventListeners() {
        // Toggle panel
        document
            .getElementById("customizer-toggle")
            .addEventListener("click", () => {
                const content = document.getElementById("customizer-content");
                content.style.display =
                    content.style.display === "none" ? "block" : "none";
            });

        // Apply changes
        document.getElementById("apply-changes").addEventListener("click", () => {
            this.applyChanges();
        });

        // Reset to default
        document.getElementById("reset-default").addEventListener("click", () => {
            this.resetToDefault();
        });

        // Export config
        document.getElementById("export-config").addEventListener("click", () => {
            this.exportConfig();
        });

        // Real-time theme preview
        document.getElementById("cust-theme").addEventListener("change", (e) => {
            const selectedTheme = e.target.value;
            this.toggleCustomColorSection(selectedTheme);
            this.previewTheme(selectedTheme);
        });

        // Custom color live preview
        const colorInputs = ["primary", "secondary", "accent", "border"];
        colorInputs.forEach((colorType) => {
            document
                .getElementById(`cust-color-${colorType}`)
                .addEventListener("input", (e) => {
                    if (document.getElementById("cust-theme").value === "custom") {
                        this.updateCustomColors();
                        this.previewCustomTheme();
                    }
                });
        });

        // Music controls
        document.getElementById("music-enabled").addEventListener("change", (e) => {
            this.toggleMusicControls(e.target.checked);
        });

        document.getElementById("music-track").addEventListener("change", (e) => {
            this.toggleCustomMusicUrl(e.target.value);
        });

        document.getElementById("music-volume").addEventListener("input", (e) => {
            document.getElementById("volume-display").textContent =
                Math.round(e.target.value * 100) + "%";
            if (this.audioPlayer) {
                this.audioPlayer.volume = e.target.value;
            }
        });

        document.getElementById("test-music").addEventListener("click", () => {
            this.testMusic();
        });

        document.getElementById("stop-music").addEventListener("click", () => {
            this.stopMusic();
        });

        // Add music play button listener
        const musicBtn = document.getElementById("play-music-btn");
        if (musicBtn) {
            musicBtn.addEventListener("click", () => {
                this.playBirthdayMusic();
                this.showMessage("Playing birthday music! 🎵");
            });
        }

        // Implement lazy loading for gift images
        this.setupLazyLoading();
    }

    setupLazyLoading() {
        // Create IntersectionObserver for lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const giftBox = entry.target;
                    const giftKey = giftBox.dataset.giftKey;
                    
                    if (giftKey && this.config.gifts[giftKey]) {
                        // Preload the GIF when the gift box comes into view
                        const preloadImg = new Image();
                        preloadImg.src = this.config.gifts[giftKey].imageUrl;
                        
                        // Remove from observation once loaded
                        observer.unobserve(giftBox);
                    }
                }
            });
        }, {
            rootMargin: '0px 0px 200px 0px' // Start loading when within 200px
        });
        
        // Add data attributes to gift boxes and observe them
        const giftBoxes = document.querySelectorAll('.gift-img');
        const giftKeys = Object.keys(this.config.gifts);
        
        giftBoxes.forEach((box, index) => {
            if (giftKeys[index]) {
                box.dataset.giftKey = giftKeys[index];
                lazyLoadObserver.observe(box);
            }
        });
    }

    applyChanges() {
        // Collect form data
        this.config.name =
            document.getElementById("cust-name").value || "Someone Special";
        this.config.age = document.getElementById("cust-age").value || "??";
        this.config.date = document.getElementById("cust-date").value || "Today";
        this.config.imageUrl =
            document.getElementById("cust-image").value || "images/default.jpg";
        this.config.creator =
            document.getElementById("cust-creator").value || "A Friend";
        this.config.theme = document.getElementById("cust-theme").value;

        // Update custom colors if custom theme is selected
        if (this.config.theme === "custom") {
            this.updateCustomColors();
        }

        // Update music config
        this.config.music.enabled =
            document.getElementById("music-enabled").checked;
        this.config.music.selectedTrack =
            document.getElementById("music-track").value;
        this.config.music.customUrl = document.getElementById("music-url").value;
        this.config.music.volume = parseFloat(
            document.getElementById("music-volume").value
        );
        this.config.music.autoplay =
            document.getElementById("music-autoplay").checked;

        // Update gift configs
        Object.keys(this.config.gifts).forEach((giftKey) => {
            this.config.gifts[giftKey].title = document.getElementById(
                `cust-${giftKey}-title`
            ).value;
            this.config.gifts[giftKey].imageUrl = document.getElementById(
                `cust-${giftKey}-image`
            ).value;
        });

        // Apply changes to the website
        this.updateWebsite();
        this.saveToLocalStorage();

        // Handle music
        if (this.config.music.enabled && this.config.music.autoplay) {
            this.playBirthdayMusic();
        } else {
            this.stopMusic();
        }

        // Show success message
        this.showMessage("Changes applied successfully! 🎉");
    }

    updateWebsite() {
        // Update main title
        const mainTitle = document.querySelector("#header h1");
        if (mainTitle) {
            mainTitle.textContent = `Today is ${this.config.name}'s birthday 🎉`;
        }

        // Update image
        const img = document.getElementById("bff-img");
        if (img) {
            img.src = this.config.imageUrl;
            img.alt = this.config.name;
        }

        // Update age
        const age = document.getElementById("bday-age");
        if (age) {
            age.textContent = `${this.config.age} years old`;
        }

        // Update date
        const date = document.getElementById("bday-date");
        if (date) {
            date.textContent = this.config.date;
        }

        // Update creator
        const footer = document.querySelector("footer p");
        if (footer) {
            footer.textContent = `Made With 💌 by ${this.config.creator}.`;
        }

        // Update page title
        document.title = `${this.config.name}'s Birthday Celebration`;

        // Apply theme
        this.applyTheme(this.config.theme);

        // Update gifts
        this.updateGifts();

        // Add tap functionality for gift images
        this.setupGiftInteractions();
    }

    updateGifts() {
        const giftSections = document.querySelectorAll(".gift-section");
        const giftKeys = Object.keys(this.config.gifts);

        giftSections.forEach((section, index) => {
            if (giftKeys[index]) {
                const giftKey = giftKeys[index];
                const gift = this.config.gifts[giftKey];

                // Update title
                const title = section.querySelector(".gift-title");
                if (title) {
                    title.textContent = gift.title;
                }

                // Update hover image
                const giftImg = section.querySelector(".gift-img");
                if (giftImg) {
                    // Remove existing hover listeners
                    const newGiftImg = giftImg.cloneNode(true);
                    giftImg.parentNode.replaceChild(newGiftImg, giftImg);

                    // Add new hover effect
                    newGiftImg.addEventListener("mouseenter", () => {
                        newGiftImg.style.backgroundImage = `url("${gift.imageUrl}")`;
                    });

                    newGiftImg.addEventListener("mouseleave", () => {
                        newGiftImg.style.backgroundImage = 'url("images/gift-cover.jpg")';
                    });
                }
            }
        });
    }

    setupGiftInteractions() {
        const giftSections = document.querySelectorAll(".gift-section");
        const giftKeys = Object.keys(this.config.gifts);
        
        giftSections.forEach((section, index) => {
            if (giftKeys[index]) {
                const giftKey = giftKeys[index];
                const gift = this.config.gifts[giftKey];
                const giftImg = section.querySelector(".gift-img");
                
                if (giftImg) {
                    // Remove existing listeners
                    const newGiftImg = giftImg.cloneNode(true);
                    giftImg.parentNode.replaceChild(newGiftImg, giftImg);
                    
                    // Track if gift is revealed
                    let isRevealed = false;
                    
                    // Add hover effect for desktop
                    newGiftImg.addEventListener("mouseenter", () => {
                        newGiftImg.style.backgroundImage = `url("${gift.imageUrl}")`;
                        isRevealed = true;
                    });
                    
                    newGiftImg.addEventListener("mouseleave", () => {
                        newGiftImg.style.backgroundImage = 'url("images/gift-cover.jpg")';
                        isRevealed = false;
                    });
                    
                    // Add click/tap effect for mobile
                    newGiftImg.addEventListener("click", () => {
                        if (!isRevealed) {
                            newGiftImg.style.backgroundImage = `url("${gift.imageUrl}")`;
                            isRevealed = true;
                            
                            // Add "tap to close" text
                            newGiftImg.setAttribute("data-status", "open");
                            
                            // Auto-close after 3 seconds on mobile
                            if (window.innerWidth <= 768) {
                                setTimeout(() => {
                                    newGiftImg.style.backgroundImage = 'url("images/gift-cover.jpg")';
                                    isRevealed = false;
                                    newGiftImg.removeAttribute("data-status");
                                }, 3000);
                            }
                        } else {
                            // Close on second tap
                            newGiftImg.style.backgroundImage = 'url("images/gift-cover.jpg")';
                            isRevealed = false;
                            newGiftImg.removeAttribute("data-status");
                        }
                    });
                }
            }
        });
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        let currentTheme = theme;

        // Use custom colors if custom theme is selected
        if (themeName === "custom") {
            currentTheme = this.generateCustomTheme();
        }

        // Update body background
        document.body.style.background = currentTheme.background;

        // Apply liquid glass effects if it's the liquid glass theme
        if (themeName === "liquidglass") {
            this.applyLiquidGlassEffects();
        } else {
            this.removeLiquidGlassEffects();
        }

        // Update text color
        document.body.style.color = currentTheme.textColor;

        // Update all text elements for proper contrast
        const textElements = document.querySelectorAll(
            "h1, h2, h3, h4, p, .gift-title, .gift-hint"
        );
        textElements.forEach((element) => {
            element.style.color = currentTheme.textColor;
        });

        // Update accent elements
        const accentElements = ["#bday-age", "#bday-date", "#bff-img"];

        accentElements.forEach((selector) => {
            const element = document.querySelector(selector);
            if (element) {
                if (selector === "#bff-img") {
                    element.style.borderColor = currentTheme.borderColor;
                    if (themeName === "liquidglass") {
                        element.style.backdropFilter = "blur(10px) saturate(200%)";
                        element.style.border = "2px solid rgba(255, 255, 255, 0.3)";
                        element.style.boxShadow =
                            "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.2)";
                    }
                } else {
                    element.style.backgroundColor = currentTheme.accentColor;
                    if (themeName === "liquidglass") {
                        element.style.backdropFilter = "blur(20px) saturate(200%)";
                        element.style.background = "rgba(255, 255, 255, 0.15)";
                        element.style.border = "1px solid rgba(255, 255, 255, 0.2)";
                        element.style.boxShadow =
                            "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1)";
                    }
                    // For white theme, ensure text is readable on accent background
                    if (themeName === "white") {
                        element.style.color = "#ffffff";
                    }
                }
            }
        });

        // Update text shadows for different themes
        const shadowElements = document.querySelectorAll("h1, h2, h3, h4, p");
        shadowElements.forEach((element) => {
            if (themeName === "white") {
                element.style.textShadow = "0 0 1px rgba(0,0,0,0.3)";
            } else if (themeName === "black") {
                element.style.textShadow = "0 0 2px rgba(255,255,255,0.3)";
            } else if (themeName === "liquidglass") {
                element.style.textShadow =
                    "0 2px 10px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)";
            } else {
                element.style.textShadow = "0 0 1px black";
            }
        });

        // Update gift box borders for theme consistency
        const giftImages = document.querySelectorAll(".gift-img");
        giftImages.forEach((img) => {
            if (themeName === "liquidglass") {
                img.style.border = "2px solid rgba(255, 255, 255, 0.2)";
                img.style.backdropFilter = "blur(15px) saturate(150%)";
                img.style.background = "rgba(255, 255, 255, 0.1)";
                img.style.boxShadow =
                    "0 12px 40px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.15)";
            } else if (themeName === "black") {
                img.style.borderColor = "#ffffff";
                img.style.backdropFilter = "none";
                img.style.boxShadow = "none";
            } else if (themeName === "white") {
                img.style.borderColor = "#212529";
                img.style.backdropFilter = "none";
                img.style.boxShadow = "none";
            } else if (themeName === "custom") {
                img.style.borderColor = currentTheme.borderColor;
                img.style.backdropFilter = "none";
                img.style.boxShadow = "none";
            } else {
                img.style.borderColor = "white";
                img.style.backdropFilter = "none";
                img.style.boxShadow = "none";
            }
        });
    }

    previewTheme(themeName) {
        this.applyTheme(themeName);
    }

    resetToDefault() {
        this.config = { ...this.defaultConfig };
        this.updateCustomizerForm();
        this.updateWebsite();
        this.showMessage("Reset to default configuration! 🔄");
    }

    updateCustomizerForm() {
        document.getElementById("cust-name").value = this.config.name;
        document.getElementById("cust-age").value = this.config.age;
        document.getElementById("cust-date").value = this.config.date;
        document.getElementById("cust-image").value = this.config.imageUrl;
        document.getElementById("cust-creator").value = this.config.creator;
        document.getElementById("cust-theme").value = this.config.theme;

        // Update custom color inputs
        if (this.config.customColors) {
            document.getElementById("cust-color-primary").value =
                this.config.customColors.primary;
            document.getElementById("cust-color-secondary").value =
                this.config.customColors.secondary;
            document.getElementById("cust-color-accent").value =
                this.config.customColors.accent;
            document.getElementById("cust-color-border").value =
                this.config.customColors.border;
        }

        // Update music inputs
        if (this.config.music) {
            document.getElementById("music-enabled").checked =
                this.config.music.enabled;
            document.getElementById("music-track").value =
                this.config.music.selectedTrack;
            document.getElementById("music-url").value = this.config.music.customUrl;
            document.getElementById("music-volume").value = this.config.music.volume;
            document.getElementById("music-autoplay").checked =
                this.config.music.autoplay;
            document.getElementById("volume-display").textContent =
                Math.round(this.config.music.volume * 100) + "%";
            this.toggleMusicControls(this.config.music.enabled);
            this.toggleCustomMusicUrl(this.config.music.selectedTrack);
        }

        this.toggleCustomColorSection(this.config.theme);

        Object.keys(this.config.gifts).forEach((giftKey) => {
            document.getElementById(`cust-${giftKey}-title`).value =
                this.config.gifts[giftKey].title;
            document.getElementById(`cust-${giftKey}-image`).value =
                this.config.gifts[giftKey].imageUrl;
        });
    }

    toggleCustomColorSection(themeName) {
        const customColorSection = document.getElementById("custom-color-section");
        if (customColorSection) {
            customColorSection.style.display =
                themeName === "custom" ? "block" : "none";
        }
    }

    toggleMusicControls(enabled) {
        const musicControls = document.getElementById("music-controls");
        if (musicControls) {
            musicControls.style.display = enabled ? "block" : "none";
        }
    }

    toggleCustomMusicUrl(selectedTrack) {
        const customUrlSection = document.getElementById("custom-music-url");
        if (customUrlSection) {
            customUrlSection.style.display =
                selectedTrack === "custom" ? "block" : "none";
        }
    }

    playBirthdayMusic() {
        this.stopMusic(); // Stop any currently playing music

        let musicUrl;
        if (this.config.music.selectedTrack === "custom") {
            musicUrl = this.config.music.customUrl;
        } else {
            musicUrl = this.musicTracks[this.config.music.selectedTrack];
        }

        if (musicUrl) {
            this.audioPlayer = new Audio(musicUrl);
            this.audioPlayer.volume = this.config.music.volume;
            this.audioPlayer.loop = true;

            // Handle errors gracefully
            this.audioPlayer.addEventListener("error", (e) => {
                console.warn("Music failed to load:", musicUrl);
                this.showMessage(
                    "Music failed to load. Please check the URL or file path. 🎵"
                );
            });

            // Attempt to play
            this.audioPlayer.play().catch((e) => {
                console.warn("Music autoplay blocked by browser:", e);
                this.showMessage("Click anywhere to start music! 🎵");

                // Add click-to-play functionality
                const playOnClick = () => {
                    this.audioPlayer.play();
                    document.removeEventListener("click", playOnClick);
                };
                document.addEventListener("click", playOnClick);
            });
        }
    }

    testMusic() {
        this.updateMusicConfig();
        this.playBirthdayMusic();
        this.showMessage("Playing test music! 🎵");
    }

    stopMusic() {
        if (this.audioPlayer) {
            this.audioPlayer.pause();
            this.audioPlayer.currentTime = 0;
            this.audioPlayer = null;
        }
    }

    updateMusicConfig() {
        this.config.music.enabled =
            document.getElementById("music-enabled").checked;
        this.config.music.selectedTrack =
            document.getElementById("music-track").value;
        this.config.music.customUrl = document.getElementById("music-url").value;
        this.config.music.volume = parseFloat(
            document.getElementById("music-volume").value
        );
        this.config.music.autoplay =
            document.getElementById("music-autoplay").checked;
    }

    updateCustomColors() {
        this.config.customColors = {
            primary: document.getElementById("cust-color-primary").value,
            secondary: document.getElementById("cust-color-secondary").value,
            accent: document.getElementById("cust-color-accent").value,
            border: document.getElementById("cust-color-border").value,
        };
    }

    generateCustomTheme() {
        const colors = this.config.customColors;
        return {
            background: `linear-gradient(${colors.primary}, ${colors.secondary})`,
            accentColor: colors.accent,
            borderColor: colors.border,
            textColor: this.getOptimalTextColor(colors.primary),
        };
    }

    getOptimalTextColor(bgColor) {
        // Convert hex to RGB
        const hex = bgColor.replace("#", "");
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);

        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Return black for light backgrounds, white for dark backgrounds
        return luminance > 0.5 ? "#212529" : "#ffffff";
    }

    previewCustomTheme() {
        if (document.getElementById("cust-theme").value === "custom") {
            this.updateCustomColors();
            this.applyTheme("custom");
        }
    }

    exportConfig() {
        const configJSON = JSON.stringify(this.config, null, 2);
        const blob = new Blob([configJSON], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${this.config.name
            .toLowerCase()
            .replace(/\s+/g, "-")}-birthday-config.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showMessage("Configuration exported! 📁");
    }

    saveToLocalStorage() {
        localStorage.setItem("birthdayConfig", JSON.stringify(this.config));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem("birthdayConfig");
        if (saved) {
            try {
                this.config = { ...this.defaultConfig, ...JSON.parse(saved) };
                this.updateCustomizerForm();
                this.updateWebsite();
            } catch (e) {
                console.warn("Failed to load saved configuration");
            }
        }
    }

    formatThemeName(theme) {
        const names = {
            liquidglass: "Liquid Glass ✨",
            original: "Original",
            sunset: "Sunset",
            ocean: "Ocean",
            forest: "Forest",
            lavender: "Lavender",
            coral: "Coral",
            black: "Black",
            white: "White",
            bw: "Black & White",
            custom: "Custom",
        };
        return names[theme] || theme.charAt(0).toUpperCase() + theme.slice(1);
    }

    applyLiquidGlassEffects() {
        // Add dynamic liquid glass styles
        if (!document.getElementById("liquid-glass-styles")) {
            const liquidStyles = document.createElement("style");
            liquidStyles.id = "liquid-glass-styles";
            liquidStyles.textContent = `
                .gift-section {
                    background: rgba(255, 255, 255, 0.08) !important;
                    backdrop-filter: blur(25px) saturate(200%) !important;
                    border: 1px solid rgba(255, 255, 255, 0.15) !important;
                    border-radius: 25px !important;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1), 
                                inset 0 0 0 1px rgba(255, 255, 255, 0.1),
                                0 0 80px rgba(147, 112, 219, 0.1) !important;
                    position: relative !important;
                    overflow: hidden !important;
                }
                
                .gift-section::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
                    animation: liquidFloat 20s ease-in-out infinite;
                    pointer-events: none;
                }
                
                .gift-section::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%);
                    pointer-events: none;
                }
                
                @keyframes liquidFloat {
                    0%, 100% { transform: translate(-10%, -10%) rotate(0deg); }
                    25% { transform: translate(-15%, -5%) rotate(1deg); }
                    50% { transform: translate(-5%, -15%) rotate(-1deg); }
                    75% { transform: translate(-12%, -8%) rotate(0.5deg); }
                }
                
                #header {
                    background: rgba(255, 255, 255, 0.06) !important;
                    backdrop-filter: blur(30px) saturate(200%) !important;
                    border: 1px solid rgba(255, 255, 255, 0.15) !important;
                    border-radius: 30px !important;
                    padding: 30px !important;
                    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.15), 
                                inset 0 0 0 1px rgba(255, 255, 255, 0.1),
                                0 0 100px rgba(138, 43, 226, 0.15) !important;
                    margin-bottom: 50px !important;
                    position: relative !important;
                    overflow: hidden !important;
                }
                
                #header::before {
                    content: '';
                    position: absolute;
                    top: -20px;
                    left: -20px;
                    right: -20px;
                    bottom: -20px;
                    background: radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.04) 0%, transparent 50%);
                    animation: headerGlow 15s ease-in-out infinite alternate;
                    pointer-events: none;
                }
                
                @keyframes headerGlow {
                    0% { opacity: 0.5; transform: scale(1); }
                    100% { opacity: 1; transform: scale(1.02); }
                }
                
                footer {
                    background: rgba(255, 255, 255, 0.05) !important;
                    backdrop-filter: blur(20px) saturate(180%) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 20px !important;
                    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1), 
                                inset 0 0 0 1px rgba(255, 255, 255, 0.08) !important;
                }
                
                .gift-img {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }
                
                .gift-img:hover {
                    transform: translateY(-8px) scale(1.02) !important;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2), 
                                inset 0 0 0 1px rgba(255, 255, 255, 0.2),
                                0 0 40px rgba(147, 112, 219, 0.3) !important;
                }
                
                body {
                    position: relative !important;
                    overflow-x: hidden !important;
                }
                
                body::before {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at 20% 80%, rgba(147, 112, 219, 0.05) 0%, transparent 50%),
                                radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.05) 0%, transparent 50%),
                                radial-gradient(circle at 40% 40%, rgba(72, 61, 139, 0.03) 0%, transparent 50%);
                    animation: ambientGlow 30s ease-in-out infinite alternate;
                    pointer-events: none;
                    z-index: -1;
                }
                
                @keyframes ambientGlow {
                    0% { opacity: 0.3; }
                    100% { opacity: 0.7; }
                }
            `;
            document.head.appendChild(liquidStyles);
        }
    }

    removeLiquidGlassEffects() {
        const liquidStyles = document.getElementById("liquid-glass-styles");
        if (liquidStyles) {
            liquidStyles.remove();
        }

        // Reset gift sections to original styles
        const giftSections = document.querySelectorAll(".gift-section");
        giftSections.forEach((section) => {
            section.style.background = "";
            section.style.backdropFilter = "";
            section.style.border = "";
            section.style.borderRadius = "";
            section.style.boxShadow = "";
            section.style.position = "";
            section.style.overflow = "";
        });

        // Reset header
        const header = document.getElementById("header");
        if (header) {
            header.style.background = "";
            header.style.backdropFilter = "";
            header.style.border = "";
            header.style.borderRadius = "";
            header.style.padding = "";
            header.style.boxShadow = "";
            header.style.position = "";
            header.style.overflow = "";
        }

        // Reset footer
        const footer = document.querySelector("footer");
        if (footer) {
            footer.style.background = "";
            footer.style.backdropFilter = "";
            footer.style.border = "";
            footer.style.borderRadius = "";
            footer.style.boxShadow = "";
        }
    }

    showMessage(message) {
        const messageDiv = document.createElement("div");
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            font-family: 'Happy Monkey', cursive;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }
}

// Initialize the customizer when the script loads
const birthdayCustomizer = new BirthdayCustomizer();

// Export for external use
if (typeof module !== "undefined" && module.exports) {
    module.exports = BirthdayCustomizer;
}
