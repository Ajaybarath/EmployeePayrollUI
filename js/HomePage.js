let empPayrollList;

window.addEventListener('DOMContentLoaded', (event) => {
    localStorage.removeItem('editEmp')
    getEmployeeDataFromServer();
    // document.querySelector(".emp-count").textContent = empPayrollList.length;
    console.log("content loaded")
})

const getEmployeeDataFromServer = () => {
    let getURL = siteProperties.server_url;
    makePromiseCall("GET", getURL, true)
        .then(responseText => {
            console.log("Get user data: " + responseText)
            empPayrollList = JSON.parse(responseText)
            createInnerHtml();

        })
        .catch(error => {
            console.log("Get Error status: " + JSON.stringify(error))
            empPayrollList = [{
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
            }];
            createInnerHtml();

        })

}

const getEmployeeDataFromLocalStorage = () => {
    return localStorage.getItem('EmployeePayrllList') ? JSON.parse(localStorage.getItem('EmployeePayrllList')) : [];
}

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th>"
        + "<th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr >";


    let innerHtml = `${headerHtml}`;

    for (const empPayrollData of empPayrollList) {

        innerHtml = ` ${innerHtml}
            <tr>
                <td>
                    <img src="${empPayrollData._profile}" alt="" class="profile">
                </td>
                <td>${empPayrollData._name} </td>
                <td>${empPayrollData._gender}</td>
                <td>
                    ${getDepartmentHtml(empPayrollData._department)}
                </td>
                <td>${empPayrollData._salary}</td>
                <td>${empPayrollData._startDate}</td>
                <td class="action-content">
                    <img src="../assets/icons/delete-black-18dp.svg" id="1" onclick="remove(this)" name="${empPayrollData.id}" alt="delete">
                        <img src="../assets/icons/create-black-18dp.svg" id="2" onclick="update(this)" name="${empPayrollData.id}" alt="delete">
                        </td>
            </tr>`;

    }

    document.querySelector('.table-main').innerHTML = innerHtml;
}

const getDepartmentHtml = (departmentList) => {
    let deptHtml = '';
    for (const dept of departmentList) {
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}

const createEmployeePayrollJson = () => {
    let empPayrollListLocal = [
        {
            "name": "mohit kumar new",
            "gender": "male",
            "departMent": [
                "HR",
            ],
            "salary": "30000",
            "startDate": "1 Jan 2020",
            "notes": "",
            "id": 1604589551457,
            "profileUrl": "../assets/profile-images/Ellipse 1.png"
        },
        {
            "name": "mohit kumar test",
            "gender": "male",
            "departMent": [
                "HR", "Finance"
            ],
            "salary": "30000",
            "startDate": "1 Jan 2020",
            "notes": "",
            "id": 1604589594363,
            "profileUrl": "../assets/profile-images/Ellipse 1.png"
        },
        {
            "name": "mohit",
            "gender": "male",
            "departMent": [
                "HR"
            ],
            "salary": "30000",
            "startDate": "1 Jan 2020",
            "notes": "",
            "id": 1604589699566,
            "profileUrl": "../assets/profile-images/Ellipse -3.png"
        },
        {
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
    ];

    return empPayrollListLocal;
}


const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData.id == node.name);
    if (!empPayrollData) return;

    const index = empPayrollList.map(empData => empData._id)
        .indexOf(empPayrollData._id);

    empPayrollList.splice(index, 1);

    if (siteProperties.use_local_storage == true) {
        localStorage.setItem("EmployeePayrllList", JSON.stringify(empPayrollList));
        createInnerHtml();
    }
    else {
        let deleteURL = "http://localhost:3000/employee/" + node.name;
        makePromiseCall("DELETE", deleteURL, false)
            .then(responseText => {
                console.log("User deleted: " + responseText + " id: " + node.name)
                createInnerHtml()

            })
            .catch(error => {
                console.log("Delete Error status: " + JSON.stringify(error))
                createInnerHtml()

            })
    }

}


window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeeDataFromLocalStorage();
    createInnerHtml();
    localStorage.removeItem('editEmp');
})


const update = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData.id == node.name);
    if (!empPayrollData) return;

    localStorage.setItem('editEmp', JSON.stringify(empPayrollData))
    window.location.replace("../html/EmployeePayrollForm.html")

}