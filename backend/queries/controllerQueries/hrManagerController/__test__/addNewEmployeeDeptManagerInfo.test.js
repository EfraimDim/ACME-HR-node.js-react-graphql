require("../../../../app");
const { addNewEmployeeDeptManager } = require("../addNewEmployeeDeptManagerInfo");
const { createEmployee } = require("../../../../testFunctions/beforeEachTest");
const { destroyeEmployee } = require("../../../../testFunctions/afterEachTest");
const { DeptManager } = require("../../../../models/modelRelations");

beforeEach(async () => {
  await createEmployee();
});

afterEach(async () => {
  await destroyeEmployee();
  await DeptManager.destroy({
    where: {
      emp_no: "8888888",
    },
  });
});

test("Test addNewEmployeeDeptManager query", async () => {
  await addNewEmployeeDeptManager("8888888", "d001", "2022-02-02");
});
