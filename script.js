"use strict";
// 1. Utility function to get DOM element from string

function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

///////////initialize added parameter by 0;///////////
let addedParamCount = 0;

///////////Initially Parameter box is hidden by default///////////
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

///////////clicking function on Parameter Radio button///////////
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

///////////Clicking function on Jason Radio button///////////
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "block";
  document.getElementById("parametersBox").style.display = "none";
});

///////////Clicking function on + button to add more parameters///////////
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${
      addedParamCount + 2
    }</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${
          addedParamCount + 2
        }" placeholder="Enter Parameter ${addedParamCount + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${
          addedParamCount + 2
        }" placeholder="Enter Parameter ${addedParamCount + 2} Value">
    </div>
    <button class="btn btn-primary mx-2 deleteParam"> - </button>
    </div>`;

  addedParamCount++;

  //////////////Convert the Element string to DOM node
  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);

  //////////////Clicking function on - button to remove added Parameter
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (const item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
});

////////////////////////Clicking Function on Submit Button///////////////////////////
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  document.getElementById("responseJsonText").innerHTML =
    "Please Wait... Fetching Response...";

  //Fetch User Values
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;
  /////////If use selects the params

  let data = {};
  if (contentType == "params") {
    for (let i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }

  ///////////////Log values for debugging
  console.log(url);
  console.log(requestType);
  console.log(contentType);
  console.log(data);

  ////////////////////////////If the requestType is GET ////////////////////////////
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responseJsonText").value = text;
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responseJsonText").value = text;
      });
  }
});
