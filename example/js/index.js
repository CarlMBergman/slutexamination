const BASE_URL          = `https://fathomless-shelf-54969.herokuapp.com`; // URL till api:n
const planetsElem       = document.querySelectorAll(`article`); // Hämtar mina planeter
const planetInformation = document.querySelector(`footer`); // Hämtar Informationssidan
const solarSystem       = document.querySelector(`main`); // Hämtar solsystemet
const planetInInfo      = document.querySelector(`#planetInInformation`); // Detta är planeten som syns på infosidan


async function getKey() { // Här hämtas nyckeln
    const response = await fetch(`${BASE_URL}/keys`, {method: 'POST'})
    const API_KEY = await response.json();
    console.log(API_KEY)
    return API_KEY;
}

async function getPlanets() {
    const API_KEY = await getKey()
    const response = await fetch(`${BASE_URL}/bodies`, {
        headers: {
            'x-zocom': `${API_KEY.key}` // Här låses API:n upp
        }
    });
    let planets = await response.json()
    console.log(planets)
    givePlanetInformation(planets)
}

async function givePlanetInformation(planets) {
    for (let i = 0; i < planetsElem.length; i++) { // Loopar igenom mina planeter och lägger ett click på dom
        planetsElem[i].addEventListener(`click`, () => {
            planetInformation.classList.remove(`hide`)
            solarSystem.classList.add(`hide`)
            updateUIInformation(planets, i);
            updatePlanetColors(planets, i)
            console.log(planets.bodies[i])
        })
    }
}


document.querySelector(`#rocketShip`).addEventListener(`click`, () => { // Klicka för att komma tillbaka till solsystemet, rensar även informationen om tidigare planet
    planetInformation.classList.add(`hide`)
    solarSystem.classList.remove(`hide`)
    document.querySelector(`#information`).remove();
})

function updateUIInformation(planets, i){  // Här skrivs all info ut
    let el = `
        <aside id="information">
            <div id="nameAndText">
                <h1>${planets.bodies[i].name}</h1>
                <h2>${planets.bodies[i].latinName}</h2>
                <p>${planets.bodies[i].desc}</p>
            </div>
            <hr />
            <div id="info">
                <div
                    id="
                circumference"
                >
                    <h4>OMKRETS</h4>
                    <p>${planets.bodies[i].circumference}</p>
                </div>
                <div id="fromSun">
                    <h4>KM FRÅN SOLEN</h4>
                    <p>${planets.bodies[i].distance}</p>
                </div>
                <div id="max">
                    <h4>MAX TEMPERATUR</h4>
                    <p>${planets.bodies[i].temp.day}</p>
                </div>
                <div id="min">
                    <h4>MIN TEMPERATUR</h4>
                    <p>${planets.bodies[i].temp.night}</p>
                </div>
            </div>
            <hr />
            <div id="moons">
                <h4>MÅNAR</h4>
            </div>
        </aside>`

    planetInformation.insertAdjacentHTML(`beforeend`, el)

    let moons = planets.bodies[i].moons
    for (let index = 0; index < moons.length; index++) { // Loopar igenom månarna och skriver ut dom en i varje grid fält
        let moon = `<p class="moon">${planets.bodies[i].moons[index]}</p>`
        document.querySelector(`#moons`).insertAdjacentHTML(`beforeend`, moon)
    }
}

function updatePlanetColors(planets, i){ // Här ändras färgen på planeten i infosidan
    if (planets.bodies[i].name === `Solen`) {
        planetInInfo.style.backgroundColor = "rgba(255, 208, 41, 1)";
        planetInInfo.style.boxShadow = "80px 0px 290px 0px #FFD029";
    }
    else if (planets.bodies[i].name === `Merkurius`) {
        planetInInfo.style.backgroundColor = "rgba(136, 136, 136, 1)";
        planetInInfo.style.boxShadow = "0 0 0 50px rgba(136, 136, 136, 0.1), 0 0 0 100px rgba(136, 136, 136, 0.06)";
    }
    else if (planets.bodies[i].name === `Venus`) {
        planetInInfo.style.backgroundColor = "rgba(231, 205, 205, 1)";
        planetInInfo.style.boxShadow = "0 0 0 50px rgba(231, 205, 205, 0.1), 0 0 0 100px rgba(231, 205, 205, 0.06)";
    }
    else if (planets.bodies[i].name === `Jorden`) {
        planetInInfo.style.backgroundColor = "#428ED4";
        planetInInfo.style.boxShadow = "0 0 0 50px rgba(66, 142, 212, 0.1), 0 0 0 100px rgba(66, 142, 212, 0.06)";
    }
    else if (planets.bodies[i].name === `Mars`) {
        planetInInfo.style.backgroundColor = "rgba(239, 95, 95, 1)";
        planetInInfo.style.boxShadow = "0 0 0 50px rgba(239, 95, 95, 0.1), 0 0 0 100px rgba(239, 95, 95, 0.06)";
    }
    else if (planets.bodies[i].name === `Jupiter`) {
        planetInInfo.style.backgroundColor = "rgba(226, 148, 104, 1)";
        planetInInfo.style.boxShadow = "0 0 0 50px rgba(226, 148, 104, 0.1), 0 0 0 100px rgba(226, 148, 104, 0.06)";
    }
    else if (planets.bodies[i].name === `Saturnus`) {
        planetInInfo.style.backgroundColor = "rgba(199, 170, 114, 1)";
        planetInInfo.style.boxShadow = "0 0 0 50px rgba(199, 170, 114, 0.1), 0 0 0 100px rgba(199, 170, 114, 0.06)";
        let saturnCircle = `<div id="saturnCircleBig"></div>`
        document.querySelector(`#information`).insertAdjacentHTML(`beforeend`, saturnCircle)
    }
    else if (planets.bodies[i].name === `Uranus`) {
        planetInInfo.style.backgroundColor = "rgba(201, 212, 241, 1)";
        planetInInfo.style.boxShadow = "0 0 0 50px rgba(201, 212, 241, 0.1), 0 0 0 100px rgba(201, 212, 241, 0.06)";
    }
    else if (planets.bodies[i].name === `Neptunus`) {
        planetInInfo.style.backgroundColor = "rgba(122, 145, 167, 1)";
        planetInInfo.style.boxShadow = "0 0 0 50px rgba(122, 145, 167, 0.1), 0 0 0 100px rgba(122, 145, 167, 0.06)";
    }
}

getPlanets();