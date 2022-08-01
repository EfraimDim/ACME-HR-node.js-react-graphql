require("../../../../app");
const { getManagerOfEmployee } = require("../getManagerOfEmployee");

describe("Testing getManagerOfEmployee query", () => {
  test("Test getManagerOfEmployee query with correct dept_no", async () => {
    const deptManager = await getManagerOfEmployee("d006");
    expect(typeof deptManager).toBe("object");
    expect(deptManager).toHaveProperty("emp_no", "from_date", "to_date", "dept_no", "Employee");
    expect(typeof deptManager.Employee).toBe("object");
  });
  test("Test getManagerOfEmployee query with incorrect dept_no", async () => {
    const deptManager = await getManagerOfEmployee("d0001");
    expect(deptManager).toBe(null);
  });
});
