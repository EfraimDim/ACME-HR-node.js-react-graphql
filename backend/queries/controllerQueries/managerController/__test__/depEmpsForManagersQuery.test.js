require("../../../../app");
const { getDepartmentEmployees } = require("../depEmpsForManagersQuery");

test("Test getDepartmentEmployees query", async () => {
  const depEmployees = await getDepartmentEmployees("d004");
  expect(typeof depEmployees).toBe("object");
  expect(depEmployees[40]).toHaveProperty("emp_no", "birth_date", "first_name", "last_name", "gender", "hire_date", "Titles");
  expect(typeof depEmployees[40].Titles).toBe("object");
  expect(typeof depEmployees[40].emp_no).toBe("string");
  expect(typeof depEmployees[40].birth_date).toBe("string");
  expect(typeof depEmployees[40].first_name).toBe("string");
  expect(typeof depEmployees[40].last_name).toBe("string");
  expect(typeof depEmployees[40].gender).toBe("string");
  expect(typeof depEmployees[40].hire_date).toBe("string");
});
