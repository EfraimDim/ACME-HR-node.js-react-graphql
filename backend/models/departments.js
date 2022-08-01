const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelizeDatabaseConfig");

class Department extends Model {}

Department.init(
  {
    dept_no: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    dept_name: DataTypes.STRING,
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Department",
    tableName: "departments",
    underscore: true,
  }
);
module.exports = Department;
