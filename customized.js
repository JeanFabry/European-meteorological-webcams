let section = document.querySelector(".column");
let input = document.querySelector("input");
let searchButton = document.querySelector("a.button");
let informations = document.querySelector(".informations");
let limit = 8;
let latitude = 45.795429157006346;
let longitude = 6.715087202217397;
let buttons = document.querySelectorAll("a.is-info")
console.log('buttons:', buttons)
let inputs = document.querySelectorAll("input.input")
console.log('inputs:', inputs)



// .webcam1 > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)


//http://127.0.0.1:5500/index.html
//"https://api.windy.com/api/webcams/v2/list/country=FR/category=beach/orderby=popularity/limit=8?show=webcams:player&key=yQOnE7r9ViOUBnz4gaHzWOZmK751RHSm"


const eventToGenerate = (array, e) => {
  if (e.type == "click" || e.code == "Enter") {
    let inputSplitted = new RegExp("^" + input.value.substring(0, 3), "gi");
    console.log("inputSplitted:", inputSplitted);

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
        informations.textContent =
          input.value + " does not exist. Please check your spelling. ";
        const selectEquivalent = document.createElement("select");
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
};

// getWebcams("Les Contamines-Montjoie", latitude, longitude);
