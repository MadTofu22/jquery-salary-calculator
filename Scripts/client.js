console.log('Scripts/client.js loaded.');
$(onReady);

//define global variables
let employees = [
    {
        firsName: 'Jack',
        lastName: 'Stutler',
        empID: '002',
        title: 'Vice President',
        annualSalary: 1000000,    
    },
    {
        firsName: 'Jake',
        lastName: 'Brost',
        empID: '003',
        title: 'Sgt at Arms',
        annualSalary: 750000,    
    },
    {
        firsName: 'Chris',
        lastName: 'Drelling',
        empID: '003',
        title: 'Grunt',
        annualSalary: 7.50,    
    }
]; //array to store object of employees

//funciton to run code after the site loads
function onReady () {
    
    console.log('Scripts/jquery.js loaded.');

    //initial table fill of employees in global array
    for (let employee of employees) {
        displayEmployee(employee);
    }

    //add event handlers
    $('#addEmployeeButton').on('click', () => {
        
        if (validateForm()) {
            addEmployee();
        }
        else {
            alert('Please fill all fields.');
        }
    });
    
}

//gets input from the html form, creates a new employee object, then adds that employee to the global array
function addEmployee () {

    //get employee input data from the form
    let firstName = capFirstLetter($('#firstName').val());
    let lastName = capFirstLetter($('#lastName').val());
    let empID = $('#empID').val();
    let title = capFirstLetter($('#title').val());
    let annualSalary = Number($('#annualSalary').val());

    //create the new employee object and add it to the global array
    let newEmployee = {
        firstName, 
        lastName,
        empID,
        title,
        annualSalary
    };
    employees.push(newEmployee);
    displayEmployee(newEmployee);
    
    //clear the input fields in html form
    $('.inputField').val('');
}

//iterates through the employee global array, formats the text, and adds the data to the table on the DOM
function displayEmployee (employee) {

    //add the row to the table
    let rowID = `empRow${employees.indexOf(employee)}`;
    addRowToTable(rowID);

    //adds the data to the row
    let properties = Object.keys(employee);
    let values = Object.values(employee);
    for (let i=0; i < properties.length; i++) {
        addDataToRow(rowID, properties[i], values[i]);
    }
    //add delete button to end of the table row
    let deleteButtonString = `<td class="empData"><button id="delBtn${employees.indexOf(employee)}">Delete</button></td>`;
    $(`#${rowID}`).append(deleteButtonString);
}

//adds a table row to the employee data table in index.html
function addRowToTable (id) {

    let rowString = `<tr id="${id}"></tr>`;
    $('#employeeTable').append(rowString);
}

//adds the data from an employee object to the row in index.html
function addDataToRow (id, prop, data) {

    let row = $(`#${id}`);

    //add check if property is salary to format with commas for display

    let tdString = `<td class="empData" class="${prop}Data">${data}</td>`;
    row.append(tdString);
}

//checks if all required input have data entered before accepting the submission
function validateForm() {

    let numOfPasses = 0;
    let inputList = $('.inputField');
  
    inputList.each(index => {
  
      let input = inputList[index];
      if (validateInput(input)) {
        numOfPasses++;
      }
    });
  
    //console.log("in validateForm, numOfPasses:", numOfPasses);
  
    if(numOfPasses === inputList.length) {
      return true;
    }
    else {
      return false;
    }
}

//checks each individual input field to make sure it's valid
function validateInput(inputEle) {
  
    let isRequired = $(inputEle).prop("required");
    let inputVal = $(inputEle).val();
  
    //console.log("in validateInput, isRequired:", isRequired, "inputVal:", inputVal);
  
    if(isRequired) {
      if(inputVal !== "") {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return true;
    }
}

function capFirstLetter(string) {

    let newString = '';
  
    for (let index in string) {
      if (index === '0') {
        let firstLetter = string.charAt(index);
        newString = newString + firstLetter.toUpperCase();
        //console.log('first letter', firstLetter.toUpperCase());
      }
      else {
        newString += string.charAt(index);
      }
      //console.log('in capFirstLetter, newString:', newString, 'index', index);
    }
    return newString;
}
  
function addCommasToNum(string) {
  
    let numOfDigits = string.length;
    let newString = '';
  
    if (numOfDigits > 3){
      let numOfCommas = Math.floor(numOfDigits/3);
      let numOfPreCommaDigits = numOfDigits%3;
      let threeCount = 0;
      let index = 0;
  
      if (numOfPreCommaDigits === 0) {
        numOfCommas--;
      }
  
      let newLength = numOfDigits + numOfCommas;
  
      //console.log('in addCommasToNum, numOfDigits:', numOfDigits, 'newLength:', newLength);
  
      for (let i=0; i < newLength; i++) {
        if (i < numOfPreCommaDigits){
          newString += string.charAt(index);
          index++;
        }
        else if ((i === numOfPreCommaDigits && i !== 0) || threeCount === 3){
          newString += ',';
          threeCount = 0;
        }
        else {
          newString += string.charAt(index);
          index++;
          threeCount++;
        }
        //console.log('in addCommasToNum loop, i', i, 'index:', index, 'threeCount:', threeCount, 'newString:', newString);
      }
      return newString;
    }
    else {
      return string;
    }
}