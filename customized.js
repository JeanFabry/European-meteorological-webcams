
//--------------------- General variables ---------------
let section = document.querySelector(".columns");
let numberOfDivs = 8;
let limit = 20;
let latitude = 45.795429157006346;
let longitude = 6.715087202217397;
let numberWebcams = document.querySelector(".numberWebcams");
let addButton = document.querySelector(".add");
let removeButton = document.querySelector(".remove");



// ------------------ Main functions & algorithms -------

   //--- adding of an amount of Webcam sections dynamically--

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

 // -------------- Using the searching bar -----------
const eventToGenerate = (array, e, input, webcamDiv) => {
  if (e.type == "click" || e.code == "Enter" || e.code == "Go") {
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

// ------ fetching and incorporating the player from API-----
const getWebcams = (city, x, y, webcamDiv) => {
  fetch(
    `https://api.windy.com/api/webcams/v2/list/orderby=popularity/nearby=${x},${y},10/limit=${limit}?show=webcams:player&key=yQOnE7r9ViOUBnz4gaHzWOZmK751RHSm`
  )
    .then((response) => response.json())
    .then((mainObject) => {
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
    })
    .catch((error) => {
      console.log("There was an error!", error);
    });
};

//------------------ Onload page with default webcams------------------------------

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

// ------- Bottom section - button ------------------
numberWebcams.addEventListener("keyup", function (e) {
  if (e.code == "Enter" || e.code == "Go") {
    section.innerHTML = "";
    numberOfDivs = numberWebcams.value;
    createCustomizedSection(numberOfDivs);
  }
});

addButton.addEventListener("click", function (e) {
  createCustomizedSection(1);
});


removeButton.addEventListener("click", function (e) {
  let sectionLastChild = section.lastElementChild;
  section.removeChild(sectionLastChild);
});