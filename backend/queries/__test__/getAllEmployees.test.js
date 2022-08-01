require("../../app");
const { getAllEmployees } = require("../getAllEmployees");

test("Test getAllEmployees query", async () => {
  const colleagues = await getAllEmployees();
  expect(typeof colleagues).toBe("object");
  expect(colleagues[999]).toHaveProperty("emp_no", "birth_date", "first_name", "last_name", "gender", "hire_date", "Titles");
  expect(typeof colleagues[999].Titles).toBe("object");
  expect(typeof colleagues[999].emp_no).toBe("string");
  expect(typeof colleagues[999].birth_date).toBe("string");
  expect(typeof colleagues[999].first_name).toBe("string");
  expect(typeof colleagues[999].last_name).toBe("string");
  expect(typeof colleagues[999].gender).toBe("string");
  expect(typeof colleagues[999].hire_date).toBe("string");
});
