const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelizeDatabaseConfig");

class DeptManager extends Model {}

DeptManager.init(
  {
    emp_no: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    dept_no: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE,
  },
  {
    sequelize,
    timestamps: false,
    modelName: "DeptManager",
    tableName: "dept_manager",
    underscore: true,
  }
);
DeptManager.removeAttribute("id");

module.exports = DeptManager;
