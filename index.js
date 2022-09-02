const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1',
  database: 'company_db'
});

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
    if (answers.list === 'View All Employees'){
      viewAllEmployees()
    }  else if (answers.list === 'Add Employee') {
      addEmployee();
    } else if (answers.list === 'Update Employee Role') {
      updateEmployee()
    } else if(answers.list === 'View All Roles'){
      viewAllRoles()
    } else if (answers.list === 'Add Role') {
      addRole();
    } else if (answers.list === 'View All Departments') {
      viewAllDepartments()
    } else if(answers.list === 'Add Department') {
      addDepartment()
    } else {
      connection.end()
    }
  });

  function viewAllEmployees() {
    connection.query('SELECT * FROM employee;', function (err, results, fields) {
      console.table(results);
      start();
    });
  };

  function addEmployee() {
    let roleList = [];
    let roleListName = []

    connection.query("SELECT * FROM role;", function (err, result, fields) {
      for (let i = 0; i < result.length; i++){
        roleList.push(result[i])
        roleListName.push(result[i].title)
      }
    });

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
        choices: roleListName
      },
      {
        type: 'list',
        name: 'employeeManager',
        message: 'What is the employee\'s manager?',
        choices: [0]
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
      let employeeFirstNameInput = answers.employeeFirstName;
      let employeeLastNameInput = answers.employeeLastName;
      let employeeRoleInput = answers.employeeRole;
      let employeeManagerInput = answers.employeeManager;


      let roleId;

      roleList.forEach(role => {
        if(role.title === employeeRoleInput){
          roleId = role.id;
        }
      })

      let employeeInput = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employeeFirstNameInput}', '${employeeLastNameInput}', '${roleId}', '${employeeManagerInput}')`;

      connection.query(employeeInput, (err, result) => {
        if (err) throw err;
      })
      if (answers.list === 'View All Employees'){
        viewAllEmployees()
      }  else if (answers.list === 'Add Employee') {
        addEmployee();
      } else if (answers.list === 'Update Employee Role') {
        updateEmployee()
      } else if(answers.list === 'View All Roles'){
        viewAllRoles()
      } else if (answers.list === 'Add Role') {
        addRole();
      } else if (answers.list === 'View All Departments') {
        viewAllDepartments()
      } else if(answers.list === 'Add Department') {
        addDepartment()
      } else {
        connection.end()
      }
    })
  };

  function updateEmployee() {
    let employeeToUpdate = [];

    connection.query("SELECT first_name, last_name FROM employee;", function (err, result, fields) {
      for (let i = 0; i < result.length; i++){
        employeeToUpdate.push(result[i])
        console.log(employeeToUpdate[i].first_name)
      }
    });
  };

  function viewAllRoles() {
    connection.query('SELECT * FROM role;', function (err, results, fields) {
      console.table(results);
      start();
    });
  };

  function addRole() {
    let departmentList = [];

      connection.query("SELECT * FROM department;", function (err, result, fields) {
        for (let i = 0; i < result.length; i++){
          departmentList.push(result[i])
        }
      });

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
          choices: departmentList
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
        let roleNameInput = answers.roleName;
        let salaryRoleInput = answers.salaryRole;
        let departmentRoleInput = answers.departmentRole;
      
        let departmentId;

        departmentList.forEach(department => {
          if(department.name === departmentRoleInput){
            departmentId = department.id;
          }
        })

        let roleInput = `INSERT INTO role (title, salary, department_id) VALUES ('${roleNameInput}', '${salaryRoleInput}', ${departmentId})`;

        connection.query(roleInput, (err, result) => {
          if (err) throw err;
        })

        if (answers.list === 'View All Employees'){
          viewAllEmployees()
        }  else if (answers.list === 'Add Employee') {
          addEmployee();
        } else if (answers.list === 'Update Employee Role') {
          updateEmployee()
        } else if(answers.list === 'View All Roles'){
          viewAllRoles()
        } else if (answers.list === 'Add Role') {
          addRole();
        } else if (answers.list === 'View All Departments') {
          viewAllDepartments()
        } else if(answers.list === 'Add Department') {
          addDepartment()
        } else {
          connection.end()
        }
      })
  };

function viewAllDepartments() {
  connection.query('SELECT * FROM department;', function (err, results, fields) {
    console.table(results);
    start()
  });


};

function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'What is the name of the department?'
        },
        // {
        //   type: 'list',
        //   name: 'list',
        //   message: 'What would you like to do?',
        //   choices: [
        //     'View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'
        //   ]
        // }

      ])
      .then((answers) => {
        let departmentNameInput = answers.departmentName;
        let departmentInput = `INSERT INTO department (name) VALUES ('${departmentNameInput}')`;
        connection.query(departmentInput, (err, result) => {
          if (err) throw err;
          start()
        })
      })
  };


function start() {
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
    if (answers.list === 'View All Employees'){
      viewAllEmployees()
    }  else if (answers.list === 'Add Employee') {
      addEmployee();
    } else if (answers.list === 'Update Employee Role') {
      updateEmployee()
    } else if(answers.list === 'View All Roles'){
      viewAllRoles()
    } else if (answers.list === 'Add Role') {
      addRole();
    } else if (answers.list === 'View All Departments') {
      viewAllDepartments()
    } else if(answers.list === 'Add Department') {
      addDepartment()
    } else {
      connection.end()
    }
  });
}