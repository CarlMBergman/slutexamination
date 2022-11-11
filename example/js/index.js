const BASE_URL = `https://fathomless-shelf-54969.herokuapp.com`;
let API_KEY;
const planetsElem = document.querySelectorAll(`article`);
const planetInformation = document.querySelector(`footer`);
const solarSystem = document.querySelector(`main`)
let el;



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
                if (i === 0) {

                }
                if (i === 1) {
                    
                }
                if (i === 2) {
                    
                }
                if (i === 3) {
                    
                }
                if (i === 4) {
                    
                }
                if (i === 5) {
                    
                }
                if (i === 6) {
                    
                }
                if (i === 7) {
                    
                }
                if (i === 8) {
                    
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