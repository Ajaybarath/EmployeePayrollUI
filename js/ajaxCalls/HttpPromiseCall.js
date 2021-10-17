let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log("State changed called . Ready state: " + xhr.readyState + " State: " + xhr.status)
            if (xhr.readyState === 4) {
                if (xhr.status == 200 || xhr.status == 201) {
                    resolve(xhr.responseText);
                }
                else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    })
                    console.log("XHR failed")
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
    });

}

const getURL = "http://localhost:3000/employee/";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get user data: " + responseText)
    })
    .catch(error => console.log("Get Error status: " + JSON.stringify(error)))

const deleteURL = "http://localhost:3000/employee/1604589731061";
makePromiseCall("DELETE", deleteURL, false).then(responseText => {
    console.log("User deleted: " + responseText)
})
    .catch(error => console.log("Delete Error status: " + JSON.stringify(error)))


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
makePromiseCall("POST", postURL, true, empData)
    .then(responseText => {
        console.log("Post user data: " + responseText)
    })
    .catch(error => console.log("Post Error status: " + JSON.stringify(error)))

