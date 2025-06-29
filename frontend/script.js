document.addEventListener("DOMContentLoaded", () => {
    // Check if Vault is already unlocked before running CAPTCHA
    if (localStorage.getItem("vaultUnlocked") === "true") {
        document.getElementById("hero").style.display = "none";
        document.getElementById("vault").style.display = "block";
        return; // Stop execution to prevent unnecessary CAPTCHA generation
    }

    generateCaptcha(); // Ensure CAPTCHA is shown for unlocking
});

let generatedCaptcha = '';

function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 5; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    generatedCaptcha = captcha;
    document.getElementById('captcha-code').innerText = captcha;
}

function checkUnlock() {
    const enteredCaptcha = document.getElementById('captcha').value;
    if (enteredCaptcha === generatedCaptcha) {
        document.getElementById('vault').style.display = 'block';
        document.querySelector('.hero-container').style.display = 'none';
    } else {
        document.getElementById('error-message').innerText = 'Incorrect code. Try again!';
        generateCaptcha(); // regenerate on wrong entry
    }
}

// Run captcha generation when page loads
window.onload = generateCaptcha;


// Ensure game pages return directly to the vault, NOT the hero page
window.addEventListener("pageshow", () => {
    if (localStorage.getItem("vaultUnlocked") === "true") {
        document.getElementById("hero").style.display = "none";
        document.getElementById("vault").style.display = "block";
    }
});

function toggleMenu() {
    let sidebar = document.querySelector(".sidebar");
    sidebar.style.left = sidebar.style.left === "0px" ? "-220px" : "0px";
}

function bounceEffect(element) {
    element.style.transform = "scale(1.2)";
    setTimeout(() => {
        element.style.transform = "scale(1)";
    }, 200);
}
