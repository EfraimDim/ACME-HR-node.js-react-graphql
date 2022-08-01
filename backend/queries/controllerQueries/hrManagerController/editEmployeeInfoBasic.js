const { Employee } = require("../../../models/modelRelations");

module.exports.editCurrentEmployeeBasicInfo = async (firstName, lastName, gender, birthDate, empNum, hireDate) => {
  try {
    await Employee.update(
      { birth_date: birthDate, first_name: firstName, last_name: lastName, gender: gender, hire_date: hireDate },
      {
        where: {
          emp_no: empNum,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
};
