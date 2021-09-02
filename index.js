const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./config/connection')

const {prompt} = require("inquirer");

function userOptions() {
// const uOptions = () => {
    prompt([
        {
            name: 'options',
            type: 'list',
            message: 'Please choose from the options:',
            choices: [
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add A Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add A Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Add An Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update An Employee Role',
                    value: 'UPDATE_ROLE'
                },
                // 'Exit'
            ]
        }
    ])
    .then((selection) => {
        const {options} = selection;
            if (options === 'VIEW_DEPARTMENTS') {
                viewAllDepartments();
            }
            if (options === 'VIEW_ROLES') {
                viewAllRoles();
            }
            if (options === 'VIEW_EMPLOYEES') {
                viewAllEmployees();
            }
            if (options === 'ADD_DEPARTMENT') {
                addADepartment();
            }
            if (options === 'ADD_ROLE') {
                addARole();
            }
            if (options === 'ADD_EMPLOYEE') {
                addAnEmployee();
            }
            if (options === 'UPDATE_ROLE') {
                updateRole();
            }
            // if (options === 'Exit') {
            //     connection.end();
            // }
    });
};
// };


//"view all ..." functions

function viewAllDepartments() {
    connection.query('SELECT * FROM department', (error, input) => {
        if (error) throw error;
        console.table(input);
        userOptions();
    })
};

function viewAllRoles() {
    connection.query('SELECT * FROM roles', (error, input) => {
        if (error) throw error;
        console.table(input);
        userOptions();
    })
};

function viewAllEmployees() {
    connection.query('SELECT * FROM employee', (error, input) => {
        if (error) throw error;
        console.table(input);
        userOptions();
    })
};

//"add ..." functions

function addADepartment() {
    prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What is the name of your department?',
        }
        .then((input) => {
            connection.query('INSERT INTO department SET department_name = ?', input.department,
            (error, input) => {
                if (error) throw error;
                console.table(input);
                userOptions();
            })
        })
    ])
};

function addARole() {
    prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the role?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of this role?',
        },
        {
            name: 'department',
            type: 'input',
            message: 'What department does this role belong to?',
        },
    ])
    .then((input) => {
        connection.query(
            'INSERT INTO roles SET title = ?, salary = ?, department_id = ?',
            [input.title, input.salary, input.department],
            (error, input) => {
                if (error) throw error;
                console.table(input);
                userOptions();
            }
        )
    })
};

function addAnEmployee() {
    prompt([
        {
            name: 'first',
            type: 'input',
            message: 'What is the first name of the employee?',
        },
        {
            name: 'last',
            type: 'input',
            message: 'What is the last name of the employee?',
        },
        {
            name: 'role',
            type: 'input',
            message: 'What is the role of the employee?',
        },
        {
            name: 'manager',
            type: 'input',
            message: 'Who is the manager of the employee?'
        }
    ])
    .then((input) => {
        connection.query(
            'INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?',
            [input.first, input.last, input.role, input.manager],
            (error, input) => {
                if (error) throw error;
                console.table(input);
                userOptions();
            }
        )
    })
};

// "update ..." function

function updateRole() {
    prompt([
        {
            name: 'role',
            type: 'input',
            message: 'What is the new role of the employee?',
        },
        {
            name: 'id',
            type: 'input',
            message: 'What is the ID number of the employee?',
        }
    ])
    .then((input) => {
        connection.query(
            'UPDATE employee SET role_id = ? WHERE id = ?',
            [input.role, input.id],
            (error, input) => {
                if (error) throw error;
                console.table(input);
                userOptions();
            }
        )
    })
};

userOptions();