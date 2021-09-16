/* Global Variables */
const openWeatherAppApiKey = "d393766ea183b145c44a75f5a49e4d34",
  openWeatherMapURL = "https://api.openweathermap.org/data/2.5/weather?";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear(); // *_ getMonth is zero based, which means it strats by zero and ends by 11. So it should be icreased by one.

// functions start
/**
 * @description - Fetch Information about temprature using the 'open weather map' website api
 * @param {String} apiBaseUrl - Base URL of openWeatherMap API
 * @param {Integer}  userZipCode - User zip code
 * @param {String} apiKey - API key
 * @returns {Object} tempInfoResp.json() - The weather information for the zipcode entered by user
 */
async function fetchTempInfo(apiBaseUrl, userZipCode, apiKey) {
  let tempInfoResp = await fetch(
    `${apiBaseUrl}zip=${userZipCode}&appid=${apiKey}`
  );
  return await tempInfoResp.json();
}

/**
 * @description - POST temprature that was GOT from openWeatherMap API along with the current date and user response
 * @param {String} postAPIPath - The path used to post data through.
 * @param {Object} dataToSend - The object that contains the data which should be sent to the server. These data are 'area temperature', 'current date', 'user response'
 */

async function postDataToServer(postAPIPath, dataToSend) {
  let postResp = await fetch(postAPIPath, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });
}

/**
 * @description - GET the data object from the server and update the UI
 */

async function updateUserInterface() {
  let dataResp = await fetch("/tempData"),
    retrivedDataObject = await dataResp.json();
  date.innerText = retrivedDataObject.newDate;
  temp.innerText = retrivedDataObject.temperature;
  content.innerText = retrivedDataObject.userRespns;
}

/**
 * @description - Validate the form then run a chain of promises to get temperature information and update the UI according to it
 * @param {Object} event - The click event object
 */

function generateEvnetListener(event) {
  event.preventDefault();
  let enteredUserZipCode = zip.value,
    userRespns = feelings.value;
  if (!enteredUserZipCode || !userRespns) {
    console.log("Not valid");
    return;
  }
  fetchTempInfo(openWeatherMapURL, enteredUserZipCode, openWeatherAppApiKey)
    .then((recievedData) => {
      let temperature = recievedData.main.temp;
      postDataToServer("/addData", { temperature, newDate, userRespns });
    })
    .then(() => {
      updateUserInterface();
    })
    .catch((err) => {
      console.log(err);
    });
}
// functions end
// event listeners
generate.addEventListener("click", generateEvnetListener);
