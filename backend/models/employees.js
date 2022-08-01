const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelizeDatabaseConfig");

class Employee extends Model {}
Employee.init(
  {
    emp_no: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    birth_date: DataTypes.DATE,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    hire_date: DataTypes.DATE,
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Employee",
    tableName: "employees",
    underscore: true,
  }
);

module.exports = Employee;
