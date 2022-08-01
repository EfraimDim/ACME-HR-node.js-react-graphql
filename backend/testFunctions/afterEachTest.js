const { Employee, Title, DeptEmp, Salary, DeptManager } = require("../models/modelRelations");

exports.destroyeEmployee = async () => {
  await Employee.destroy({
    where: {
      emp_no: "8888888",
    },
  });
  await Title.destroy({
    where: {
      emp_no: "8888888",
    },
  });
  await DeptEmp.destroy({
    where: {
      emp_no: "8888888",
    },
  });
  await Salary.destroy({
    where: {
      emp_no: "8888888",
    },
  });
  await DeptManager.destroy({
    where: {
      emp_no: "8888888",
    },
  });
};
