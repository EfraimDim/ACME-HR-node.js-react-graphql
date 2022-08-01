const { Employee, Department, DeptEmp, DeptManager } = require("../models/modelRelations");
const { Sequelize } = require("sequelize");
const ACTIVE_EMPLOYEE_TO_DATE = require("./querieConstants");

module.exports.getDepartmentInfoForHR = async () => {
  try {
    return await Employee.findAll({
      include: [
        {
          model: Department,
          attributes: ["dept_no", "dept_name"],
          through: {
            model: DeptEmp,
            attributes: [],
            where: Sequelize.where(Sequelize.fn("date", Sequelize.col("to_date")), "=", ACTIVE_EMPLOYEE_TO_DATE),
          },
        },
      ],
      attributes: [[Sequelize.fn("COUNT", Sequelize.col("Employee.emp_no")), "noEmp"]],
      raw: true,
      group: "Departments.dept_no",
      order: [[Department, "dept_no", "ASC"]],
    });
  } catch (e) {
    console.log(e);
  }
};
