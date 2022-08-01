require("../../../app");
const { currentDepManager } = require("../checkAccessibilityQuery");

test("Test checkAccessibilityQuery query", async () => {
  const depManager = await currentDepManager("110228");
  expect(typeof depManager).toBe("object");
  expect(typeof depManager.dataValues).toBe("object");
  expect(depManager.dataValues).toHaveProperty("emp_no", "dept_no", "from_date", "to_date");
  expect(typeof depManager.dataValues.emp_no).toBe("string");
  expect(typeof depManager.dataValues.dept_no).toBe("string");
  expect(typeof depManager.dataValues.from_date).toBe("string");
  expect(typeof depManager.dataValues.to_date).toBe("string");
});
