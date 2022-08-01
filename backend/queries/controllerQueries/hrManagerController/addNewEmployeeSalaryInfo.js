const { Salary } = require("../../../models/modelRelations");
const ACTIVE_EMPLOYEE_TO_DATE = require("../../querieConstants");

module.exports.addNewEmployeeSalary = async (empNum, newSalary, newSalaryStartDate) => {
  try {
    await Salary.create({ emp_no: empNum, salary: newSalary, from_date: newSalaryStartDate, to_date: ACTIVE_EMPLOYEE_TO_DATE });
  } catch (e) {
    console.log(e);
  }
};
