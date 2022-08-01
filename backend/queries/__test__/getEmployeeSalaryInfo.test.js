require("../../app");
const { getEmployeeSalaryInfo } = require("../getEmployeeSalaryInfo");

test("Test getEmployeeSalaryInfo query", async () => {
  const salaryInfo = await getEmployeeSalaryInfo("11011");
  expect(typeof salaryInfo).toBe("object");
  expect(salaryInfo[0]).toHaveProperty("emp_no", "salary", "from_date", "to_date");
  expect(typeof salaryInfo[0].salary).toBe("string");
  expect(typeof salaryInfo[0].emp_no).toBe("string");
  expect(typeof salaryInfo[0].from_date).toBe("string");
  expect(typeof salaryInfo[0].to_date).toBe("string");
});
