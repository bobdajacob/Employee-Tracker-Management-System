import inquirer from 'inquirer';
// import db from 'db';

const main = async () => {
  const { options } = await inquirer.prompt ({ // forgot await and it didnt run in cli...
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee"],
  });
  
  if (options === 'View all departments') {
    await viewDepartments();
  } else if (options === 'View all roles') {
    await viewRoles();
  } else if (options === 'View all employees') {
    await viewEmployees();
  } else if (options === 'Add a department') {
    await addDepartment();
  } else if (options === 'Add a role') {
    await addRole();
  } else if (options === 'Add an employee') {
    await addEmployee();
  } else if (options === 'Update an employee') {
    await updateEmployee();
  } else {
    process.exit();
  }
};

  main();