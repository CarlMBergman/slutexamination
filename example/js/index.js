const BASE_URL          = `https://fathomless-shelf-54969.herokuapp.com`;
let API_KEY;
const planetsElem       = document.querySelectorAll(`article`);
const planetInformation = document.querySelector(`footer`);
const solarSystem       = document.querySelector(`main`)
let el;
const planetInInfo      = document.querySelector(`#planetInInformation`)


async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, {method: 'POST'})
    API_KEY = await response.json();
    console.log(API_KEY)
    getPlanets();
}

async function getPlanets() {
    const response = await fetch(`${BASE_URL}/bodies`, {
        headers: {
            'x-zocom': `${API_KEY.key}`
        }
    });
    let planets = await response.json()
    console.log(planets)
    for (let i = 0; i < planetsElem.length; i++) {
        planetsElem[i].addEventListener(`click`, async () => {
            planetInformation.classList.remove(`hide`)
            solarSystem.classList.add(`hide`)
            el = `
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
            for (let index = 0; index < moons.length; index++) {
                let moon = `<p class="moon">${planets.bodies[i].moons[index]}</p>`
                document.querySelector(`#moons`).insertAdjacentHTML(`beforeend`, moon)  
            }
            
                console.log(planets.bodies[i])
                if (planets.bodies[i].name === `Solen`) {
                    planetInInfo.style.backgroundColor = "rgba(255, 208, 41, 1)";
                    planetInInfo.style.boxShadow = "0 0 0 50px rgba(255, 208, 41, 0.1), 0 0 0 100px rgba(255, 208, 41, 0.06)";
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
                }
                else if (planets.bodies[i].name === `Uranus`) {
                    planetInInfo.style.backgroundColor = "rgba(201, 212, 241, 1)";
                    planetInInfo.style.boxShadow = "0 0 0 50px rgba(201, 212, 241, 0.1), 0 0 0 100px rgba(201, 212, 241, 0.06)";
                }
                else if (planets.bodies[i].name === `Neptunus`) {
                    planetInInfo.style.backgroundColor = "rgba(122, 145, 167, 1)";
                    planetInInfo.style.boxShadow = "0 0 0 50px rgba(122, 145, 167, 0.1), 0 0 0 100px rgba(122, 145, 167, 0.06)";
                }
        })
    }
}
getKey()


document.querySelector(`#rocketShip`).addEventListener(`click`, () => {
    planetInformation.classList.add(`hide`)
    solarSystem.classList.remove(`hide`)
    document.querySelector(`#information`).remove();
})