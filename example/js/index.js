const BASE_URL = `https://fathomless-shelf-54969.herokuapp.com`;
let API_KEY;


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
    const data = await response.json()
    console.log(data)
}

getKey();
