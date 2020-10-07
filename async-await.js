// ASYNC - AWAIT

// Iteración 1

// Definimos dos variables para utilizar los endpoints de cada API

const astroUrl = "http://api.open-notify.org/astros.json";
const wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";
var isLoaded = false;

// Aquí escribiremos la función que hará las llamadas a las API
async function getProfiles() {
  const response = await fetch(astroUrl);
  const spaceInfo = await response.json();
  const astronautsArr = spaceInfo.people.map(async astronaut => {
    const newAstro = await fetch(wikiUrl + astronaut.name);
    const newAstroJ = await newAstro.json();
    newAstroJ.craft = astronaut.craft;
    return newAstroJ;
  });
  return Promise.all(astronautsArr);
}

// Iteración 2

function generateHTML(astronautsArr) {

  const peopleDiv = document.getElementById('people');
  let astroName, astroImg, astroCraft, astroDesc, astroExt, section;

  for(let i=0; i < astronautsArr.length; i++){

    section = document.createElement('section');
    peopleDiv.appendChild(section);
    
    astroName = astronautsArr[i].title;
    astroImg = astronautsArr[i].thumbnail.source;
    astroCraft = astronautsArr[i].craft;
    astroDesc = astronautsArr[i].description;
    astroExt = astronautsArr[i].extract;

    const br = document.createElement('br');
    const span = document.createElement('span');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    img.src = astroImg;
    const p1 = document.createElement('p', {class: "description"});
    const p2 = document.createElement('p', {class: "extract"});

    section.appendChild(br);

    section.appendChild(span);
    span.innerHTML = astroCraft;

    section.appendChild(h2);
    h2.innerHTML = astroName;

    section.appendChild(img);

    section.appendChild(p1);
    p1.innerHTML = astroDesc;

    section.appendChild(p2);
    p1.innerHTML = astroExt;
  }
  isLoaded = true; // Set is Loaded to True
}

// Iteración 3

window.addEventListener("load", () => {
  const viewPeople = document.getElementById("viewPeople");
    viewPeople.addEventListener("click", async() => {
      const profiles = await getProfiles();
      if(!isLoaded) { generateHTML(profiles); }
    });
});
