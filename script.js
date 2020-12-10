let section =document.querySelector('.columns');

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
console.log(mainplace.subPlaces[0].link);
webcamDiv.innerHTML=mainplace.subPlaces[0].link

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