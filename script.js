const main = document.querySelector("main");
const active = document.querySelector(".open");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const characterAmountRange = document.getElementById("characterAmountRange");
const includeLowerCaseElement = document.getElementById("includeLowercase");
const includeUpperCaseElement = document.getElementById("includeUppercase");
const includeNumberElement = document.getElementById("includeNumber");
const includeSymbolsElement = document.getElementById("includeSymbols");

const inputPassword = document.getElementById("password");

const result = document.getElementById("result");


const generateEl = document.getElementById("generate");
const useEl = document.getElementById("use");




const LOWER_CHAR_CODES = arrayFromLowToHigh(97, 122);
const UPPER_CHAR_CODES = arrayFromLowToHigh(65, 90);
const NUMBERS_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOLS_CHAR_CODES = [...arrayFromLowToHigh(33, 47), ...arrayFromLowToHigh(58, 64), ...arrayFromLowToHigh(91, 96), ...arrayFromLowToHigh(123, 126)
];



active.addEventListener("click", () => {
    main.classList.add("active");
});

generateEl.addEventListener("click", () => {
    const characterAmount = characterAmountNumber.value;
    const includeLowerCase = includeLowerCaseElement.checked;
    const includeUpperCase = includeUpperCaseElement.checked;
    const includeNumbers = includeNumberElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const password = generatePassword(characterAmount, includeLowerCase, includeUpperCase, includeNumbers, includeSymbols);

    result.innerText = password
})

useEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = result.innerText;

    if (!password) {
        return
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    main.classList.remove("active");
    inputPassword.value = password;
    alert("Password copied to clipboard")
})


function generatePassword(characterAmount, includeLowerCase, includeUpperCase, includeNumbers, includeSymbols) {
    if (includeLowerCase === false &&
        includeUpperCase === false &&
        includeNumbers === false && 
        includeSymbols === false) {
            alert("check at least one");
        }
    let charCodes = [];
    if (includeLowerCase) charCodes = charCodes.concat(LOWER_CHAR_CODES);
    if (includeUpperCase) charCodes = charCodes.concat(UPPER_CHAR_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBERS_CHAR_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOLS_CHAR_CODES);

    const passwordCharacters = [];

    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join("");
}

characterAmountNumber.addEventListener("input", syncNumber);
characterAmountRange.addEventListener("input", syncNumber);

function syncNumber(e) {
    const characterLength = e.target.value;
    characterAmountNumber.value = characterLength;
    characterAmountRange.value = characterLength;
}

function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++){
        array.push(i)
    }
    return array;
}


 
//ASCII Characre Codes Table