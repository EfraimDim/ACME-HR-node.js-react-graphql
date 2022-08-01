require("../../../../app");
const { editCurrentEmployeeBasicInfo } = require("../editEmployeeInfoBasic");
const { createEmployee } = require("../../../../testFunctions/beforeEachTest");
const { destroyeEmployee } = require("../../../../testFunctions/afterEachTest");

beforeEach(async () => {
  await createEmployee();
});

afterEach(async () => {
  await destroyeEmployee();
});

test("Test editCurrentEmployeeBasicInfo query", async () => {
  await editCurrentEmployeeBasicInfo("New", "Name", "F", "1992-01-01", "8888888", "1980-01-01");
});
