const BASE_URL = `https://fathomless-shelf-54969.herokuapp.com`;
let API_KEY;
const planetsElem = document.querySelectorAll(`article`);

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
    const planets = await response.json()
    console.log(planets)
}


for (let i = 0; i < planetsElem.length; i++) {
    planetsElem[i].addEventListener(`click`, async () => {
        let id = i
        let planet = `${BASE_URL}/bodies/${id}`
        console.log(planet)
    }) 
}


getKey();
