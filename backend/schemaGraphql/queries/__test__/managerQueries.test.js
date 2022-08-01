const app = require("../../../app");
const request = require("supertest");
const { GET_EMPLOYEE_DETAILS_QUERY, GET_MY_DEPARTMENT_INFO_QUERY } = require("../../../../frontend/src/graphql/queries");

describe("Testing managers queries", () => {
  test("Test empInfo route with correct employee number", async () => {
    const empInfo = await request(app)
      .post("/graphql")
      .send({
        query: GET_EMPLOYEE_DETAILS_QUERY,
        variables: {
          empNo: "10100",
          accessibility: "hrManager",
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log(empInfo.body.data.getEmployeeDetails);
    expect(typeof empInfo.body.data.getEmployeeDetails).toBe("object");
    expect(empInfo.body.data.getEmployeeDetails.user).toBeDefined();
    expect(typeof empInfo.body.data.getEmployeeDetails.user).toBe("object");
    expect(empInfo.body.data.getEmployeeDetails.user).toHaveProperty("emp_no", "birth_date", "first_name", "last_name", "gender", "hire_date");
    expect(typeof empInfo.body.data.getEmployeeDetails.deptInfo).toBe("object");
    expect(empInfo.body.data.getEmployeeDetails.deptInfo[0]).toHaveProperty("Department", "dept_no", "emp_no", "from_date", "to_date");
    expect(typeof empInfo.body.data.getEmployeeDetails.deptInfo[0].Department).toBe("object");
    expect(empInfo.body.data.getEmployeeDetails.deptInfo[0].Department).toHaveProperty("dept_name");
    expect(typeof empInfo.body.data.getEmployeeDetails.salaryInfo).toBe("object");
    expect(empInfo.body.data.getEmployeeDetails.salaryInfo[0]).toHaveProperty("emp_no", "salary", "from_date", "to_date");
    expect(typeof empInfo.body.data.getEmployeeDetails.titleInfo).toBe("object");
    expect(empInfo.body.data.getEmployeeDetails.titleInfo[0]).toHaveProperty("emp_no", "from_date", "to_date", "title");
  });
  test("Test empInfo route with correct employee number", async () => {
    const deptInfo = await request(app)
      .post("/graphql")
      .send({
        query: GET_MY_DEPARTMENT_INFO_QUERY,
        variables: {
          deptNo: "d003",
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(deptInfo.body.data.getMyDepartmentInfo.deptName).toBe("Human Resources");
    expect(deptInfo.body.data.getMyDepartmentInfo.myDepartmentEmployees[0]).toHaveProperty(
      "emp_no",
      "birth_date",
      "first_name",
      "last_name",
      "gender",
      "hire_date",
      "Titles"
    );
  });
});
