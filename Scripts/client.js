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

