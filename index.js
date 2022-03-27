/* Your Code Here */

function createEmployeeRecord(array) {
    return {
        "firstName": array[0],
        "familyName": array[1],
        "title": array[2],
        "payPerHour": array[3],
        "timeInEvents": [],
        "timeOutEvents": []

    }
}

function createEmployeeRecords(arrays) {
    // Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
    let newArray = arrays.map(array => createEmployeeRecord(array))   
    return newArray
}

function createTimeInEvent(dateStamp) {
    // console.log("this", this)
    let array = dateStamp.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(array[1], 10),
        date: array[0]
    })
    return this
}

function createTimeOutEvent(dateStamp) {
    
    let splitDateStamp = dateStamp.split(" ")
    
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(splitDateStamp[1], 10),
        date: splitDateStamp[0]
    })

    return this
}

function hoursWorkedOnDate(formDate) {
    // console.log("this", this)
    // console.log("formDate", formDate)
    
    let timeIn = this.timeInEvents.find(element => {
        // console.log("element", element)
        return element.date === formDate
        
    })
    // console.log("timeIn", timeIn)
    
    let timeOut = this.timeOutEvents.find(element => {
        return element.date === formDate
    })
    // console.log("timeOut", timeOut)

    let hoursWorked = (timeOut.hour - timeIn.hour) / 100

    return hoursWorked
}

function wagesEarnedOnDate(dateForm) {
    // console.log("this", this)

    const hoursWorked = hoursWorkedOnDate.call(this, dateForm) 
    
    const payOwed = hoursWorked * this.payPerHour

    return payOwed
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    // console.log("srcArray", srcArray)
    // console.log("firstName", firstName)

    let findName = srcArray.find(name => {
        
        return name.firstName === firstName
        
    }) 
    return findName
}

function calculatePayroll(employeeArray) {
    // console.log(employeeArray)
    
    let initialValue = 0

    let payOwed = employeeArray.reduce((accumulator, currentEmployee) => {
        // console.log("accumulator", accumulator)
        return accumulator + allWagesFor.call(currentEmployee)
    }, initialValue) 

    // allWagesFor.call(this, employeeArray)

    return payOwed
}