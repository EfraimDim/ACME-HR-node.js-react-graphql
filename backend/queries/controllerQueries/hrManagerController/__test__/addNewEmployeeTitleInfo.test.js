require("../../../../app");
const { addNewEmployeeTitle } = require("../addNewEmployeeTitleInfo");
const { createEmployee } = require("../../../../testFunctions/beforeEachTest");
const { destroyeEmployee } = require("../../../../testFunctions/afterEachTest");

beforeEach(async () => {
  await createEmployee();
});

afterEach(async () => {
  await destroyeEmployee();
});

test("Test addNewEmployeeTitle query", async () => {
  await addNewEmployeeTitle("8888888", "Senior Engineer", "2022-02-02");
});
