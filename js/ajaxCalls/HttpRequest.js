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