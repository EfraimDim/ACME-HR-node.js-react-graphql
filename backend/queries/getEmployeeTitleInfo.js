const { Title } = require("../models/modelRelations");

module.exports.getEmployeeTitleInfo = async (employeeID) => {
  try {
    return await Title.findAll({
      where: {
        emp_no: employeeID,
      },
      order: [["to_date", "DESC"]],
    });
  } catch (e) {
    console.log(e);
  }
};
