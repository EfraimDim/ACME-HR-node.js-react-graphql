const { Department } = require("../../../models/modelRelations");

module.exports.addNewDepartment = async (deptNo, deptName) => {
  try {
    await Department.create({ dept_no: deptNo, dept_name: deptName });
  } catch (e) {
    console.log(e);
  }
};
