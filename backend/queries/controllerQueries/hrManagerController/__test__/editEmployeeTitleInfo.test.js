require("../../../../app");
const { editCurrentEmployeeTitleInfo } = require("../editEmployeeTitleInfo");
const { createEmployee } = require("../../../../testFunctions/beforeEachTest");
const { destroyeEmployee } = require("../../../../testFunctions/afterEachTest");

beforeEach(async () => {
  await createEmployee();
});

afterEach(async () => {
  await destroyeEmployee();
});

test("Test editCurrentEmployeeTitleInfo query", async () => {
  await editCurrentEmployeeTitleInfo("8888888", "2022-03-03");
});
