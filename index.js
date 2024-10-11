import inquirer from 'inquirer';
import db from './connection.js';

function main() {
  inquirer.prompt ({
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
  })
  
  .then(res => {
    console.log(res.options);
    if (res.options === 'View all departments') {
      viewDepartments();
    } else if (res.options === 'View all roles') {
      viewRoles();
    } else if (res.options === 'View all employees') {
      viewEmployees();
    } else if (res.options === 'Add a department') {
      addDepartment();
    } else if (res.options === 'Add a role') {
      addRole();
    } else if (res.options === 'Add an employee') {
      addEmployee();
    } else if (res.options === 'Update an employee role') {
      updateEmployeeRole();
    } else {
      process.exit();
    }
  });
}

function viewDepartments() {
  db.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    main(); 
  }); 
}

function viewRoles() {
  db.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    
    main(); 
  }); 
}

function viewEmployees() {
  db.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    
    main(); 
  }); 
}

function addDepartment() {
  inquirer.prompt ({
    type: 'input',
    name: 'departmentName',
    message: 'What is the name of the department?',
    validate: input => input.trim() ? true : `Don't leave blank`,
  })
  .then(res => {
    const sql = 'INSERT INTO department (name) VALUES ($1)';
    db.query(sql, [res.departmentName], (err, res) => {
      if (err) {
        console.error(`There's an error adding the department`);
        return;
      }
      console.log('New department added successfully to the database!', res);
      main();
    });
  })
}

function addRole() {
  inquirer.prompt ([
  {
    type: 'input',
    name: 'roleName',
    message: 'What is the name of the role?',
    validate: input => input.trim() ? true : `Don't leave blank!`
  },
  {
    type: 'input',
    name: 'salaryRole',
    message: 'What is the salary of the role',
    validate: input => input.trim() ? true : `Don't leave blank!`,
  },
  {
    type: 'list',
    name: 'departmentRole',
    message: 'Which department does the role belong to?',
    choices: ['Engineering',
      'Finance', 
      'Legal', 
      'Sales',
      'Service'],
  }
])

  .then (res => {
    const departmentId = {
      'Engineering': 2,
      'Finance': 3,
      'Legal': 4,
      'Sales': 1,
      'Service': 5,
    };
    const transferredId = departmentId[res.departmentRole];

    const sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
    db.query(sql, [res.roleName, res.salaryRole, transferredId], (err, res) => {
      if (err) {
        console.error(`There's an error when adding the role`, err);
        return;
      }
      console.log('New role added successfully to the database!', res);
      main();
    });
  })
};

function addEmployee() {
  db.query(`SELECT * FROM role`, (err, roleRes) => {
    if (err) throw err;
    const roles = roleRes.rows.map(role => ({
      name: role.title,
      value: role.id
    }));
    db.query('SELECT * FROM employee', (err, employeeRes) => {
      if (err) throw err;
      const managers = employeeRes.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));

      managers.unshift({ name: 'None', value: null });
      inquirer.prompt ([
        {
          type: 'input',
          name: 'employeeFirstName',
          message: `What is the employee's first name?`,
        },
        {
          type: 'input',
          name: 'employeeLastName',
          message: `What is the employee's last name?`,
        },
        {
          type: 'list',
          name: 'employeeRole',
          message: `What is the employee's role?`,
          choices: roles,
        },
        {
          type: 'list',
          name: 'employeeManager',
          message: `Who is the employee's manager?`,
          choices: managers,
        },
      ])
  .then (res => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`
    db.query(sql, [res.employeeFirstName, res.employeeLastName, res.employeeRole, res.employeeManager], (err, res) => {
      if (err) {
            console.error(`There's an error adding the employee`, err);
            return;
          }
            console.log(`Added new employee to the database!`, res);
            main();
        });
      });
      });
    });
  };

    function updateEmployeeRole() {
      db.query(`SELECT * FROM employee`, (err, employeeRes) => {
        if (err) throw err;
        const employees = employeeRes.rows.map(employee => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,          
      }));
      db.query(`SELECT * FROM role`, (err, roleRes) => {
        if (err) throw err;

        const roles = roleRes.rows.map(role => ({
          name: role.title,
          value: role.id,
        }));
      
      inquirer.prompt ([
        {
          type: 'list',
          name: 'updateEmployeeNameRole',
          message: `Which employee's role do you want to update?`,
          choices: employees,
        },
        {
          type: 'list',
          name: 'newRoleId',
          message: ' Which role do you want to assign to the selected employee?',
          choices: roles,
        },
      ])
    .then(res => {
      const sql = `UPDATE employee SET role_id = $1 WHERE id = $2`;
      db.query(sql, [res.newRoleId, res.updateEmployeeNameRole], (err, updateRes) => {
        if (err) {
          console.error(`There's an error updating employee's role`, err);
          return;
        }
          console.log(`Updated the employee's new role successfully!`);
          main();
        });
      });
    });
  });
}

main();



// const departmentId = {
//   'Sales Lead': 1,
//   'Lead Engineer': 2,
//   'Account Manager': 3,
//   'Lawyer': 4,
//   'Customer Service': 5,
// };
// const managerId = {
//   'None':null,
//   'Jake Myers': 1,
//   'Mike Smith': 2,
//   'Blake Woods': 3,
//   'John Adams': 4 ,
// }
// const transferredRoleId = departmentId[res.employeeRole];
// const transferredManager = managerId[res.employeeManager];