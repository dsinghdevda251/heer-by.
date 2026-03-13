document.addEventListener('DOMContentLoaded', () => {
    
    // --- Audio ---
    const bgMusic = document.getElementById('bgMusic');
    const clapSound = document.getElementById('clappingSound');
    // const popSound = document.getElementById('popSound');

    // --- Sections ---
    const introSection = document.getElementById('introSection');
    const mainContent = document.getElementById('mainContent');
    const wishSection = document.getElementById('wishSection');
    const cakeSection = document.getElementById('cakeSection');
    const gallerySection = document.getElementById('gallerySection');
    const slideshowSection = document.getElementById('slideshowSection');
    const letterSection = document.getElementById('letterSection');
    
    // --- Buttons ---
    const startBtn = document.getElementById('startBtn');
    const blowCandlesBtn = document.getElementById('blowCandlesBtn');
    const cutCakeBtn = document.getElementById('cutCakeBtn');
    const revealSurpriseTrigger = document.getElementById('revealSurpriseTrigger');
    
    // 1. Start Experience
    startBtn.addEventListener('click', () => {
        bgMusic.play().catch(e => console.log("User interaction needed for audio"));
        
        introSection.style.opacity = '0';
        setTimeout(() => {
            introSection.classList.add('hidden');
            mainContent.classList.remove('hidden');
            setTimeout(() => {
                mainContent.classList.add('visible');
                wishSection.classList.remove('hidden');
                
                // Show Dynamic wishes
                const wishes = ["Amazing Friend", "Superstar", "Kind Soul", "Beautiful Heart"];
                let i = 0;
                const wishSubtitle = document.getElementById('dynamicWish');
                setInterval(() => {
                    wishSubtitle.textContent = wishes[i];
                    wishSubtitle.style.animation = "none";
                    void wishSubtitle.offsetWidth; 
                    wishSubtitle.style.animation = "fadeIn 1s";
                    i = (i + 1) % wishes.length;
                }, 2000);

                setTimeout(() => {
                    cakeSection.classList.remove('hidden');
                    cakeSection.scrollIntoView({ behavior: 'smooth' });
                }, 1000);

            }, 100);
        }, 1500);

        startPetals();
    });

    // 2. Blow Candles
    blowCandlesBtn.addEventListener('click', () => {
        // Extinguish flames
        document.querySelectorAll('.flame').forEach(f => f.classList.add('extinguished'));
        // Show smoke
        document.querySelector('.smoke').classList.remove('hidden');
        
        // Hide Blow button, show Cut button
        blowCandlesBtn.classList.add('hidden');
        setTimeout(() => {
            cutCakeBtn.classList.remove('hidden');
        }, 1000);
    });

    // 3. Cut Cake
    cutCakeBtn.addEventListener('click', () => {
        clapSound.play();
        triggerConfetti();
        document.getElementById('cakeMessage').classList.remove('hidden');
        
        // Effects
        cutCakeBtn.disabled = true;
        cutCakeBtn.innerText = "Yummy! 🍰";

        // Show Gallery & Slideshow
        setTimeout(() => {
            gallerySection.classList.remove('hidden');
            slideshowSection.classList.remove('hidden');
            letterSection.classList.remove('hidden');
            gallerySection.scrollIntoView({ behavior: 'smooth' });
            
            // Try detecting images (mock logic for now)
            startSlideshow();

        }, 2000);
    });

    // --- Gallery & Slideshow Logic ---
    // Start slideshow immediately when shown
    function startSlideshow() {
        const slides = document.querySelectorAll("#slideshowContainer .slide");
        if (slides.length === 0) return;

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        
        slides[slideIndex-1].style.display = "flex"; // using flex to center
        setTimeout(startSlideshow, 3000); 
    }
    
    // SlideShow index
    let slideIndex = 0;

    // --- Popups ---
    window.openPhotoPopup = function(src, msg) {
        const popup = document.getElementById('photoPopup');
        const container = document.getElementById('popupImageContainer');
        const message = document.getElementById('popupMessage');
        
        container.innerHTML = `<img src="${src}" alt="Memory">`;
        if(msg) message.textContent = msg;
        
        popup.classList.remove('hidden');
    }

    window.closePhotoPopup = function() {
        document.getElementById('photoPopup').classList.add('hidden');
    }

    // --- Typing Letter ---
    // Trigger when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            startTyping();
            observer.disconnect();
        }
    });
    observer.observe(letterSection);

    const fullLetter = `Dearest Heer,\n\nOn this special day, I just want to remind you how incredible you are. Your laughter is infectious, your kindness touches everyone around you, and your strength inspires us all.\n\nToday isn't just about growing older, it's about celebrating the wonderful person you are becoming. May this year bring you endless joy, exciting adventures, and all the success you deserve.\n\nKeep shining bright! ✨`;
    
    function startTyping() {
        const elm = document.getElementById('typingLetter');
        let i = 0;
        elm.innerHTML = '';
        function type() {
            if (i < fullLetter.length) {
                if (fullLetter.charAt(i) === '\n') {
                    elm.innerHTML += '<br>';
                } else {
                    elm.innerHTML += fullLetter.charAt(i);
                }
                i++;
                setTimeout(type, 30);
            } else {
                // Show signature and final button
                document.getElementById('letterSignature').classList.remove('hidden');
                revealSurpriseTrigger.classList.remove('hidden');
            }
        }
        type();
    }

    // --- Final Surprise ---
    revealSurpriseTrigger.addEventListener('click', () => {
        document.getElementById('finalOverlay').classList.remove('hidden');
        triggerDetailedFireworks();
    });

    // --- Effects Helper ---
    function triggerConfetti() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    function startPetals() {
        const container = document.getElementById('rosePetalsContainer');
        setInterval(() => {
            const p = document.createElement('div');
            p.className = 'petal';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = (Math.random() * 5 + 5) + 's';
            container.appendChild(p);
            setTimeout(() => p.remove(), 10000);
        }, 500);
    }

    function triggerDetailedFireworks() {
        var duration = 10 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        function random(min, max) { return Math.random() * (max - min) + min; }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            var particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
});
