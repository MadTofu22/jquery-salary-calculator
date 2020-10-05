console.log('Scripts/client.js loaded.');
$(onReady);

//define global variables
let totalSalary = 0;
let monthlyTotal = 0;
let employees = [];

//funciton to run code after the site loads
function onReady () {
    
    console.log('Scripts/jquery.js loaded.');

    //initial table fill of employees in global array
    for (let employee of employees) {
        displayEmployee(employee);
    }

    //initial display of monthly total salary
    displayMonthlyTotal();

    //add event handler to Add Employee button
    $('#addEmployeeButton').on('click', () => {
        
        if (validateForm()) {
            addEmployee();
            displayMonthlyTotal();
        }
        else {
            alert('Please fill all fields correctly.');
        }
    });
    
    //add event handler to the Delete buttons
    $('#employeeTable').children().children().children().children().on('click', event => {

        //get the row element from the parent tree of the button (tr > td > button) and delete the employee then update the monthly total
        let rowEle = $(event.target).parent().parent();
        deleteEmployee(rowEle);
        displayMonthlyTotal();
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
        addDataToRow(rowID, properties[i], values[i], i);
    }
    //add delete button to end of the table row
    let deleteButtonString = `<td class="empDeleteButton"><button id="delBtn${employees.indexOf(employee)}">Delete</button></td>`;
    $(`#${rowID}`).append(deleteButtonString);
}

//adds a table row to the employee data table in index.html
function addRowToTable (id) {

    let rowString = `<tr class="empData" id="${id}"></tr>`;
    $('#employeeTable').append(rowString);
}

//adds the data from an employee object to the row in index.html
function addDataToRow (id, prop, data, index) {

    let row = $(`#${id}`);

    //add check if property is salary to format with commas for display
    
    if (prop == 'annualSalary') {
        data = addCommasToNum(data.toString());
        data = '$' + data;
    }

    let tdString = `<td class="emp_${prop}Data" id="emp${index}${prop}Data">${data}</td>`;
    row.append(tdString);
}

//checks if all required input have data entered before accepting the submission
function validateForm() {

    let numOfPasses = 0;
    let inputList = $('.inputField');
  
    //iterate through the inputs and get a total number of passes
    inputList.each(index => {
  
        let input = inputList[index];
        if (validateInput(input)) {
            numOfPasses++;
        }
    });
        
    //check if the number of passes matches the total number of input then returns true/false
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
    
    //checks if the input is required, if not it counts as an auto pass
    if(isRequired) {
        //check to make sure the input is not blank
        if(inputVal !== "") {
            //checks if the current input being checked is the annualSalary
            if (($(inputEle).prop('id') === 'annualSalary')) {
                //check to make sure the annual salary input has no commas or letters
                if (inputVal == Number(inputVal)) {
                    return true;
                }
                else {
                    alert('Please only enter a number only.');
                }
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
    else {
        return true;
    }
}

//takes a string input and ensure the first letter is capitalized
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

//takes a string input and ensures there is a comma ever 3 digits to separate thousands, millions, billions, etc...
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

//updates the total salary and displays on the dom
function displayMonthlyTotal () {

    let monthlyTotalString = '';
    monthlyTotal = 0;
    totalSalary = 0;

    //iterate through the array and calculate the total monthly salaray
    for (let employee of employees) {
        totalSalary += employee.annualSalary;
    }

    monthlyTotal = Math.round(totalSalary/12);
    monthlyTotalString = addCommasToNum(monthlyTotal.toString());

    $('#monthlyTotal').text(`Monthly Total: $ ${monthlyTotalString}`);
    if (monthlyTotal >= 20000) {
        $('#monthlyTotal').addClass('overBudget');
    }
}

//removes an employee from the global array, removes the employee data from the table, and recalculate the monthly total
function deleteEmployee (row) {

    //get the employees array index from the row id and remove the employee from the array
    let employeeIndex = Number(row.prop('id').slice(6)); //removes empRow and converts to a number
    employees.splice(employeeIndex, 1);

    //delete the row from the table on the DOM
    $(row).remove();
}