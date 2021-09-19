/* Global Variables */
const openWeatherApppersApiKey =
    "d393766ea183b145c44a75f5a49e4d34&units=metric",
  openWeatherMapURL = "https://api.openweathermap.org/data/2.5/weather?";
let modes = ["loading", "error", "loaded"],
  mode = 0;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear(); // *_ Note: getMonth is zero based, which means it strats by zero and ends by 11. So it should be icreased by one.

// functions start
/**
 * @description - Change the site mode
 * @param {Integer} currentMode - Its value is (0 for loading), (1 for error), or (2 for loaded)
 */
function changeMode(currentMode = mode) {
  mode = currentMode;
  entry.className = "holder entry " + modes[mode];
}

/**
 * @description - Fetch Information about temprature using the 'open weather map' website api
 * @param {String} apiBaseUrl - Base URL of openWeatherMap API
 * @param {Integer}  userZipCode - User zip code
 * @param {String} persApiKey - API key
 * @returns {Object} tempInfoResp.json() - The weather information for the zipcode entered by user
 */
async function fetchTempInfo(apiBaseUrl, userZipCode, persApiKey) {
  let tempInfoResp = await fetch(
      `${apiBaseUrl}zip=${userZipCode}&appid=${persApiKey}`
    ),
    jsonRespData = await tempInfoResp.json();
  if (jsonRespData.cod != 200) {
    throw new Error(jsonRespData.message);
  }
  return jsonRespData;
}

/**
 * @description - POST temprature that was GOT from openWeatherMap API along with the current date and user response
 * @param {String} postAPIPath - The path used to post data through.
 * @param {Object} dataToSend - The object that contains the data which should be sent to the server. These data are 'area temperature', 'current date', 'user response'
 */

async function postGotDataToServer(postAPIPath, dataToSend) {
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

async function updateUIWithRetrivedData() {
  let dataResp = await fetch("/tempData"),
    retrivedDataObject = await dataResp.json();
  date.innerHTML = retrivedDataObject.newDate;
  temp.innerHTML = retrivedDataObject.temperature + " <sup>o</sup>C";
  content.innerHTML = retrivedDataObject.userRespns;
}

/**
 * @description - Validate the form then run a chain of promises to get temperature information and update the UI according to it
 * @param {Object} event - The click event object
 */

function generateEvnetListener(event) {
  event.preventDefault();
  let enteredUserZipCode = zip.value,
    userRespns = feelings.value;
  changeMode(0);
  if (!enteredUserZipCode) {
    setTimeout(() => {
      changeMode(1);
      err.innerText = "Empty ZipCode is not valid!";
    }, 500);
    return;
  }
  fetchTempInfo(openWeatherMapURL, enteredUserZipCode, openWeatherApppersApiKey)
    .then((recievedData) => {
      let temperature = recievedData.main.temp;
      postGotDataToServer("/addData", { temperature, newDate, userRespns });
    })
    .then(() => {
      updateUIWithRetrivedData();
      changeMode(2);
    })
    .catch((errr) => {
      err.innerText = errr;
      changeMode(1);
    });
}
// functions end
// event listeners
generate.addEventListener("click", generateEvnetListener);
