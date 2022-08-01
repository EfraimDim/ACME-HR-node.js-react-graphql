const { Sequelize, Op } = require("sequelize");
const { DeptManager, Employee } = require("../../../models/modelRelations");
const ACTIVE_EMPLOYEE_TO_DATE = require("../../querieConstants");

module.exports.getManagerOfEmployee = async (deptNo) => {
  try {
    return await DeptManager.findOne({
      include: [
        {
          model: Employee,
          attributes: ["first_name", "last_name"],
          required: true,
        },
      ],
      where: {
        [Op.and]: [{ dept_no: deptNo }, Sequelize.where(Sequelize.fn("date", Sequelize.col("to_date")), "=", ACTIVE_EMPLOYEE_TO_DATE)],
      },
    });
  } catch (e) {
    console.log(e);
  }
};
