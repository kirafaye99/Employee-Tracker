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
}