console.log('Scripts/client.js loaded.');
$(onReady);

//define global variables
let employees = []; //array to store object of employees

//funciton to run code after the site loads
function onReady () {
    
    console.log('Scripts/jquery.js loaded.');

    //add event handlers
    $('#addEmployeeButton').on('click', () => {
        
        //add check to make sure the form is valid
        addEmployee();
    });
    
}

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
