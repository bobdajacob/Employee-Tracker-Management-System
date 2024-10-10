INSERT INTO department (name)
VALUES ('Sales'),
('Engineering'),
('Finance'),
('Legal'),
('Service');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 80000, 1),
('Lead Engineer', 100000, 2),
('Account Manager', 90000, 3),
('Lawyer', 80000, 4),
('Customer Service', 60000, 5)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jake', 'Myers', 2, 1),
('Mike', 'Smith', 1, 2),
('Blake', 'Woods', 4, 3),
('John', 'Adams', 3, 4)