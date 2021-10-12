class EmployeePayrllData {

    constructor(...params) {
        this.name = params[0];
        this.salary = params[1];
        this.gender = params[2];
        this.department = params[3];
        this.profile = params[4];
        this.notes = params[5];
        this.startDate = params[6];
    }

    set name(name) {
        let namrRegex = RegExp('^[A-Z]{1}[a-z]{3,}$')
        if (namrRegex.test(name))
            this._name = name;
        else throw 'Name is Incorect'
    }

    set startDate(startDate) {
        var today = new Date();
        const oneMonthBefore = new Date(today.setDate(today.getDate()-30))
        console.log(oneMonthBefore.toLocaleDateString)
        today = new Date();
        if (today < startDate || startDate < oneMonthBefore ) throw "Start date is invalid";
        else this._startDate = startDate;
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
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = this.startDate === undefined ? "undefined" :
            this.startDate.toLocaleDateString("en-US", options);
        return "name= " + this.name + ", salary= " + this.salary + ", gender= " + this.gender + ", department=" + this.department + ", profile=" + this.profile + ", startDate= " + empDate;
    }

}


let employeePayrllDataArr = new Array();

save = () => {
    let department = document.querySelector('input[name=department]:checked');
    if (department === null)
        alert("check any department")
    else {
        try {
            let employeePayrllData = createEmployeePayroll();
            createAndUpdateStorage(employeePayrllData);
        }
        catch (e) {
            return;
        }

    }
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


function createAndUpdateStorage(employeePayrllData) {
    var employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrllList"));

    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrllData)
    }
    else {
        employeePayrollList = [employeePayrllData]
    }

    alert(employeePayrllData.tostring())
    localStorage.setItem("EmployeePayrllList", JSON.stringify(employeePayrollList))
    alert("saved successfully")
    resetForm();
}

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]')
    unsetSelectedValues('[name=gender]')
    unsetSelectedValues('[name=department]')
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2020');
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