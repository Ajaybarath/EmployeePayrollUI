class EmployeePayrllData {

    constructor(...params) {
        this.name = params[1];
        this.salary = params[2];
        this.gender = params[3];
        this.department = params[4];
        this.profile = params[5];
        this.notes = params[6];
        this.startDate = params[7];
    }

    set name(name) {
        let namrRegex = RegExp('^[A-Z]{1}[a-z]{3,}$')
        if (namrRegex.test(name))
            this._name = name;
        else throw 'Name is Incorect'
    }

    set startDate(startDate) {
        this._startDate = startDate;
    }

}


let employeePayrllDataArr = new Array();

save = () => {
    let name = document.querySelector('#name').value;
    let department = new Array();
    department = document.querySelector('input[class=checkbox]:checked').value;
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

    let date = day + "-" + month + "-" + year;
    console.log(date)

    let empployeePayrollData = new EmployeePayrllData(name, salary, gender, department, profile, notes, date);

    employeePayrllDataArr.push(empployeePayrollData)

}
