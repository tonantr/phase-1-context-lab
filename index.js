/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const createEmployeeRecord = function (arr) {
    const newEmployee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee
};

const createEmployeeRecords = function (arr) {
    const newEmployees = []
    for (let i = 0; i < arr.length; i++) {
        newEmployees.push(createEmployeeRecord(arr[i]))
    }
    return newEmployees
};

const createTimeInEvent = function (dateStamp) {
    let dateTime = dateStamp.split(' ')
    let element = this.timeInEvents.length
    this.timeInEvents[element] = {
        type: 'TimeIn',
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    }
    return this
};

const createTimeOutEvent = function (dateStamp) {
    let dateTime = dateStamp.split(' ')
    let element = this.timeOutEvents.length
    this.timeOutEvents[element] = {
        type: 'TimeOut',
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    }
    return this
};

const hoursWorkedOnDate = function (date) {
    let hoursWork = 0
    for (let i = 0; i < this.timeInEvents.length; i++) {
        if (this.timeInEvents[i].date === date && this.timeOutEvents[i].date === date) {
            hoursWork = (this.timeOutEvents[i]['hour'] - this.timeInEvents[i]['hour']) * .01
            return hoursWork
        }
    }
};

const wagesEarnedOnDate = function (date) {
    let hoursWork = hoursWorkedOnDate.call(this, date)
    return hoursWork * this.payPerHour
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
};

const findEmployeeByFirstName = function (arr, firstName) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].firstName === firstName) {
            return arr[i]
        } else {
            return undefined
        }
    }
};

const calculatePayroll = function (emps) {
    let sumAllWages = 0
    let allWages = 0
    for (let i = 0; i < emps.length; i++) {
        allWages = allWagesFor.apply(emps[i])
        sumAllWages = sumAllWages + allWages
    }
    return sumAllWages
};


