require("../../../../app");
const { addNewEmployeeDepartment } = require("../addNewEmployeeDepartmentInfo");
const { createEmployee } = require("../../../../testFunctions/beforeEachTest");
const { destroyeEmployee } = require("../../../../testFunctions/afterEachTest");

beforeEach(async () => {
    await createEmployee()
});

afterEach(async () => {
    await destroyeEmployee()
});

test("Test addNewEmployeeDepartment query", async () => {
  await addNewEmployeeDepartment("8888888", "d001", "2022-02-02");
});
