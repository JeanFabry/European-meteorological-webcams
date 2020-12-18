let section = document.querySelector('.columns');
// let scripts = section.children;
// console.log('scripts:', scripts[2])

// const displayWebcam =()=>{

// }

// for (let mainplace of webcams){
//     const webcamsDiv = document.createElement("div");
//     webcamsDiv.classList.add("column");
//     webcamsDiv.classList.add("is-one-quarter");

//     const webcamsDivTitle = document.createElement("h2");
//     webcamsDivTitle.textContent=mainplace.mainPlace;

//     const webcamSelect = document.createElement("select")
//      const chooseLocation = document.createElement("option");
//       chooseLocation.textContent="Choisir Localisation";
//       webcamSelect.appendChild(chooseLocation);

// const webcamDiv = document.createElement("div");
// webcamDiv.classList.add("webcamDiv")
// const script = document.createElement("script");
// script.src=mainplace.subPlaces[0].link
// webcamDiv.appendChild(script);

//     webcamsDiv.appendChild(webcamsDivTitle);
//     webcamsDiv.appendChild(webcamSelect);
//     webcamsDiv.appendChild(webcamDiv);
//     section.appendChild(webcamsDiv)
//     for (let subplace of mainplace.subPlaces){
//       const webcamChoice = document.createElement("option");
//       webcamChoice.textContent=subplace.subPlace;
//       webcamSelect.appendChild(webcamChoice);

//       webcamChoice.addEventListener("click", displayWebcam)
//     }

// }

fetch(
        //"https://api.windy.com/api/webcams/v2/list/country=FR/category=beach/orderby=popularity/limit=8?show=webcams:player&key=yQOnE7r9ViOUBnz4gaHzWOZmK751RHSm"
        "https://api.windy.com/api/webcams/v2/list/nearby=45.814568245813724,6.722398313598164,10/?show=webcams:player&key=yQOnE7r9ViOUBnz4gaHzWOZmK751RHSm"
    )
    .then((response) => response.json())
    .then((mainObject) => {
        console.log(mainObject);
        console.log(mainObject.result.webcams);
        for (let webcamsObj of mainObject.result.webcams) {
            let webcamEmbed = document.createElement("embed");
            webcamEmbed.type = "video/webm";
            webcamEmbed.classList.add("webcamsStyle")
            if (webcamsObj.player.live.available) {
                webcamEmbed.src = webcamsObj.player.live.embed
            } else {
                webcamEmbed.src = webcamsObj.player.day.embed
            }
            section.appendChild(webcamEmbed);
            console.log('webcamEmbed:', webcamEmbed)
            
        }
        console.log(mainObject.result.webcams[0].player);


        /* <embed src="https://webcams.windy.com/webcams/public/embed/player/1301219390/day" type="video/webm"  width="250"
               height="200"></embed> */

    });