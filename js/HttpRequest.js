let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function makeAjaxCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log("State changed called . Ready state: " + xhr.readyState + " State: " + xhr.status)
        if (xhr.readyState === 4) {
            if (xhr.status == 200 || xhr.status == 201) {
                callback(xhr.responseText);
            }
            else {
                console.log("Handle 400 client error or 500 server error")
            }
        }
    }

    xhr.open(methodType, url, async);
    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send();
    }

    console.log(methodType + " request sent to the server");
}

const getURL = "http://localhost:3000/employee";
function getUserDetails(data) {
    console.log("Get user Data : " + data)
}
makeAjaxCall("GET", getURL, getUserDetails, true)

const deleteURL = "http://localhost:3000/employee/1604589731061";
function userDeleted(data) {
    console.log("user deleted: " + data)
}
makeAjaxCall("DELETE", deleteURL, userDeleted, false);

const postURL = "http://localhost:3000/employee";
const empData = {
    "name": "test",
    "gender": "male",
    "departMent": [
      "HR"
    ],
    "salary": "30000",
    "startDate": "1 Jan 2020",
    "notes": "",
    "id": 1604589731061,
    "profileUrl": "../assets/profile-images/Ellipse -3.png"
  }

function userAdded(data) {
    console.log("user Added: " + data)
}
makeAjaxCall("POST", postURL, userAdded, true, empData);
