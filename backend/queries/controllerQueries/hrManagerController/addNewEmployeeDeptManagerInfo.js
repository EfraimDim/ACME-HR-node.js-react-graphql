const { DeptManager } = require("../../../models/modelRelations");
const ACTIVE_EMPLOYEE_TO_DATE = require("../../querieConstants");

module.exports.addNewEmployeeDeptManager = async (empNum, department, currentDate) => {
  try {
    await DeptManager.create({ emp_no: empNum, dept_no: department, from_date: currentDate, to_date: ACTIVE_EMPLOYEE_TO_DATE });
  } catch (e) {
    console.log(e);
  }
};
