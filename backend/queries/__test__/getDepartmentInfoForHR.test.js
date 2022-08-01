require("../../app");
const { getDepartmentInfoForHR } = require("../getDepartmentInfoForHR");

test("Test getDepartmentInfoForHR query", async () => {
  const deptInfo = await getDepartmentInfoForHR();
  expect(typeof deptInfo).toBe("object");
  expect(deptInfo[0]).toHaveProperty("noEmp", "Departments.dept_no", "Departments.dept_name");
  expect(deptInfo[8]["Departments.dept_name"]).toBe("Customer Service");
  expect(deptInfo[8]["Departments.dept_no"]).toBe("d009");
});
