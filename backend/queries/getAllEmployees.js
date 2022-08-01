const { Employee, Title } = require("../models/modelRelations");
const { Sequelize } = require("sequelize");
const ACTIVE_EMPLOYEE_TO_DATE = require("./querieConstants");

module.exports.getAllEmployees = async (limit, cursor) => {
  try {
    return await Employee.findAll({
      include: [
        {
          model: Title,
          attributes: ["title", "to_date"],
          required: true,
          where: Sequelize.where(Sequelize.fn("date", Sequelize.col("to_date")), "=", ACTIVE_EMPLOYEE_TO_DATE),
        },
      ],
      order: [["hire_date", "DESC"]],
      limit: limit,
      offset: cursor
    });
  } catch (e) {
    console.log(e);
  }
};
