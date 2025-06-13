// Birthday Website Customizer
// Add this script to your existing HTML file

class BirthdayCustomizer {
    constructor() {
        this.themes = {
            original: {
                background: 'linear-gradient(#a2d2ff, #EFB0C9)',
                accentColor: '#EFB0C9',
                borderColor: '#EFB0C9',
                textColor: '#ffffff'
            },
            sunset: {
                background: 'linear-gradient(#ff9a9e, #fecfef)',
                accentColor: '#ff9a9e',
                borderColor: '#ff9a9e',
                textColor: '#ffffff'
            },
            ocean: {
                background: 'linear-gradient(#4facfe, #00f2fe)',
                accentColor: '#4facfe',
                borderColor: '#4facfe',
                textColor: '#ffffff'
            },
            forest: {
                background: 'linear-gradient(#56ab2f, #a8e6cf)',
                accentColor: '#56ab2f',
                borderColor: '#56ab2f',
                textColor: '#ffffff'
            },
            lavender: {
                background: 'linear-gradient(#667eea, #764ba2)',
                accentColor: '#667eea',
                borderColor: '#667eea',
                textColor: '#ffffff'
            },
            coral: {
                background: 'linear-gradient(#ff8a80, #ffcc80)',
                accentColor: '#ff8a80',
                borderColor: '#ff8a80',
                textColor: '#ffffff'
            },
            black: {
                background: 'linear-gradient(#2c3e50, #34495e)',
                accentColor: '#34495e',
                borderColor: '#e74c3c',
                textColor: '#ffffff'
            },
            white: {
                background: 'linear-gradient(#f8f9fa, #e9ecef)',
                accentColor: '#6c757d',
                borderColor: '#e74c3c',
                textColor: '#212529'
            },
            custom: {
                background: '',
                accentColor: '',
                borderColor: '',
                textColor: '#ffffff'
            }
        };
        
        this.defaultConfig = {
            name: 'Nick',
            age: 24,
            date: '01.11.2022',
            imageUrl: 'images/nick.jpg',
            creator: 'Frank',
            theme: 'original',
            customColors: {
                primary: '#EFB0C9',
                secondary: '#a2d2ff',
                accent: '#EFB0C9',
                border: '#EFB0C9'
            },
            gifts: {
                gift1: {
                    title: "Here's how happy I am for you today 🥳",
                    imageUrl: 'images/happy.gif'
                },
                gift2: {
                    title: "How people react when you enter the room 😍",
                    imageUrl: 'images/hot.gif'
                },
                gift3: {
                    title: "If I had to describe you with ONE word 👇",
                    imageUrl: 'images/genius.gif'
                },
                gift4: {
                    title: "The only person as badass as you 💪",
                    imageUrl: 'images/badass.gif'
                },
                gift5: {
                    title: "This one's for you, my friend 🥂",
                    imageUrl: 'images/cheers.gif'
                }
            }
        };
        
        this.config = { ...this.defaultConfig };
        this.init();
    }
    
    init() {
        // Wait for DOM to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupCustomizer());
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
        const panel = document.createElement('div');
        panel.id = 'customizer-panel';
        panel.innerHTML = `
            <div id="customizer-toggle">⚙️ Customize</div>
            <div id="customizer-content" style="display: none;">
                <h3>🎉 Customize Birthday Website</h3>
                
                <div class="customizer-section">
                    <label for="cust-name">Birthday Person's Name:</label>
                    <input type="text" id="cust-name" value="${this.config.name}">
                </div>
                
                <div class="customizer-row">
                    <div class="customizer-section">
                        <label for="cust-age">Age:</label>
                        <input type="number" id="cust-age" value="${this.config.age}" min="1" max="150">
                    </div>
                    <div class="customizer-section">
                        <label for="cust-date">Date:</label>
                        <input type="text" id="cust-date" value="${this.config.date}" placeholder="DD.MM.YYYY">
                    </div>
                </div>
                
                <div class="customizer-section">
                    <label for="cust-image">Photo URL:</label>
                    <input type="url" id="cust-image" value="${this.config.imageUrl}" placeholder="https://example.com/photo.jpg">
                </div>
                
                <div class="customizer-section">
                    <label for="cust-creator">Your Name (Creator):</label>
                    <input type="text" id="cust-creator" value="${this.config.creator}">
                </div>
                
                <div class="customizer-section">
                    <label for="cust-theme">Theme:</label>
                    <select id="cust-theme">
                        ${Object.keys(this.themes).map(theme => 
                            `<option value="${theme}" ${theme === this.config.theme ? 'selected' : ''}>${this.formatThemeName(theme)}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div id="custom-color-section" style="display: ${this.config.theme === 'custom' ? 'block' : 'none'};">
                    <h4>🎨 Custom Colors:</h4>
                    <div class="color-picker-grid">
                        <div class="color-picker-item">
                            <label for="cust-color-primary">Primary Color:</label>
                            <input type="color" id="cust-color-primary" value="${this.config.customColors.primary}">
                        </div>
                        <div class="color-picker-item">
                            <label for="cust-color-secondary">Secondary Color:</label>
                            <input type="color" id="cust-color-secondary" value="${this.config.customColors.secondary}">
                        </div>
                        <div class="color-picker-item">
                            <label for="cust-color-accent">Accent Color:</label>
                            <input type="color" id="cust-color-accent" value="${this.config.customColors.accent}">
                        </div>
                        <div class="color-picker-item">
                            <label for="cust-color-border">Border Color:</label>
                            <input type="color" id="cust-color-border" value="${this.config.customColors.border}">
                        </div>
                    </div>
                    <div class="custom-color-tips">
                        💡 <strong>Tips:</strong> Primary & Secondary create the background gradient. Accent colors the age/date badges. Border colors the profile image.
                    </div>
                </div>
                
                <h4>Gift Messages & Images:</h4>
                ${Object.keys(this.config.gifts).map((giftKey, index) => `
                    <div class="gift-customizer">
                        <h5>Gift ${index + 1}:</h5>
                        <input type="text" id="cust-${giftKey}-title" value="${this.config.gifts[giftKey].title}" placeholder="Gift title">
                        <input type="url" id="cust-${giftKey}-image" value="${this.config.gifts[giftKey].imageUrl}" placeholder="Image URL">
                    </div>
                `).join('')}
                
                <div class="customizer-buttons">
                    <button id="apply-changes">Apply Changes</button>
                    <button id="reset-default">Reset to Default</button>
                    <button id="export-config">Export Config</button>
                </div>
            </div>
        `;
        
        // Add CSS for the customizer panel
        const style = document.createElement('style');
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
        document.getElementById('customizer-toggle').addEventListener('click', () => {
            const content = document.getElementById('customizer-content');
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
        
        // Apply changes
        document.getElementById('apply-changes').addEventListener('click', () => {
            this.applyChanges();
        });
        
        // Reset to default
        document.getElementById('reset-default').addEventListener('click', () => {
            this.resetToDefault();
        });
        
        // Export config
        document.getElementById('export-config').addEventListener('click', () => {
            this.exportConfig();
        });
        
        // Real-time theme preview
        document.getElementById('cust-theme').addEventListener('change', (e) => {
            const selectedTheme = e.target.value;
            this.toggleCustomColorSection(selectedTheme);
            this.previewTheme(selectedTheme);
        });
        
        // Custom color live preview
        const colorInputs = ['primary', 'secondary', 'accent', 'border'];
        colorInputs.forEach(colorType => {
            document.getElementById(`cust-color-${colorType}`).addEventListener('input', (e) => {
                if (document.getElementById('cust-theme').value === 'custom') {
                    this.updateCustomColors();
                    this.previewCustomTheme();
                }
            });
        });
    }
    
    applyChanges() {
        // Collect form data
        this.config.name = document.getElementById('cust-name').value || 'Someone Special';
        this.config.age = document.getElementById('cust-age').value || '??';
        this.config.date = document.getElementById('cust-date').value || 'Today';
        this.config.imageUrl = document.getElementById('cust-image').value || 'images/default.jpg';
        this.config.creator = document.getElementById('cust-creator').value || 'A Friend';
        this.config.theme = document.getElementById('cust-theme').value;
        
        // Update custom colors if custom theme is selected
        if (this.config.theme === 'custom') {
            this.updateCustomColors();
        }
        
        // Update gift configs
        Object.keys(this.config.gifts).forEach(giftKey => {
            this.config.gifts[giftKey].title = document.getElementById(`cust-${giftKey}-title`).value;
            this.config.gifts[giftKey].imageUrl = document.getElementById(`cust-${giftKey}-image`).value;
        });
        
        // Apply changes to the website
        this.updateWebsite();
        this.saveToLocalStorage();
        
        // Show success message
        this.showMessage('Changes applied successfully! 🎉');
    }
    
    updateWebsite() {
        // Update main title
        const mainTitle = document.querySelector('#header h1');
        if (mainTitle) {
            mainTitle.textContent = `Today is ${this.config.name}'s birthday 🎉`;
        }
        
        // Update image
        const img = document.getElementById('bff-img');
        if (img) {
            img.src = this.config.imageUrl;
            img.alt = this.config.name;
        }
        
        // Update age
        const age = document.getElementById('bday-age');
        if (age) {
            age.textContent = `${this.config.age} years old`;
        }
        
        // Update date
        const date = document.getElementById('bday-date');
        if (date) {
            date.textContent = this.config.date;
        }
        
        // Update creator
        const footer = document.querySelector('footer p');
        if (footer) {
            footer.textContent = `Made With 💌 by ${this.config.creator}.`;
        }
        
        // Update page title
        document.title = `${this.config.name}'s Birthday Celebration`;
        
        // Apply theme
        this.applyTheme(this.config.theme);
        
        // Update gifts
        this.updateGifts();
    }
    
    updateGifts() {
        const giftSections = document.querySelectorAll('.gift-section');
        const giftKeys = Object.keys(this.config.gifts);
        
        giftSections.forEach((section, index) => {
            if (giftKeys[index]) {
                const giftKey = giftKeys[index];
                const gift = this.config.gifts[giftKey];
                
                // Update title
                const title = section.querySelector('.gift-title');
                if (title) {
                    title.textContent = gift.title;
                }
                
                // Update hover image
                const giftImg = section.querySelector('.gift-img');
                if (giftImg) {
                    // Remove existing hover listeners
                    const newGiftImg = giftImg.cloneNode(true);
                    giftImg.parentNode.replaceChild(newGiftImg, giftImg);
                    
                    // Add new hover effect
                    newGiftImg.addEventListener('mouseenter', () => {
                        newGiftImg.style.backgroundImage = `url("${gift.imageUrl}")`;
                    });
                    
                    newGiftImg.addEventListener('mouseleave', () => {
                        newGiftImg.style.backgroundImage = 'url("images/gift-cover.jpg")';
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
        if (themeName === 'custom') {
            currentTheme = this.generateCustomTheme();
        }
        
        // Update body background
        document.body.style.background = currentTheme.background;
        
        // Update text color for white theme
        document.body.style.color = currentTheme.textColor;
        
        // Update all text elements for proper contrast
        const textElements = document.querySelectorAll('h1, h2, h3, h4, p, .gift-title, .gift-hint');
        textElements.forEach(element => {
            element.style.color = currentTheme.textColor;
        });
        
        // Update accent elements
        const accentElements = [
            '#bday-age',
            '#bday-date',
            '#bff-img'
        ];
        
        accentElements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                if (selector === '#bff-img') {
                    element.style.borderColor = currentTheme.borderColor;
                } else {
                    element.style.backgroundColor = currentTheme.accentColor;
                    // For white theme, ensure text is readable on accent background
                    if (themeName === 'white') {
                        element.style.color = '#ffffff';
                    }
                }
            }
        });
        
        // Update text shadows for different themes
        const shadowElements = document.querySelectorAll('h1, h2, h3, h4, p');
        shadowElements.forEach(element => {
            if (themeName === 'white') {
                element.style.textShadow = '0 0 1px rgba(0,0,0,0.3)';
            } else if (themeName === 'black') {
                element.style.textShadow = '0 0 2px rgba(255,255,255,0.3)';
            } else {
                element.style.textShadow = '0 0 1px black';
            }
        });
        
        // Update gift box borders for theme consistency
        const giftImages = document.querySelectorAll('.gift-img');
        giftImages.forEach(img => {
            if (themeName === 'black') {
                img.style.borderColor = '#ffffff';
            } else if (themeName === 'white') {
                img.style.borderColor = '#212529';
            } else if (themeName === 'custom') {
                img.style.borderColor = currentTheme.borderColor;
            } else {
                img.style.borderColor = 'white';
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
        this.showMessage('Reset to default configuration! 🔄');
    }
    
    updateCustomizerForm() {
        document.getElementById('cust-name').value = this.config.name;
        document.getElementById('cust-age').value = this.config.age;
        document.getElementById('cust-date').value = this.config.date;
        document.getElementById('cust-image').value = this.config.imageUrl;
        document.getElementById('cust-creator').value = this.config.creator;
        document.getElementById('cust-theme').value = this.config.theme;
        
        // Update custom color inputs
        if (this.config.customColors) {
            document.getElementById('cust-color-primary').value = this.config.customColors.primary;
            document.getElementById('cust-color-secondary').value = this.config.customColors.secondary;
            document.getElementById('cust-color-accent').value = this.config.customColors.accent;
            document.getElementById('cust-color-border').value = this.config.customColors.border;
        }
        
        this.toggleCustomColorSection(this.config.theme);
        
        Object.keys(this.config.gifts).forEach(giftKey => {
            document.getElementById(`cust-${giftKey}-title`).value = this.config.gifts[giftKey].title;
            document.getElementById(`cust-${giftKey}-image`).value = this.config.gifts[giftKey].imageUrl;
        });
    }
    
    toggleCustomColorSection(themeName) {
        const customColorSection = document.getElementById('custom-color-section');
        if (customColorSection) {
            customColorSection.style.display = themeName === 'custom' ? 'block' : 'none';
        }
    }
    
    updateCustomColors() {
        this.config.customColors = {
            primary: document.getElementById('cust-color-primary').value,
            secondary: document.getElementById('cust-color-secondary').value,
            accent: document.getElementById('cust-color-accent').value,
            border: document.getElementById('cust-color-border').value
        };
    }
    
    generateCustomTheme() {
        const colors = this.config.customColors;
        return {
            background: `linear-gradient(${colors.primary}, ${colors.secondary})`,
            accentColor: colors.accent,
            borderColor: colors.border,
            textColor: this.getOptimalTextColor(colors.primary)
        };
    }
    
    getOptimalTextColor(bgColor) {
        // Convert hex to RGB
        const hex = bgColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Return black for light backgrounds, white for dark backgrounds
        return luminance > 0.5 ? '#212529' : '#ffffff';
    }
    
    previewCustomTheme() {
        if (document.getElementById('cust-theme').value === 'custom') {
            this.updateCustomColors();
            this.applyTheme('custom');
        }
    }
    
    exportConfig() {
        const configJSON = JSON.stringify(this.config, null, 2);
        const blob = new Blob([configJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.config.name.toLowerCase().replace(/\s+/g, '-')}-birthday-config.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showMessage('Configuration exported! 📁');
    }
    
    saveToLocalStorage() {
        localStorage.setItem('birthdayConfig', JSON.stringify(this.config));
    }
    
    loadFromLocalStorage() {
        const saved = localStorage.getItem('birthdayConfig');
        if (saved) {
            try {
                this.config = { ...this.defaultConfig, ...JSON.parse(saved) };
                this.updateCustomizerForm();
                this.updateWebsite();
            } catch (e) {
                console.warn('Failed to load saved configuration');
            }
        }
    }
    
    formatThemeName(theme) {
        return theme.charAt(0).toUpperCase() + theme.slice(1);
    }
    
    showMessage(message) {
        const messageDiv = document.createElement('div');
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
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BirthdayCustomizer;
}