const { Employee, Title, DeptEmp, Salary } = require("../../../models/modelRelations");
const ACTIVE_EMPLOYEE_TO_DATE = require("../../querieConstants");

module.exports.addNewEmployee = async (newEmployee) => {
  try {
    const { firstName, lastName, gender, birthDate, empNum, role, department, hireDate, salary } = newEmployee;
    await Employee.create({ emp_no: empNum, birth_date: birthDate, first_name: firstName, last_name: lastName, gender: gender, hire_date: hireDate });
    await Title.create({ emp_no: empNum, title: role, from_date: hireDate, to_date: ACTIVE_EMPLOYEE_TO_DATE });
    await DeptEmp.create({ emp_no: empNum, dept_no: department, from_date: hireDate, to_date: ACTIVE_EMPLOYEE_TO_DATE });
    await Salary.create({ emp_no: empNum, salary: salary, from_date: hireDate, to_date: ACTIVE_EMPLOYEE_TO_DATE });
  } catch (e) {
    console.log(e);
  }
};
