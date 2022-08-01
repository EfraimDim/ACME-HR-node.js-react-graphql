const { Salary } = require("../models/modelRelations");

module.exports.getEmployeeSalaryInfo = async (employeeID) => {
  try {
    return await Salary.findAll({
      where: {
        emp_no: employeeID,
      },
      order: [["to_date", "DESC"]],
    });
  } catch (e) {
    console.log(e);
  }
};
