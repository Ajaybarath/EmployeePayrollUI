
window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
    console.log("content loaded")
})

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th>"
        + "<th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr >";

    let empPayrollList = createEmployeePayrollJson();

    let innerHtml = `${headerHtml}`;

    for (const empPayrollData of empPayrollList) {

        innerHtml = ` ${innerHtml}
            <tr>
                <td>
                    <img src="${empPayrollData.profileUrl}" alt="" class="profile">
                </td>
                <td>${empPayrollData.name} </td>
                <td>${empPayrollData.gender}</td>
                <td>
                    ${getDepartmentHtml(empPayrollData.departMent)}
                </td>
                <td>${empPayrollData.salary}</td>
                <td>${empPayrollData.startDate}</td>
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