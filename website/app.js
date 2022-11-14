// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=<>&units=imperial";
/* Global Variables */
const url = "http://localhost:10";
const insideZipCode = document.getElementById("zip");
const insideFeelings = document.getElementById("feelings");
const insideContent = document.getElementById("content");
const insideDate = document.getElementById("date");
const insideTemp = document.getElementById("temp");
// appropriately handle all the errors
const catchingError = (error) => console.error("error => ", error);
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", clicking);
/* Function called by event listener */
function clicking() {
  //data object
  let data = {
    zipCode: insideZipCode.value,
    content: insideFeelings.value,
    date: new Date(),
  };

  allData(data.zipCode)
    //arrow function message when status is not succeeded
    .then((inside) => {
      if (inside.cod != 200) return alert(inside.message);
      //filling and posting data to server
      data.temp = inside.list[0].main.temp;
      postDataToServer(data);
    })
    .catch(catchingError);
}
/* Function to GET Web API Data zipCode*/
async function allData(zipCode) {
  return await (
    await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`
    )
  ).json();
}
/* Function to POST data */
async function postDataToServer(data) {
  let res = await fetch(`${url}/postData`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  //updating UI
  try {
    if (!res.ok) {
      alert("not succeeded");
      return;
    }
    res
      .json()
      .then((data) => {
        if (res.ok) updating();
        else alert("not succeeded");
      })
      .catch(catchingError);
  } catch (error) {
    catchingError(error);
  }
}
/* Function to GET Project Data */
async function updating() {
  let res = await fetch(`${url}/all`);
  //updating UI
  try {
    res
      .json()
      .then((data) => {
        insideDate.innerHTML = `Date : ${data.date}`;
        insideTemp.innerHTML = `Temp : ${data.temp}`;
        insideContent.innerHTML = `Feelings : ${data.content}`;
      })
      //catching Error
      .catch(catchingError);
  } catch (error) {
    catchingError(error);
  }
}
