require("../../app");
const { getEmployeeDepartmentInfo } = require("../getEmployeeDepartmentInfo");

test("Test getEmployeeDepartmentInfo query", async () => {
  const deptInfo = await getEmployeeDepartmentInfo("10110");
  expect(typeof deptInfo).toBe("object");
  expect(deptInfo[0]).toHaveProperty("Department", "dept_no", "emp_no", "from_date", "to_date");
  expect(deptInfo[0].Department).toHaveProperty("dept_name");
  expect(typeof deptInfo[0].Department).toBe("object");
  expect(typeof deptInfo[0].dept_no).toBe("string");
  expect(typeof deptInfo[0].emp_no).toBe("string");
  expect(typeof deptInfo[0].from_date).toBe("string");
  expect(typeof deptInfo[0].to_date).toBe("string");
});
