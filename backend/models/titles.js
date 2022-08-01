const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelizeDatabaseConfig");

class Title extends Model {}
Title.init(
  {
    emp_no: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    from_date: {
      type: DataTypes.DATE,
      primaryKey: true,
    },
    to_date: DataTypes.DATE,
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Title",
    tableName: "titles",
    underscore: true,
  }
);

Title.removeAttribute("id");

module.exports = Title;
