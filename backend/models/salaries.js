const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelizeDatabaseConfig");

class Salary extends Model {}
Salary.init(
  {
    emp_no: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    salary: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE,
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Salary",
    tableName: "salaries",
    underscore: true,
  }
);

Salary.removeAttribute("id");

module.exports = Salary;
