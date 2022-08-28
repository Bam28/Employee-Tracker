const inquirer = require('inquirer');

inquirer
  .prompt(
    {
      type: 'list',
      name: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'
      ]
    }
  )
  .then((answers) => {
    if (answers.list === 'Add Employee') {
      addEmployee();
    } else if (answers.list === 'Add Role') {
      addRole();
    } else if(answers.list === 'Add Department') {
      addDepartment()
    } else {
      console.log(answers)
    }
  });

  function viewAllEmployees() {};

  function addEmployee() {
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeFirstName',
        message: 'What is the employee\'s first name?'
      },
      {
        type: 'input',
        name: 'employeeLastName',
        message: 'What is the employee\'s last name?'
      },
      {
        type: 'list',
        name: 'employeeRole',
        message: 'What is the employee\'s role?',
        choices: ['None', 'More None']
      },
      {
        type: 'list',
        name: 'employeeManager',
        message: 'What is the employee\'s manager?',
        choices: ['None','More None']
      },
      {
        type: 'list',
        name: 'list',
        message: 'What would you like to do?',
        choices: [
          'View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'
        ]
      }
    ])
    .then((answers) => {
      if (answers.list === 'Add Employee') {
        addEmployee();
      } else if (answers.list === 'Add Role') {
        addRole();
      } else if(answers.list === 'Add Department') {
        addDepartment()
      } else {
        console.log(answers)
      }
    })
  };

  function updateEmployee() {};
  function viewAllRoles() {};

  function addRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'roleName',
          message: 'What is the name of the role?'
        },
        {
          type: 'input',
          name: 'salaryRole',
          message: 'What is the salary of the role?'
        },
        {
          type: 'list',
          name: 'departmentRole',
          message: 'Which department does the role belongs to',
          choices: ['None']
        },
        {
          type: 'list',
          name: 'list',
          message: 'What would you like to do?',
          choices: [
            'View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'
          ]
        }
      ])
      .then((answers) => {
        console.log(answers)
        if (answers.list === 'Add Employee') {
          addEmployee();
        } else if (answers.list === 'Add Role') {
          addRole();
        } else if (answers.list === 'Add Department') {
          addDepartment()
        } else {
          console.log(answers)
        }
      })
  };

  function viewAllDepartments() {};

  function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'What is the name of the department?'
        },
        {
          type: 'list',
          name: 'list',
          message: 'What would you like to do?',
          choices: [
            'View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'
          ]
        }

      ])
      .then((answers) => {
        console.log(answers)
        if (answers.list === 'Add Employee') {
          addEmployee();
        } else if (answers.list === 'Add Role') {
          addRole();
        } else if (answers.list === 'Add Department') {
          addDepartment()
        } else {
          console.log(answers)
        }
      })
  };