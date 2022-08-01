require("../../../../app");
const { Employee, Title, DeptEmp } = require("../../../../models/modelRelations");
const { addNewEmployee } = require("../addEmployee");

test("Test addNewEmployee query", async () => {
  const newEmployee = {firstName: "John", lastName: "Smith", gender: "M", birthDate: "1994-01-01", empNum: "7777777", role: "staff", department: "d003", hireDate: "1999-01-01", salary: "100000"}
  await addNewEmployee(newEmployee);
  await Employee.destroy({
    where: {
      emp_no: "7777777",
    },
  });
  await Title.destroy({
    where: {
      emp_no: "7777777",
    },
  });
  await DeptEmp.destroy({
    where: {
      emp_no: "7777777",
    },
  });
});
