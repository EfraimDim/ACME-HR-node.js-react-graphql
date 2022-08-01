const { Title } = require("../../../models/modelRelations");
const ACTIVE_EMPLOYEE_TO_DATE = require("../../querieConstants");

module.exports.addNewEmployeeTitle = async (empNum, role, currentDate) => {
  try {
    await Title.create({ emp_no: empNum, title: role, from_date: currentDate, to_date: ACTIVE_EMPLOYEE_TO_DATE });
  } catch (e) {
    console.log(e);
  }
};
