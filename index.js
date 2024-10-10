import inquirer from 'inquirer';
import db from './connection.js';

function main() {
  inquirer.prompt ({
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee"],
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
    } else if (res.options === 'Update an employee') {
      updateEmployee();
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
    // console.log('Department Name:', res.departmentName);
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
    choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service']
  }])
  .then(res => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
    db.query(sql, [res.roleName, res.salaryRole, res.departmentRole], (err, res) => {
      if (err) {
        console.error(`There's an error when adding the role`, err);
        return;
      }
      console.log('New role added successfully to the database!', res);
      main();
    });
  })
};

main();