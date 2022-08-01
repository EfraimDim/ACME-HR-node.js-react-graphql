const Employee = require("./employees");
const Department = require("./departments");
const DeptEmp = require("./deptEmployee");
const DeptManager = require("./deptManager");
const Salary = require("./salaries");
const Title = require("./titles");

Employee.hasMany(Salary, {
  foreignKey: "emp_no",
});
Salary.belongsTo(Employee, {
  foreignKey: "emp_no",
});
Employee.hasMany(Title, {
  foreignKey: "emp_no",
});
Title.belongsTo(Employee, {
  foreignKey: "emp_no",
});
Employee.hasMany(DeptEmp, {
  foreignKey: "emp_no",
});
Employee.hasMany(DeptManager, {
  foreignKey: "emp_no",
});
DeptManager.belongsTo(Employee, {
  foreignKey: "emp_no",
});
DeptEmp.belongsTo(Employee, {
  foreignKey: "emp_no",
});
Department.hasMany(DeptEmp, {
  foreignKey: "dept_no",
});
Department.hasMany(DeptManager, {
  foreignKey: "dept_no",
});
DeptManager.belongsTo(Department, {
  foreignKey: "dept_no",
});
DeptEmp.belongsTo(Department, {
  foreignKey: "dept_no",
});

Department.belongsToMany(Employee, { through: DeptEmp, foreignKey: "dept_no" });
Employee.belongsToMany(Department, { through: DeptEmp, foreignKey: "emp_no" });

Department.belongsToMany(Employee, { through: DeptManager, foreignKey: "dept_no" });
Employee.belongsToMany(Department, { through: DeptManager, foreignKey: "emp_no" });

module.exports = { Employee, Salary, DeptEmp, DeptManager, Department, Title };
