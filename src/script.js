const tClrs = 12;


const container = document.getElementById(`palette-container`);
const totalColor = document.getElementById(`total-color`);
totalColor.textContent = tClrs; //used in generateColorPaletteHTML() & updatePalette

function generateColorPaletteHTML() {

    for (let i = 1; i <= tClrs; i++) {
        const paletteHTML =
            `<div class="color-box w-full rounded-lg overflow-hidden shadow-xl hover:scale-[0.9] active:scale-[0.9] transition-all duration-500">
                <div class="color-container h-42 w-full   bg-[#7B5B8A]"></div>

                <div class="color-info flex justify-between bg-white p-2">
                    <span class="hex-value uppercase font-semibold">#7B5B8A</span>

                    <button id="copy-btn-${i}" title="copy color" class="hover:text-blue-500 active:text-blue-500 transition-all duration-300">
                        <i class="far fa-copy"></i>
                    </button>
                </div>
            </div>`;
        
        container.innerHTML += paletteHTML;
    }

}

generateColorPaletteHTML();


const generate_Color_Btn = document.getElementById(`generate-btn`);
const colorBoxes = document.querySelectorAll(`.color-box`);
const toast = document.getElementById("toast");



function updatePalette() {
    const colors = [];

    for (let i = 0; i < tClrs; i++) {
        colors.push(generate_Random_Color());
    }

    updatePaletteDisplay(colors);
}

// function generate_Random_Color() {
//     let decimalNum = Math.floor(Math.random() * 16777215);
//     let hexValue = decimalNum.toString(16);
//     let filledHexValue = hexValue.padStart(6, `0`);
//     return `#${filledHexValue}`;
// }

// short form -->
const generate_Random_Color = () =>
    `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;

function updatePaletteDisplay(colors) {
    colorBoxes.forEach((element, index) => {
        const color = colors[index];
        const hexValue = element.querySelector(`.hex-value`);
        const color_container = element.querySelector(`.color-container`);

        hexValue.textContent = color;
        color_container.style.backgroundColor = color;


        element.onmouseenter = () => {
            element.style.boxShadow = `0 10px 15px -3px ${color}80`;
        }

        element.onmouseleave = () => {
            element.style.boxShadow = ``;
        }

        element.onclick = () => copyColor(`${color}`);
    });
}

function showToast(message) {

    toast.textContent = `${message} Copied`;

    toast.classList.remove("opacity-0", "translate-y-5");
    toast.classList.add("opacity-100", "translate-y-0");

    setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-5");
        toast.classList.remove("opacity-100", "translate-y-0");
    }, 3000);
}

function copyColor(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {

        navigator.clipboard.writeText(text).then(() => {
            showToast(text);
        });

    } else {

        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(text);
    }
}


generate_Color_Btn.addEventListener(`click`, updatePalette);
updatePalette();
