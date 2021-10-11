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

    set name(name) {
        let namrRegex = RegExp('^[A-Z]{1}[a-z]{3,}$')
        if (namrRegex.test(name))
            this._name = name;
        else throw 'Name is Incorect'
    }

    set salary(salary) {
        let salaryRegex = RegExp('^[1-9]{1}[0-9]{0,}$')
        if (salaryRegex.test(salary)) {
            this._salary = salary;
        }
        else throw 'salary is Incorect'
    }

    set gender(gender) {
        let genderRegex = RegExp('^[M, F]$')
        if (genderRegex.test(gender)) {
            this._gender = gender;
        }
        else throw 'gender is Incorect'
    }

    set startDate(startDate) {
        this._startDate = startDate;
    }



    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = this.startDate === undefined ? "undefined" :
            this.startDate.toLocaleDateString("en-US", options);
        return "id= " + this.id + ", name= " + this.name + ", salary= " + this.salary + ", gender= " + this.gender + ", startDate= " + empDate;
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
