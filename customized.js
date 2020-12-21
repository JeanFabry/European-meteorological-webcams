
let section = document.querySelector(".columns");
let numberOfDivs = 8;
// console.log('section:', section)
// console.log('sectionCpouc:', section[0])
// let sectionChild = section.firstElementChild;
// console.log('sectionChild:', sectionChild)

// let input = document.querySelector("input");
// let searchButton = document.querySelector("a.is-info");
let limit = 20;
let latitude = 45.795429157006346;
let longitude = 6.715087202217397;
let numberWebcams = document.querySelector(".numberWebcams");
let addButton = document.querySelector(".add");



numberWebcams.addEventListener("keyup", function (e) {
  if (e.code == "Enter" || e.code == "Go") {
    section.innerHTML="";
    numberOfDivs = numberWebcams.value;
    createCustomizedSection(numberOfDivs);
  };
});


addButton.addEventListener("click", function (e) {
    createCustomizedSection(1);
});

// .webcam1 > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)


//http://127.0.0.1:5500/index.html
//"https://api.windy.com/api/webcams/v2/list/country=FR/category=beach/orderby=popularity/limit=8?show=webcams:player&key=yQOnE7r9ViOUBnz4gaHzWOZmK751RHSm"


const eventToGenerate = (array, e, input,webcamDiv) => {
  if (e.type == "click" || e.code == "Enter" || e.code == "Go") {
    let inputSplitted = new RegExp(
      "^" + input.value.substring(0, 3),
      "gi"
    );
    console.log("inputSplitted:", inputSplitted);

    for (let elements of array) {
      let pattern = new RegExp("^" + elements.city + "$", "gi");
      if (input.value.match(pattern)) {
        latitude = elements.Latitude;
        longitude = elements.Longitude;
        getWebcams(elements.city, latitude, longitude, webcamDiv);
      } else if (input.value == "") {
        webcamDiv.textContent =
          "You did not write anything in the search bar. Please write something to find available webcams.";
      } else {
        webcamDiv.textContent =
          input.value + " does not exist. Please check your spelling. ";
      }
    }
  }
};

const createCustomizedSection = (numberOfDivs) => {
  for (let i = 0; i < numberOfDivs; i++) {
    let addColumnDiv = document.createElement("div");
    addColumnDiv.classList.add("column");
    addColumnDiv.classList.add("warping");
    addColumnDiv.classList.add("is-one-quarter");

    let webcamsection = document.createElement("div");
    webcamsection.classList.add("webcamsection");

    let fieldDiv = document.createElement("div");
    fieldDiv.classList.add("field");
    fieldDiv.classList.add("has-addons");

    let controlDiv = document.createElement("div");
    controlDiv.classList.add("control");

    let inputInput = document.createElement("input");
    inputInput.classList.add("input");
    inputInput.classList.add("heightSearch");
    inputInput.type = "text";
    inputInput.placeholder = "Find any European city";

    let controlDivB = document.createElement("div");
    controlDivB.classList.add("control");

    let aButton = document.createElement("a");
    aButton.classList.add("button");
    aButton.classList.add("is-info");
    aButton.classList.add("heightSearch");
    aButton.textContent = "Search";

    let webcamDiv = document.createElement("div");
    webcamDiv.classList.add("webcamDiv");

    controlDiv.appendChild(inputInput);
    controlDivB.appendChild(aButton);
    fieldDiv.appendChild(controlDiv);
    fieldDiv.appendChild(controlDivB);
    webcamsection.appendChild(fieldDiv);
    webcamsection.appendChild(webcamDiv);
    addColumnDiv.appendChild(webcamsection);

    section.appendChild(addColumnDiv);

    fetch("./assets/cities5000.json")
      .then((response) => response.json())
      .then((array) => {
        aButton.addEventListener("click", function (e) {
          eventToGenerate(array, e, inputInput, webcamDiv);
        });
        inputInput.addEventListener("keyup", function (e) {
          eventToGenerate(array, e, inputInput, webcamDiv);
        });
      })
      .catch((error) => {
        console.log("There was an error!", error);
      });
  }
};



const getWebcams = (city, x, y, webcamDiv) => {
  fetch(
    `https://api.windy.com/api/webcams/v2/list/orderby=popularity/nearby=${x},${y},10/limit=${limit}?show=webcams:player&key=yQOnE7r9ViOUBnz4gaHzWOZmK751RHSm`
  )
    .then((response) => response.json())
    .then((mainObject) => {
      console.log(mainObject);
      console.log(mainObject.result.webcams);
      webcamDiv.innerHTML = "";

      let webcamTitle = document.createElement("h5");
      webcamTitle.classList.add("webcamTitle");
      webcamTitle.textContent = mainObject.result.webcams[0].title;

      let webcamEmbed = document.createElement("embed");
      webcamEmbed.type = "video/webm";
      webcamEmbed.classList.add("webcamsStyle");
      if (mainObject.result.webcams[0].player.live.available) {
        webcamEmbed.src = mainObject.result.webcams[0].player.live.embed;
      } else {
        webcamEmbed.src = mainObject.result.webcams[0].player.day.embed;
      }

      let selectAWebcam = document.createElement("select");
      let informations = document.createElement("option");
      informations.textContent =
        city + " has " + mainObject.result.total + " webcam(s) available";
      selectAWebcam.appendChild(informations);

      for (let i = 0; i < mainObject.result.webcams.length; i++) {
        let option = document.createElement("option");
        option.textContent = mainObject.result.webcams[i].title;
        selectAWebcam.appendChild(option);

        selectAWebcam.addEventListener("change", function (e) {
          if (selectAWebcam.value == mainObject.result.webcams[i].title){
            webcamTitle.textContent = mainObject.result.webcams[i].title;
            if (mainObject.result.webcams[i].player.live.available) {
              webcamEmbed.src = mainObject.result.webcams[i].player.live.embed;
            } else {
              webcamEmbed.src = mainObject.result.webcams[i].player.day.embed;
            }
          }
        });
      }

      webcamDiv.appendChild(selectAWebcam);
      webcamDiv.appendChild(webcamEmbed);
      webcamDiv.appendChild(webcamTitle);

      console.log(mainObject.result.webcams[0].player);
    })
    .catch((error) => {
      console.log("There was an error!", error);
    });
};

//-------------------- STARTING OF ------------------------------

for (let i = 0; i < numberOfDivs; i++) {
  let addColumnDiv = document.createElement("div");
  addColumnDiv.classList.add("column");
  addColumnDiv.classList.add("warping");
  addColumnDiv.classList.add("is-one-quarter");

  let webcamsection = document.createElement("div");
  webcamsection.classList.add("webcamsection");

  let fieldDiv = document.createElement("div");
  fieldDiv.classList.add("field");
  fieldDiv.classList.add("has-addons");

  let controlDiv = document.createElement("div");
  controlDiv.classList.add("control");

  let inputInput = document.createElement("input");
  inputInput.classList.add("input");
  inputInput.classList.add("heightSearch");
  inputInput.type = "text";
  inputInput.placeholder = "Find any European city";

  let controlDivB = document.createElement("div");
  controlDivB.classList.add("control");

  let aButton = document.createElement("a");
  aButton.classList.add("button");
  aButton.classList.add("is-info");
  aButton.classList.add("heightSearch");
  aButton.textContent = "Search";

  let webcamDiv = document.createElement("div");
  webcamDiv.classList.add("webcamDiv");
  fetch(
    `https://api.windy.com/api/webcams/v2/list/orderby=popularity/nearby=${latitude},${longitude},10/limit=${limit}?show=webcams:player&key=yQOnE7r9ViOUBnz4gaHzWOZmK751RHSm`
  )
    .then((response) => response.json())
    .then((mainObject) => {
      console.log(mainObject);
      console.log(mainObject.result.webcams);
      let webcamTitle = document.createElement("h5");
      webcamTitle.classList.add("webcamTitle");
      webcamTitle.textContent = mainObject.result.webcams[i].title;

      let webcamEmbed = document.createElement("embed");
      webcamEmbed.type = "video/webm";
      webcamEmbed.classList.add("webcamsStyle");
      if (mainObject.result.webcams[i].player.live.available) {
        webcamEmbed.src = mainObject.result.webcams[i].player.live.embed;
      } else {
        webcamEmbed.src = mainObject.result.webcams[i].player.day.embed;
      }

      let selectAWebcam = document.createElement("select");
      let informations = document.createElement("option");
      informations.textContent =
        "Contamines-Montjoie has " + mainObject.result.total + " webcam(s) available";
      selectAWebcam.appendChild(informations);

      for (let i = 0; i < mainObject.result.webcams.length; i++) {
        let option = document.createElement("option");
        option.textContent = mainObject.result.webcams[i].title;
        selectAWebcam.appendChild(option);

        selectAWebcam.addEventListener("change", function (e) {
          if (selectAWebcam.value == mainObject.result.webcams[i].title) {
            webcamTitle.textContent = mainObject.result.webcams[i].title;
            if (mainObject.result.webcams[i].player.live.available) {
              webcamEmbed.src = mainObject.result.webcams[i].player.live.embed;
            } else {
              webcamEmbed.src = mainObject.result.webcams[i].player.day.embed;
            }
          }
        });
      }

      webcamDiv.appendChild(selectAWebcam);
      webcamDiv.appendChild(webcamEmbed);
      webcamDiv.appendChild(webcamTitle);

      console.log(mainObject.result.webcams[0].player);
    })
    .catch((error) => {
      console.log("There was an error!", error);
    });

  controlDiv.appendChild(inputInput);
  controlDivB.appendChild(aButton);
  fieldDiv.appendChild(controlDiv);
  fieldDiv.appendChild(controlDivB);
  webcamsection.appendChild(fieldDiv);
  webcamsection.appendChild(webcamDiv);
  addColumnDiv.appendChild(webcamsection);

  section.appendChild(addColumnDiv);

  fetch("./assets/cities5000.json")
    .then((response) => response.json())
    .then((array) => {
      aButton.addEventListener("click", function (e) {
        eventToGenerate(array, e, inputInput, webcamDiv);
      });
      inputInput.addEventListener("keyup", function (e) {
        eventToGenerate(array, e, inputInput, webcamDiv);
      });
    })
    .catch((error) => {
      console.log("There was an error!", error);
    });
}

