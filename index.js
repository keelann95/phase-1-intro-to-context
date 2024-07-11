// Your code here
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(function(array) {
      return createEmployeeRecord(array);
    });
  }
  function createTimeInEvent(employeeRecord, dateTimeString) {
    let [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    let [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  function allWagesFor(employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    let totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
  }
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => totalPayroll + allWagesFor(employeeRecord), 0);
  }
  