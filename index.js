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



main();