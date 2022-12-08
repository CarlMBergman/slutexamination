// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXEL9NtaXEAzXJo0M7lHibBF4QbBOSkEg",
  authDomain: "solaris-f6c95.firebaseapp.com",
  projectId: "solaris-f6c95",
  storageBucket: "solaris-f6c95.appspot.com",
  messagingSenderId: "164463429902",
  appId: "1:164463429902:web:8a932b69a30fd42480af5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const favPlanetsList = document.querySelector('section')

async function saveFavPlanet(planets, i) {
    try {
        await addDoc(collection(db, 'favPlanets'), {
            planetName: planets[i].name,
            planetSize: planets[i].circumference,
            DistanceFromEarth: planets[i].distance
        })
    } catch (error) {
        console.log(error);
    }
}

async function removeFromDatabase(planetId) {
    try {
        await deleteDoc(doc(db, 'favPlanets', planetId))
    } catch (error) {
        console.log(error);
    }
}

function addRemoveClick() {
    const noFavBtns = document.querySelectorAll('.noFavBtn')

    noFavBtns.forEach((btn) => {
        btn.addEventListener('click', async (event) => {
            const planetId = event.target.getAttribute('data-planet-id');
            await removeFromDatabase(planetId)

            const planetsHide = document.querySelectorAll('.favPlanetDiv')
            planetsHide.forEach((div) => {
                div.remove()
             });
            getFavPlanets()
        })
    })
}

async function getFavPlanets() {
    const favPlanets = await getDocs(collection(db, 'favPlanets'));

    favPlanets.forEach((favPlanet) => {
        const elem = `
        <div class="favPlanetDiv">
            <h1>${favPlanet.data().planetName}</h1>
            <div class="${favPlanet.data().planetName}"></div>
            <button class="noFavBtn" data-planet-id="${favPlanet.id}">Remove planet from favourites</button>
        </div>    
            `
            favPlanetsList.insertAdjacentHTML('beforeend', elem)
    });
    addRemoveClick()
}

async function checkIfAlreadyFav(planets, i) {
    try {
        const planetNameQuery = query(collection(db, 'favPlanets'), where('planetName', '==', planets[i].name));
        const result = await getDocs(planetNameQuery);
        let resultName = {};

        result.forEach((planetName) => {
            console.log(planetName);
            resultName = planetName;
        });
        return resultName;
    } catch (error) {
        console.log(error);
    }
}

async function manageFavPlanets(planets, i) {
    const planetName = await checkIfAlreadyFav(planets, i)
    const planetId = planetName.id
    if (planetId) {
        alert('Already saved in favourites!')
    } else {
        saveFavPlanet(planets, i)
    }
}

export { saveFavPlanet, getFavPlanets, manageFavPlanets }