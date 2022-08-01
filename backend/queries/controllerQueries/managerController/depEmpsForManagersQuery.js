const { Employee, Title, DeptEmp } = require("../../../models/modelRelations");
const { Sequelize } = require("sequelize");
const ACTIVE_EMPLOYEE_TO_DATE = require("../../querieConstants");

module.exports.getDepartmentEmployees = async (deptNo) => {
  try {
    return await Employee.findAll({
      include: [
        {
          model: Title,
          attributes: ["title", "to_date"],
          required: true,
          where: Sequelize.where(Sequelize.fn("date", Sequelize.col("to_date")), "=", ACTIVE_EMPLOYEE_TO_DATE),
        },
        {
          model: DeptEmp,
          attributes: [],
          required: true,
          where: { dept_no: deptNo },
        },
      ],
      order: [["hire_date", "DESC"]],
    });
  } catch (e) {
    console.log(e);
  }
};
