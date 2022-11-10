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
    const response = await fetch(`${BASE_URL}/bodies?id=0`, {
        headers: {
            'x-zocom': `${API_KEY.key}`
        }
    });
    let planets = await response.json()
    console.log(planets)
    return planets;
    
}

for (let i = 0; i < planetsElem.length; i++) {
    planetsElem[i].addEventListener(`click`, async () => {
        await getKey()
        try {
            let planet = `${BASE_URL}/bodies?id=${i}`
            console.log(`hej`)
        }catch(err){
            console.log(`fel!!`)
        }
    })
}

getKey()






        