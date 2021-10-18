class EmployeePayrllData {

    constructor(...params) {
        this.name = params[0];
        this.salary = params[1];
        this.gender = params[2];
        this.department = params[3];
        this.profile = params[4];
        this.notes = params[5];
        this.startDate = params[6];
        this.id = params[7];
    }

    set name(name) {
        let namrRegex = RegExp('^[A-Z]{1}[a-z]{3,}$')
        if (namrRegex.test(name))
            this._name = name;
        else throw 'Name is Incorect'
    }

    set startDate(startDate) {
        var today = new Date();
        const oneMonthBefore = new Date(today.setDate(today.getDate() - 30))
        console.log(oneMonthBefore.toLocaleDateString)
        today = new Date();
        if (today < startDate || startDate < oneMonthBefore) throw "Start date is invalid";
        else {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };

            this._startDate = new Date(Date.parse(startDate)).toLocaleDateString("en-GB", options);
        }
    }

    set gender(gender) {
        this._gender = gender;
    }

    set department(department) {
        this._department = department;
    }

    set profile(profile) {
        this._profile = profile;
    }

    set notes(notes) {
        this._notes = notes;
    }

    set salary(salary) {
        this._salary = salary;
    }

    set id(id) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get salary() {
        return this._salary;
    }

    get gender() {
        return this._gender;
    }

    get startDate() {
        return this._startDate;
    }

    get department() {
        return this._department;
    }

    get profile() {
        return this._profile;
    }

    get notes() {
        return this._notes;
    }

    tostring() {

        return "name= " + this.name + ", salary= " + this.salary + ", gender= " + this.gender + ", department=" + this.department + ", profile=" + this.profile + ", startDate= " + this.startDate;
    }

}


let isUpdate = false;
let empIdToUpdate = 0;
let employeePayrollObj = {};


let employeePayrllDataArr = new Array();

window.addEventListener('DOMContentLoaded', (event) => {
    checkForUpdate();
})

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;

    employeePayrollObj = JSON.parse(employeePayrollJson);
    empIdToUpdate = employeePayrollObj.id;
    setForm();
}

save = (event) => {

    let department = document.querySelector('input[name=department]:checked');
    if (department === null)
        alert("check any department")
    else {
        try {
            setEmployeePayrollObject();

            if (siteProperties.use_local_storage == false) {
                createAndUpdateStorage();
                resetForm();
                localStorage.removeItem('editEmp')
                window.location.replace('../html/AppHomePage.html')
            }
            else {
                createOrUpdateEmployeePayroll();
            }
        }
        catch (e) {
            return;
        }

    }
}

const createOrUpdateEmployeePayroll = () => {

    let postUrl = "http://localhost:3000/employee/";
    let methodCall = "POST"
    if (isUpdate) {
        methodCall = "PUT";
        postUrl = "http://localhost:3000/employee/" + employeePayrollObj.id;
    }

    makePromiseCall(methodCall, postUrl, false, employeePayrollObj)
        .then(responseText => {
            console.log("Get user data: " + responseText)
            alert(employeePayrollObj.tostring())
            alert("saved successfully")
            resetForm();
            localStorage.removeItem('editEmp')
            window.location.replace('../html/AppHomePage.html')

        })
        .catch(error => {
            throw error;

        })

}

const setEmployeePayrollObject = () => {
    let name = document.querySelector('#name').value;
    let department = getSelectedValues('input[name=department]:checked');
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let salary = document.querySelector('#salary').value;
    let profile = document.querySelector('input[name="profile"]:checked').value;
    let day = document.querySelector("#day").value
    let month = document.querySelector("#month").value
    let year = document.querySelector("#year").value
    let notes = document.querySelector('#notes').value
    let date = new Date(day + "-" + month + "-" + year)
    let empId;
    if (isUpdate)  {
        empId = empIdToUpdate;
    }

    employeePayrollObj = new EmployeePayrllData(name, salary, gender, department, profile, notes, date, empId);
    console.log(employeePayrollObj)
}


const createEmployeePayroll = () => {
    let name = document.querySelector('#name').value;
    let department = getSelectedValues('input[name=department]:checked');
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let salary = document.querySelector('#salary').value;
    let profile = document.querySelector('input[name="profile"]:checked').value;
    let day = document.querySelector("#day").value
    let month = document.querySelector("#month").value
    let year = document.querySelector("#year").value
    let notes = document.querySelector('#notes').value
    console.log(name)
    console.log(gender)
    console.log(salary)
    console.log(department)
    console.log(profile)
    console.log(day + "/" + month + "/" + year)
    console.log(notes)

    let date = new Date(day + "-" + month + "-" + year)

    try {
        let empployeePayrollData = new EmployeePayrllData(name, salary, gender, department, profile, notes, date);
        return empployeePayrollData;
    }
    catch (e) {
        alert(e)
    }
}

const getSelectedValues = (propertyValue) => {
    let allItem = document.querySelectorAll(propertyValue);
    let selItem = [];

    allItem.forEach(item => {
        if (item.checked) selItem.push(item.value)
    });

    return selItem;
}


function createAndUpdateStorage() {
    var employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrllList"));
    let empPayrollData;
    if (employeePayrollList) {
        empPayrollData = employeePayrollList.find(empDate => empDate._id == employeePayrollObj._id);
        if (!empPayrollData) {
            employeePayrollList.push(employeePayrollObj)
        }
        else {
            const index = employeePayrollList.map(empData => empData._id)
                .indexOf(empPayrollData._id);
            employeePayrollList[index] = employeePayrollObj;
        }
    }
    else {
        employeePayrollList = [employeePayrollObj]
    }

    alert(employeePayrollObj.tostring())
    localStorage.setItem("EmployeePayrllList", JSON.stringify(employeePayrollList))
    alert("saved successfully")
    resetForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profile)
    setSelectedValues('[name=gender]', employeePayrollObj._gender)
    setSelectedValues('[name=department]', employeePayrollObj._department)
    setValue('#salary', employeePayrollObj._salary);
    setTextContent('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._notes);
    let date = employeePayrollObj._startDate.split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]')
    unsetSelectedValues('[name=gender]')
    unsetSelectedValues('[name=department]')
    setValue('#salary', '');
    setTextContent('.salary-output', '400000');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2021');
}

const setSelectedValues = (propertyValue, value) => {
    let allItem = document.querySelectorAll(propertyValue)
    allItem.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value) {
            item.checked = true;
        }
    })
}

const unsetSelectedValues = (propertyValue) => {
    let allItem = document.querySelectorAll(propertyValue)
    allItem.forEach(item => {
        item.checked = false;
    })
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setTextContent = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}


const createNewEmployeeId = () => {
    let empId = localStorage.getItem("EmployeeId");
    empId = !empId ? 1 : (empId + 1);
    localStorage.setItem("EmployeeId", empId);
    return empId;
}
