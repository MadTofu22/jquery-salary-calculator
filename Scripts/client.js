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

    displayEmployees();
    //add event handlers
    $('#addEmployeeButton').on('click', () => {
        
        //add check to make sure the form is valid
        addEmployee();
    });
    
}

//gets input from the html form, creates a new employee object, then adds that employee to the global array
function addEmployee () {

    //get employee input data from the form
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let empID = $('#empID').val();
    let title = $('#title').val();
    let annualSalary = $('#annualSalary').val();

    //create the new employee object and add it to the global array
    let newEmployee = {
        firstName, 
        lastName,
        empID,
        title,
        annualSalary
    };
    employees.push(newEmployee);
    
    //clear the input fields in html form
    $('.inputField').val('');
}

//iterates through the employee global array, formats the text, and adds the data to the table on the DOM
function displayEmployees () {

    for (let employee of employees) {
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
}

function addRowToTable (id) {

    let rowString = `<tr id="${id}"></tr>`;
    $('#employeeTable').append(rowString);
}

function addDataToRow (id, prop, data) {

    let row = $(`#${id}`);
    let tdString = `<td class="empData" class="${prop}Data">${data}</td>`;
    row.append(tdString);
}