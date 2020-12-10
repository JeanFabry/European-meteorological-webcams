let section =document.querySelector('.columns');
let scripts = section.children;
console.log('scripts:', scripts[0])

const displayWebcam =()=>{

}

for (let mainplace of webcams){
    const webcamsDiv = document.createElement("div");
    webcamsDiv.classList.add("column");
    webcamsDiv.classList.add("is-one-quarter");

    const webcamsDivTitle = document.createElement("h2");
    webcamsDivTitle.textContent=mainplace.mainPlace;

    const webcamSelect = document.createElement("select")
     const chooseLocation = document.createElement("option");
      chooseLocation.textContent="Choisir Localisation";
      webcamSelect.appendChild(chooseLocation);
    
const webcamDiv = document.createElement("div");
webcamDiv.classList.add("webcamDiv")
const script = document.createElement("script");
script.src=mainplace.subPlaces[0].link
webcamDiv.appendChild(script);

    webcamsDiv.appendChild(webcamsDivTitle);
    webcamsDiv.appendChild(webcamSelect);
    webcamsDiv.appendChild(webcamDiv);
    section.appendChild(webcamsDiv)
    for (let subplace of mainplace.subPlaces){
      const webcamChoice = document.createElement("option");
      webcamChoice.textContent=subplace.subPlace;
      webcamSelect.appendChild(webcamChoice);

      webcamChoice.addEventListener("click", displayWebcam)
    }
    
}