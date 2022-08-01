require("../../../../app");
const { editCurrentEmployeeDepartmentInfo } = require("../editEmployeeDepartmentInfo");
const { createEmployee } = require("../../../../testFunctions/beforeEachTest");
const { destroyeEmployee } = require("../../../../testFunctions/afterEachTest");

beforeEach(async () => {
  await createEmployee();
});

afterEach(async () => {
  await destroyeEmployee();
});

test("Test editCurrentEmployeeDepartmentInfo query", async () => {
  await editCurrentEmployeeDepartmentInfo("8888888", "2022-02-02");
});
