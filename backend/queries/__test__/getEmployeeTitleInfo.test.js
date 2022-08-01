require("../../app");
const { getEmployeeTitleInfo } = require("../getEmployeeTitleInfo");

test("Test getEmployeetitleInfo query", async () => {
  const titleInfo = await getEmployeeTitleInfo("11021");
  expect(typeof titleInfo).toBe("object");
  expect(titleInfo[0]).toHaveProperty("emp_no", "from_date", "to_date", "title");
  expect(typeof titleInfo[0].title).toBe("string");
  expect(typeof titleInfo[0].emp_no).toBe("string");
  expect(typeof titleInfo[0].from_date).toBe("string");
  expect(typeof titleInfo[0].to_date).toBe("string");
});
