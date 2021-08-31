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
                // 'Exit'
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
            // case 'Exit':
            //     connection.end();
            //     break;
            // default:
            //     break;
        }
    });
};


//"view all ..." functions

const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', (error, input) => {
        if (error) throw error;
        console.table(input);
        userOptions();
    })
};

const viewAllRoles = () => {
    connection.query('SELECT * FROM roles', (error, input) => {
        if (error) throw error;
        console.table(input);
        userOptions();
    })
};

const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', (error, input) => {
        if (error) throw error;
        console.table(input);
        userOptions();
    })
};

//"add ..." functions

const addADepartment = () => {
    inquirer.prompt([
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

const addARole = () => {
    inquirer.prompt([
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

const addAnEmployee = () => {
    inquirer.prompt([
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

const updateRole = () => {
    inquirer.prompt([
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