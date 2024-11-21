const colorPicker = document.getElementById("colorPicker");
const opacitySlider = document.getElementById("opacitySlider");
const opacityValue = document.getElementById("opacityValue");
const colorBox = document.getElementById("colorBox");
const hexValue = document.getElementById("hexValue");
const rgbValue = document.getElementById("rgbValue");
const hslValue = document.getElementById("hslValue");
const rgbaValue = document.getElementById("rgbaValue");
const copyHex = document.getElementById("copyHex");
const saveColor = document.getElementById("saveColor");
const savedColors = document.getElementById("savedColors");
const notification = document.getElementById("notification");
const notificationMessage = document.getElementById("notificationMessage");
const closeNotification = document.getElementById("closeNotification");


function showNotification(message) {
    notificationMessage.innerText = message;
    notification.style.display = "flex";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

closeNotification.addEventListener("click", () => {
    notification.style.display = "none";
});

function updateColors() {
    const hex = colorPicker.value;
    const opacity = opacitySlider.value;
    colorBox.style.backgroundColor = hex;

    hexValue.textContent = hex;

    const rgb = hexToRgb(hex);
    rgbValue.textContent = `Rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hslValue.textContent = `Hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

    rgbaValue.textContent = `Rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;

    opacityValue.textContent = parseFloat(opacity).toFixed(2);
    colorBox.style.opacity = opacity;
}

colorPicker.addEventListener("input", updateColors);
opacitySlider.addEventListener("input", updateColors);

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

saveColor.addEventListener("click", () => {
    const savedColorCount = savedColors.getElementsByClassName("saved-color").length;
    if (savedColorCount >= 10) {
        showNotification("شما نمی‌توانید بیش از 10 رنگ ذخیره کنید.");
        return;
    }
    const savedColor = document.createElement("div");
    savedColor.classList.add("saved-color");
    savedColor.style.backgroundColor = colorPicker.value;
    savedColor.style.opacity = opacitySlider.value;
    savedColors.appendChild(savedColor);
    showNotification("رنگ ذخیره شد.");
});


copyHex.addEventListener("click", () => {
    navigator.clipboard.writeText(hexValue.textContent).then(() => {
        showNotification("کد HEX کپی شد.");
    });
});

const copyRgb = document.getElementById("copyRgb");
copyRgb.addEventListener("click", () => {
    navigator.clipboard.writeText(rgbValue.textContent).then(() => {
        showNotification("کد RGB کپی شد.");
    });
});



const copyHsl = document.getElementById("copyHsl");
copyHsl.addEventListener("click", () => {
    navigator.clipboard.writeText(hslValue.textContent).then(() => {
        showNotification("کد HSL کپی شد.");
    });
});

const copyRgba = document.getElementById("copyRgba");
copyRgba.addEventListener("click", () => {
    navigator.clipboard.writeText(rgbaValue.textContent).then(() => {
        showNotification("کد RGBA کپی شد.");
    });
});

updateColors();



const divs = document.querySelectorAll('.flip'); 

divs.forEach(div => {
let isHovered = false;
let isUnhover = false;
div.addEventListener('mouseenter', () => {
if (!isHovered) {
  div.classList.add('flipped');
  isHovered = true;
}
});

div.addEventListener('mouseleave', () => {
div.classList.remove('flipped');
isHovered = false;
});

});
