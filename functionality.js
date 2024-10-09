import db from 'db';

const viewDepartments = async () => {
  const department = await db.getDepartment();
  console.table(department);
  main();
}

const viewRoles = async () => {
  const roles = await db.getRoles();
  console.table(roles);
  main();
}