require("../../app");
const { getDepartmentManagerInfoForHR } = require("../getDepartmentManagerInfoForHR");

test("Test getDepartmentManagerInfoForHR query", async () => {
  const managerInfo = await getDepartmentManagerInfoForHR();
  expect(typeof managerInfo).toBe("object");
  expect(managerInfo[0]).toHaveProperty("Employee", "dept_no", "emp_no", "from_date", "to_date");
  expect(managerInfo[0].dept_no).toBe("d001");
  expect(managerInfo[0].to_date).toBe("9999-01-01");
  expect(managerInfo[0]["Employee"]).toHaveProperty("emp_no", "first_name", "last_name");
});
