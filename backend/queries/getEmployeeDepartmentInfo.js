const { DeptEmp, Department } = require("../models/modelRelations");

module.exports.getEmployeeDepartmentInfo = async (employeeID) => {
  try {
    return await DeptEmp.findAll({
      include: [
        {
          model: Department,
          attributes: ["dept_name"],
          required: true,
        },
      ],
      where: {
        emp_no: employeeID,
      },
      order: [["to_date", "DESC"]],
    });
  } catch (e) {
    console.log(e);
  }
};
