const { Employee, DeptManager, Department } = require("../models/modelRelations");
const { Sequelize } = require("sequelize");
const ACTIVE_EMPLOYEE_TO_DATE = require("./querieConstants");

module.exports.getDepartmentManagerInfoForHR = async () => {
  try {
    return await DeptManager.findAll({
      include: [
        {
          model: Employee,
          attributes: ["first_name", "last_name", "emp_no"],
        },
      ],
      where: Sequelize.where(Sequelize.fn("date", Sequelize.col("to_date")), "=", ACTIVE_EMPLOYEE_TO_DATE),
    });
  } catch (e) {
    console.log(e);
  }
};
