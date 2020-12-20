let section = document.querySelector('.column');
let input = document.querySelector('input');
let searchButton = document.querySelector("a.button");
let informations = document.querySelector('.informations');
let select = document.querySelector('select.limit');
let limit = 8;
let latitude = 45.795429157006346;
let longitude = 6.715087202217397;

for (let i = 4; i <= 20; i += 4) {
  let option = document.createElement("option")
  option.textContent = i;
  select.appendChild(option)
}

select.addEventListener("change", function () {
  if (input.value == "") {
    if (select.value == NaN) {
      limit = 8;
    } else {
      limit = select.value;
    }
    let latitude = 45.795429157006346;
    let longitude = 6.715087202217397;
    getWebcams("Les Contamines-Montjoie", latitude, longitude);
  } else {
    if (select.value == NaN) {
      limit = 8;
    } else {
      limit = select.value;
    }
    getWebcams(input.value, latitude, longitude);
  }
})

//http://127.0.0.1:5500/index.html 
//"https://api.windy.com/api/webcams/v2/list/country=FR/category=beach/orderby=popularity/limit=8?show=webcams:player&key=yQOnE7r9ViOUBnz4gaHzWOZmK751RHSm"
//const eventToGenerate = (array,e) => {
//           console.log(e);
//           console.log("input.value.toLowerCase():", input.value);
//           if (e.type == "click"||e.code=="Enter"){
//             for (let elements of array) {
//               if (input.value == elements.city) {
//                 section.innerHTML = "";
//                 latitude = elements.Latitude;
//                 longitude = elements.Longitude;
//                 console.log("latitude:", latitude);
//                 console.log("longitude:", longitude);
//                 getWebcams(latitude, longitude);
//               }
//             }
//           }
// }

const eventToGenerate = (array, e) => {
  if (e.type == "click" || e.code == "Enter") {
    let inputSplitted = new RegExp("^" + input.value.substring(0, 3), "gi");
    console.log('inputSplitted:', inputSplitted)

    for (let elements of array) {
      let pattern = new RegExp("^" + elements.city + "$", "gi");
      if (input.value.match(pattern)) {
        latitude = elements.Latitude;
        longitude = elements.Longitude;
        getWebcams(elements.city, latitude, longitude);

      } else if (input.value == "") {
        section.innerHTML = "";
        informations.textContent =
          "You did not write anything in the search bar. Please write something to find available webcams";

      } else {
        section.innerHTML = "";
        informations.textContent = input.value + " does not exist. Please check your spelling. "
        const selectEquivalent = document.createElement("select")
        // if (elements.city.match(inputSplitted)) {
        //   console.log('hzllo');
        //   let optionEquivalent = document.createElement("p");
        //   console.log('optionEquivalent:', optionEquivalent)
        //   optionEquivalent.textContent = "HELLO";
        //   console.log('optionEquivalent.textContent:', optionEquivalent.textContent)

        //   selectEquivalent.appendChild(optionEquivalent);
        //   console.log('selectEquivalent.appendChild(optionEquivalent);:', selectEquivalent.appendChild(optionEquivalent))
        // }
        // informations.appendChild(selectEquivalent);
      }
    }
  }
};


fetch("./assets/cities5000.json")
  .then((response) => response.json())
  .then((array) => {
    searchButton.addEventListener("click", function (e) {
      eventToGenerate(array, e);
    });
    input.addEventListener("keyup", function (e) {
      eventToGenerate(array, e);
    });
  })
  .catch((error) => {
    console.log("There was an error!", error);
  });


const getWebcams = (city, x, y) => {
  fetch(
    `https://api.windy.com/api/webcams/v2/list/orderby=popularity/nearby=${x},${y},10/limit=${limit}?show=webcams:player&key=yQOnE7r9ViOUBnz4gaHzWOZmK751RHSm`
  )
    .then((response) => response.json())
    .then((mainObject) => {
      console.log(mainObject);
      console.log(mainObject.result.webcams);
      section.innerHTML = "";
      informations.textContent = "";
      informations.textContent +=
        city + " has " + mainObject.result.total + " webcam(s) available";
      for (let webcamsObj of mainObject.result.webcams) {
        let webcamDiv = document.createElement("div");
        webcamDiv.classList.add("webcamDiv");

        let webcamTitle = document.createElement("h5");
        webcamTitle.classList.add("webcamTitle");
        webcamTitle.textContent = webcamsObj.title;

        let webcamEmbed = document.createElement("embed");
        webcamEmbed.type = "video/webm";
        webcamEmbed.classList.add("webcamsStyle");
        if (webcamsObj.player.live.available) {
          webcamEmbed.src = webcamsObj.player.live.embed;
        } else {
          webcamEmbed.src = webcamsObj.player.day.embed;
        }
        webcamDiv.appendChild(webcamEmbed);
        webcamDiv.appendChild(webcamTitle);
        section.appendChild(webcamDiv);
      }
      console.log(mainObject.result.webcams[0].player);
    })
    .catch((error) => {
      console.log("There was an error!", error);
    });
}
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

getWebcams("Les Contamines-Montjoie", latitude, longitude);