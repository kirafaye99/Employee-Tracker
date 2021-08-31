const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./config/connection')

const userOptions = () => {
    inquirer.prompt([
        {
            name: 'options',
            type: 'list',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee Role',
                'Exit'
            ]
        }
    ])
    .then((selection) => {
        switch(selection.options) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add A Department':
                addADepartment();
                break;
            case 'Add A Role':
                addARole();
                break;
            case 'Add an Employee':
                addAnEmployee();
                break;
            case 'Update An Employee Role':
                updateRole();
                break;
            case 'Exit':
                connection.end();
                break;
            default:
                break;
        }
    });
}

const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', (error, input) => {
        if (error) throw error;
        console.table(input);
        userOptions();
    })
}

const viewAllRoles = () => {
    connection.query('SELECT * FROM roles', (error, input) => {
        if (error) throw error;
        console.table(input);
        userOptions;
    })
}

const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', (error, input) => {
        if (error) throw error;
        console.table(input);
        userOptions;
    })
}