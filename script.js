// Get the canvas for stars
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial resize
resizeCanvas();

// Resize on window resize
window.addEventListener('resize', resizeCanvas);

// Star class
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.5 + 0.1;
        this.brightness = Math.random();
        this.color = this.randomColor();
        this.twinkleSpeed = Math.random() * 0.05 + 0.01;
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
    }

    randomColor() {
        const colors = ['#FFFFFF', '#FFFFAA', '#AAAAFF', '#FFAAAA'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        // Twinkle effect
        this.brightness += this.twinkleSpeed * this.twinkleDirection;
        
        if (this.brightness > 1) {
            this.brightness = 1;
            this.twinkleDirection = -1;
        } else if (this.brightness < 0.2) {
            this.brightness = 0.2;
            this.twinkleDirection = 1;
        }

        // Move star
        this.y += this.speed;
        
        // Reset star if it goes off screen
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.brightness, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.brightness;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Create stars
const stars = [];
const starCount = 150;

for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

// Animation loop for stars
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animateStars);
}

// Start star animation
animateStars();

// Visitor counter animation
const visitorCounter = document.getElementById('visitor-counter');
let visitorCount = 1337;

setInterval(() => {
    visitorCount++;
    visitorCounter.textContent = `Visitors: ${visitorCount.toLocaleString()}`;
}, 7000);

// Cursor trail effect
const cursorTrail = document.getElementById('cursor-trail');
const trailElements = [];
const trailLength = 20;

// Create cursor trail elements
for (let i = 0; i < trailLength; i++) {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.width = `${10 - (i / 3)}px`;
    trail.style.height = `${10 - (i / 3)}px`;
    trail.style.backgroundColor = `hsl(${i * 360 / trailLength}, 100%, 50%)`;
    trail.style.borderRadius = '50%';
    trail.style.position = 'absolute';
    trail.style.pointerEvents = 'none';
    trail.style.opacity = 1 - (i / trailLength);
    trail.style.transition = 'left 0.05s, top 0.05s';
    trail.style.left = '0px';
    trail.style.top = '0px';
    trail.style.zIndex = trailLength - i;
    
    cursorTrail.appendChild(trail);
    trailElements.push(trail);
}

// Update cursor trail
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Update trail positions with delay
    setTimeout(() => {
        trailElements[0].style.left = `${mouseX}px`;
        trailElements[0].style.top = `${mouseY}px`;
    }, 0);
    
    for (let i = 1; i < trailElements.length; i++) {
        const delay = i * 40;
        
        setTimeout(() => {
            trailElements[i].style.left = `${mouseX}px`;
            trailElements[i].style.top = `${mouseY}px`;
        }, delay);
    }
});

// Blinking text animation already handled in CSS

// Rainbow text effect for banner
const banner = document.getElementById('banner');
let hue = 0;

setInterval(() => {
    hue = (hue + 1) % 360;
    banner.style.color = `hsl(${hue}, 100%, 70%)`;
}, 50);

// Add a marquee element dynamically
const marquee = document.createElement('div');
marquee.style.width = '100%';
marquee.style.overflow = 'hidden';
marquee.style.whiteSpace = 'nowrap';
marquee.style.position = 'fixed';
marquee.style.bottom = '30px';
marquee.style.color = '#FF00FF';
marquee.style.fontWeight = 'bold';
marquee.style.textShadow = '1px 1px 2px black';

const marqueeText = document.createElement('span');
marqueeText.textContent = '★ Welcome to my awesome website! Thanks for visiting! Don\'t forget to sign my guestbook! ★ '.repeat(10);
marqueeText.style.display = 'inline-block';
marqueeText.style.animation = 'marquee 30s linear infinite';

// Add keyframes for marquee animation
const style = document.createElement('style');
style.textContent = `
    @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
    }
`;

document.head.appendChild(style);
marquee.appendChild(marqueeText);
document.body.appendChild(marquee);

// Add hit counter increment on click
document.addEventListener('click', () => {
    visitorCount += Math.floor(Math.random() * 5) + 1;
    visitorCounter.textContent = `Visitors: ${visitorCount.toLocaleString()}`;
});

// ===== POPUP ANIMATIONS FOR MENU ITEMS =====

// Create popup container
const popupContainer = document.createElement('div');
popupContainer.style.position = 'fixed';
popupContainer.style.top = '0';
popupContainer.style.left = '0';
popupContainer.style.width = '100%';
popupContainer.style.height = '100%';
popupContainer.style.display = 'none';
popupContainer.style.justifyContent = 'center';
popupContainer.style.alignItems = 'center';
popupContainer.style.zIndex = '9999';
popupContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
document.body.appendChild(popupContainer);

// Create popup content
const popupContent = document.createElement('div');
popupContent.style.backgroundColor = '#000033';
popupContent.style.border = '3px solid #00FF00';
popupContent.style.borderRadius = '15px';
popupContent.style.padding = '20px';
popupContent.style.maxWidth = '80%';
popupContent.style.maxHeight = '80%';
popupContent.style.overflow = 'auto';
popupContent.style.position = 'relative';
popupContent.style.boxShadow = '0 0 20px #00FF00, 0 0 40px #00FF00';
popupContainer.appendChild(popupContent);

// Create close button
const closeButton = document.createElement('div');
closeButton.textContent = 'X';
closeButton.style.position = 'absolute';
closeButton.style.top = '10px';
closeButton.style.right = '15px';
closeButton.style.color = '#FF0000';
closeButton.style.fontSize = '24px';
closeButton.style.fontWeight = 'bold';
closeButton.style.cursor = 'pointer';
closeButton.style.textShadow = '0 0 5px #FF0000';
popupContent.appendChild(closeButton);

// Close popup when closeButton is clicked
closeButton.addEventListener('click', () => {
    popupContainer.style.display = 'none';
    if (popupAnimationInterval) {
        clearInterval(popupAnimationInterval);
        popupAnimationInterval = null;
    }
});

let popupAnimationInterval = null;

// Show popup with animation, depending on which menu item was clicked
function showPopup(contentType) {
    popupContent.innerHTML = ''; // Clear previous content
    popupContent.appendChild(closeButton); // Re-add close button
    
    // Different animations and content for each menu item
    switch(contentType) {
        case 'about':
            // Create about me content
            const aboutTitle = document.createElement('h2');
            aboutTitle.textContent = 'About Me';
            aboutTitle.style.color = '#FFFF00';
            aboutTitle.style.textAlign = 'center';
            
            const aboutAvatar = document.createElement('img');
            aboutAvatar.src = 'https://gifcities.org/assets/dancing_computer.gif';
            aboutAvatar.alt = 'My avatar';
            aboutAvatar.style.display = 'block';
            aboutAvatar.style.margin = '20px auto';
            aboutAvatar.style.border = '3px dashed #FF00FF';
            
            const aboutText = document.createElement('p');
            aboutText.style.color = '#00FFFF';
            aboutText.style.fontFamily = 'Comic Sans MS';
            aboutText.style.fontSize = '16px';
            aboutText.style.lineHeight = '1.6';
            aboutText.innerHTML = `
                <marquee behavior="alternate" scrollamount="3">*** WELCOME TO MY PAGE ***</marquee>
                <br><br>
                Name: CoolDude2002<br>
                Age: 2 cool 4 school<br>
                Location: Cyberspace<br>
                <br>
                I'm a total computer wiz who loves making EPIC websites!
                My hobbies include playing Snake, downloading MP3s, and customizing my MySpace page.
                <br><br>
                <blink>This site is ALWAYS under construction!</blink>
            `;
            
            popupContent.appendChild(aboutTitle);
            popupContent.appendChild(aboutAvatar);
            popupContent.appendChild(aboutText);
            
            // Matrix-like animation for About Me
            popupContent.style.border = '3px solid #00FF00';
            popupContent.style.boxShadow = '0 0 20px #00FF00, 0 0 40px #00FF00';
            
            // Falling matrix code animation in the background
            const matrixCanvas = document.createElement('canvas');
            matrixCanvas.style.position = 'absolute';
            matrixCanvas.style.top = '0';
            matrixCanvas.style.left = '0';
            matrixCanvas.style.width = '100%';
            matrixCanvas.style.height = '100%';
            matrixCanvas.style.opacity = '0.3';
            matrixCanvas.style.zIndex = '-1';
            popupContent.appendChild(matrixCanvas);
            
            const matrixCtx = matrixCanvas.getContext('2d');
            matrixCanvas.width = popupContent.clientWidth;
            matrixCanvas.height = popupContent.clientHeight;
            
            const matrixChars = '01';
            const charSize = 14;
            const columns = matrixCanvas.width / charSize;
            const drops = [];
            
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * -20);
            }
            
            popupAnimationInterval = setInterval(() => {
                matrixCtx.fillStyle = 'rgba(0, 0, 51, 0.05)';
                matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
                
                matrixCtx.fillStyle = '#00FF00';
                matrixCtx.font = `${charSize}px monospace`;
                
                for (let i = 0; i < drops.length; i++) {
                    const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
                    matrixCtx.fillText(text, i * charSize, drops[i] * charSize);
                    
                    if (drops[i] * charSize > matrixCanvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    
                    drops[i]++;
                }
            }, 50);
            break;
            
        case 'links':
            // Create links content
            const linksTitle = document.createElement('h2');
            linksTitle.textContent = 'My Cool Links Collection';
            linksTitle.style.color = '#FF00FF';
            linksTitle.style.textAlign = 'center';
            linksTitle.style.textShadow = '2px 2px 4px #0000FF';
            
            const linksList = document.createElement('div');
            linksList.style.textAlign = 'center';
            linksList.style.marginTop = '20px';
            
            const links = [
                { name: 'My Awesome Friend\'s Page', url: '#' },
                { name: 'Cool 3D Animations', url: '#' },
                { name: 'Free Cursors and GIFs', url: '#' },
                { name: 'The BEST Wallpapers', url: '#' },
                { name: 'Funny Jokes Page', url: '#' },
                { name: 'Secret Cheat Codes', url: '#' }
            ];
            
            links.forEach(link => {
                const linkItem = document.createElement('div');
                linkItem.style.margin = '15px 0';
                
                const linkText = document.createElement('a');
                linkText.href = link.url;
                linkText.textContent = link.name;
                linkText.style.color = '#FFFF00';
                linkText.style.fontSize = '18px';
                linkText.style.textDecoration = 'none';
                linkText.style.display = 'inline-block';
                
                // Random colorful bullet
                const bullet = document.createElement('span');
                const bulletColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
                bullet.textContent = '►';
                bullet.style.color = bulletColors[Math.floor(Math.random() * bulletColors.length)];
                bullet.style.marginRight = '10px';
                
                // Append elements
                linkItem.appendChild(bullet);
                linkItem.appendChild(linkText);
                linksList.appendChild(linkItem);
            });
            
            // "NEW!" flashing label
            const newLabel = document.createElement('div');
            newLabel.textContent = 'NEW!';
            newLabel.style.display = 'inline-block';
            newLabel.style.backgroundColor = '#FF0000';
            newLabel.style.color = 'white';
            newLabel.style.padding = '3px 8px';
            newLabel.style.borderRadius = '10px';
            newLabel.style.fontSize = '12px';
            newLabel.style.marginLeft = '10px';
            newLabel.style.animation = 'blinker 0.5s linear infinite';
            
            // Add the NEW! label to a random link
            const randomLinkIndex = Math.floor(Math.random() * links.length);
            linksList.children[randomLinkIndex].appendChild(newLabel);
            
            popupContent.appendChild(linksTitle);
            popupContent.appendChild(linksList);
            
            // 3D spinning animation for links popup
            popupContent.style.border = '3px solid #FF00FF';
            popupContent.style.boxShadow = '0 0 20px #FF00FF, 0 0 40px #FF00FF';
            
            let rotation = 0;
            popupAnimationInterval = setInterval(() => {
                rotation = (rotation + 1) % 360;
                
                // Create a wobble/spinning effect
                const scaleAmount = 0.95 + Math.sin(rotation * Math.PI / 180) * 0.05;
                const skewAmount = Math.sin(rotation * Math.PI / 90) * 2;
                
                popupContent.style.transform = `
                    rotateY(${Math.sin(rotation * Math.PI / 180) * 5}deg)
                    rotateX(${Math.cos(rotation * Math.PI / 180) * 3}deg)
                    scale(${scaleAmount})
                    skew(${skewAmount}deg, ${skewAmount}deg)
                `;
            }, 30);
            break;
            
        case 'guestbook':
            // Create guestbook content
            const guestTitle = document.createElement('h2');
            guestTitle.textContent = 'Sign My Guestbook!';
            guestTitle.style.color = '#00FFFF';
            guestTitle.style.textAlign = 'center';
            
            const guestForm = document.createElement('div');
            guestForm.style.backgroundColor = '#000066';
            guestForm.style.border = '2px dashed #00FFFF';
            guestForm.style.padding = '15px';
            guestForm.style.margin = '20px auto';
            guestForm.style.maxWidth = '400px';
            
            // Form elements
            const nameField = createFormField('Your Name:', 'text');
            const emailField = createFormField('Your Email:', 'email');
            const commentField = createFormField('Your Message:', 'textarea');
            
            // Submit button
            const submitButton = document.createElement('button');
            submitButton.textContent = 'SIGN GUESTBOOK!';
            submitButton.style.backgroundColor = '#FF0000';
            submitButton.style.color = 'white';
            submitButton.style.border = 'none';
            submitButton.style.padding = '8px 20px';
            submitButton.style.borderRadius = '5px';
            submitButton.style.fontWeight = 'bold';
            submitButton.style.cursor = 'pointer';
            submitButton.style.display = 'block';
            submitButton.style.margin = '20px auto 10px';
            submitButton.style.fontFamily = 'Comic Sans MS';
            submitButton.onclick = function(e) {
                e.preventDefault();
                alert('Thanks for signing my guestbook! Your message is very important to me!');
            };
            
            // Previous entries
            const previousEntries = document.createElement('div');
            previousEntries.style.marginTop = '30px';
            previousEntries.style.borderTop = '1px dashed #00FFFF';
            previousEntries.style.paddingTop = '15px';
            
            const entriesTitle = document.createElement('h3');
            entriesTitle.textContent = 'Recent Visitors:';
            entriesTitle.style.color = '#FFFF00';
            entriesTitle.style.textAlign = 'center';
            previousEntries.appendChild(entriesTitle);
            
            // Fake guestbook entries
            const entries = [
                { name: 'CoolDude99', date: '04/12/2002', message: 'Awesome site, keep it up!' },
                { name: 'XxHackerxX', date: '03/24/2002', message: 'Nice GIFs collection! Added you to my webring.' },
                { name: 'SkaterGirl2000', date: '03/15/2002', message: 'Love the colors! So RADICAL!' }
            ];
            
            entries.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.style.backgroundColor = '#000044';
                entryDiv.style.border = '1px solid #0000AA';
                entryDiv.style.borderRadius = '5px';
                entryDiv.style.padding = '10px';
                entryDiv.style.margin = '10px 0';
                
                const entryHeader = document.createElement('div');
                entryHeader.style.borderBottom = '1px dotted #0000AA';
                entryHeader.style.paddingBottom = '5px';
                entryHeader.style.marginBottom = '5px';
                entryHeader.style.fontWeight = 'bold';
                entryHeader.style.color = '#FF00FF';
                entryHeader.textContent = `${entry.name} (${entry.date})`;
                
                const entryMessage = document.createElement('div');
                entryMessage.style.color = 'white';
                entryMessage.textContent = entry.message;
                
                entryDiv.appendChild(entryHeader);
                entryDiv.appendChild(entryMessage);
                previousEntries.appendChild(entryDiv);
            });
            
            // Add all elements to guestbook
            guestForm.appendChild(nameField);
            guestForm.appendChild(emailField);
            guestForm.appendChild(commentField);
            guestForm.appendChild(submitButton);
            
            popupContent.appendChild(guestTitle);
            popupContent.appendChild(guestForm);
            popupContent.appendChild(previousEntries);
            
            // Confetti animation for guestbook
            popupContent.style.border = '3px solid #00FFFF';
            popupContent.style.boxShadow = '0 0 20px #00FFFF, 0 0 40px #00FFFF';
            
            // Create falling confetti effect
            const confettiContainer = document.createElement('div');
            confettiContainer.style.position = 'absolute';
            confettiContainer.style.top = '0';
            confettiContainer.style.left = '0';
            confettiContainer.style.width = '100%';
            confettiContainer.style.height = '100%';
            confettiContainer.style.pointerEvents = 'none';
            confettiContainer.style.overflow = 'hidden';
            confettiContainer.style.zIndex = '-1';
            popupContent.appendChild(confettiContainer);
            
            const confettiColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
            const confettiCount = 100;
            const confettis = [];
            
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                const size = Math.random() * 10 + 5;
                const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
                
                confetti.style.position = 'absolute';
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.backgroundColor = color;
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.top = `${-size * 2}px`;
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.opacity = Math.random() * 0.8 + 0.2;
                
                confettiContainer.appendChild(confetti);
                
                // Store confetti properties
                confettis.push({
                    element: confetti,
                    speed: Math.random() * 2 + 1,
                    rotation: 0,
                    rotationSpeed: (Math.random() - 0.5) * 10,
                    horizontalSpeed: (Math.random() - 0.5) * 2
                });
            }
            
            popupAnimationInterval = setInterval(() => {
                confettis.forEach(conf => {
                    // Get current position
                    const top = parseFloat(conf.element.style.top);
                    const left = parseFloat(conf.element.style.left);
                    
                    // Update rotation
                    conf.rotation += conf.rotationSpeed;
                    
                    // Update position
                    conf.element.style.top = `${top + conf.speed}px`;
                    conf.element.style.left = `${left + conf.horizontalSpeed}%`;
                    conf.element.style.transform = `rotate(${conf.rotation}deg)`;
                    
                    // Reset if off screen
                    if (top > confettiContainer.clientHeight) {
                        conf.element.style.top = `${-parseFloat(conf.element.style.height) * 2}px`;
                        conf.element.style.left = `${Math.random() * 100}%`;
                    }
                });
            }, 30);
            break;
    }
    
    // Show the popup
    popupContainer.style.display = 'flex';
    
    // Add entrance animation
    popupContent.style.animation = 'popupEnter 0.5s forwards';
    const popupKeyframes = `
        @keyframes popupEnter {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(document.createElement('style')).textContent = popupKeyframes;
}

// Helper function to create form fields
function createFormField(label, type) {
    const fieldContainer = document.createElement('div');
    fieldContainer.style.margin = '15px 0';
    
    const fieldLabel = document.createElement('label');
    fieldLabel.textContent = label;
    fieldLabel.style.display = 'block';
    fieldLabel.style.marginBottom = '5px';
    fieldLabel.style.color = '#FFFF00';
    fieldLabel.style.fontWeight = 'bold';
    
    let inputField;
    if (type === 'textarea') {
        inputField = document.createElement('textarea');
        inputField.rows = 4;
    } else {
        inputField = document.createElement('input');
        inputField.type = type;
    }
    
    inputField.style.width = '100%';
    inputField.style.padding = '5px';
    inputField.style.backgroundColor = '#000033';
    inputField.style.border = '1px solid #0000AA';
    inputField.style.borderRadius = '3px';
    inputField.style.color = 'white';
    inputField.style.fontFamily = 'Comic Sans MS';
    
    fieldContainer.appendChild(fieldLabel);
    fieldContainer.appendChild(inputField);
    
    return fieldContainer;
}

// Attach event listeners to menu items
document.addEventListener('DOMContentLoaded', () => {
    // Find all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent actual navigation
            
            // Determine which menu item was clicked
            const href = item.getAttribute('href');
            
            if (href.includes('about')) {
                showPopup('about');
            } else if (href.includes('links')) {
                showPopup('links'); 
            } else if (href.includes('guestbook')) {
                showPopup('guestbook');
            }
        });
    });
}); 