const { Sequelize, Op } = require("sequelize");
const { Title } = require("../../models/modelRelations");
const ACTIVE_EMPLOYEE_TO_DATE = require("../querieConstants");

module.exports.findNewManagersCurrentRole = async (empNum) => {
  try {
    return await Title.findOne({
      where: {
        [Op.and]: [{ emp_no: empNum }, Sequelize.where(Sequelize.fn("date", Sequelize.col("to_date")), "=", ACTIVE_EMPLOYEE_TO_DATE)],
      },
    });
  } catch (e) {
    console.log(e);
  }
};
