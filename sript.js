let bundeslandJson;
let filterLetters = [];

async function init() {
    await fetchBundeslaender();
    generateBoxes();
    checkLetters();
    generateFilters();
}

async function fetchBundeslaender() {
    const bundesland = await fetch(`bundesland.json`);
    bundeslandJson = await bundesland.json();
}

function generateBoxes() {
    let boxArea = document.getElementById('boxArea');
    boxArea.innerHTML = '';
    for (let i = 0; i < bundeslandJson.length; i++) {
        boxArea.innerHTML += /*html*/`
            <div class="boxOutside">
                <a href="${bundeslandJson[i].url}">
                    <div class="box text-start" id="box${i}">
                        <p class="boxTitle">${bundeslandJson[i].name}</p>
                        <p class="boxData">${bundeslandJson[i].population} Millionen</p>
                    </div>
                </a>
            </div>
        `;
    };
}

function checkLetters() {
    for (let i = 0; i < bundeslandJson.length; i++) {
        const firstLetter = bundeslandJson[i].name.charAt(0);
        if (filterLetters.includes(firstLetter) == false) {
            filterLetters.push(firstLetter);
        };
    };
}

function generateFilters() {
    const filterArea = document.getElementById('filterArea');
    for (let i = 0; i < filterLetters.length; i++) {
        filterArea.innerHTML += /*html*/`
                <div class="filter rounded-0 d-flex justify-content-center align-items-center fw-bold" onclick="filter('${filterLetters[i]}')">
                    <p>${filterLetters[i]}</p>
                </div>
        `;
    };
    filterArea.innerHTML += /*html*/`
        <div class="filter rounded-0 d-flex justify-content-center align-items-center fw-bold" onclick="generateBoxes()">
            <p>*</p>
        </div>
    `;
}

function filter(letter) {
    let boxArea = document.getElementById('boxArea');
    boxArea.innerHTML = '';
    for (let i = 0; i < bundeslandJson.length; i++) {
        if (letter == bundeslandJson[i].name.charAt(0)) {
            boxArea.innerHTML += /*html*/`
                <div class="boxOutside">
                    <a href="${bundeslandJson[i].url}">
                        <div class="box text-start" id="box${i}">
                            <p class="boxTitle">${bundeslandJson[i].name}</p>
                            <p class="boxData">${bundeslandJson[i].population} Millionen</p>
                        </div>
                    </a>
                </div>
            `;
        };
    };
}