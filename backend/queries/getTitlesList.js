const { Title } = require("../models/modelRelations");
const { Sequelize } = require("sequelize");

module.exports.getTitlesList = async () => {
  try {
    return await Title.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("title")), "title"]],
    });
  } catch (e) {
    console.log(e);
  }
};
