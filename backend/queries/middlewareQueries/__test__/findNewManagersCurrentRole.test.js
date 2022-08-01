require("../../../app");
const { findNewManagersCurrentRole } = require("../findNewManagersCurrentRole");
const { createEmployee } = require("../../../testFunctions/beforeEachTest");
const { destroyeEmployee } = require("../../../testFunctions/afterEachTest");

beforeEach(async () => {
    await createEmployee();
  });
  
  afterEach(async () => {
    await destroyeEmployee();
  });
  
test("Test getDepartmentEmployees query", async () => {
  const titleInfo = await findNewManagersCurrentRole("8888888");
  expect(typeof titleInfo).toBe("object");
  expect(titleInfo).toHaveProperty("title", "to_date", "from_date", "emp_no");
  expect(titleInfo.title).toBe("staff");
  expect(titleInfo.emp_no).toBe("8888888");
  expect(titleInfo.to_date).toBe("9999-01-01");
});
