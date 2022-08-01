const app = require("../../../app");
const request = require("supertest");
const { LOGIN_QUERY, GET_PAGINATED_COLLEAGUES_QUERY, GET_MY_INFORMATION_QUERY } = require("../../../../frontend/src/graphql/queries");

const { createEmployee } = require("../../../testFunctions/beforeEachTest");
const { destroyeEmployee } = require("../../../testFunctions/afterEachTest");

beforeEach(async () => {
  await createEmployee();
});

afterEach(async () => {
  await destroyeEmployee();
});

describe("Testing users Login query", () => {
  test("Test login query with correct details", async () => {
    const login = await request(app)
      .post("/graphql")
      .send({
        query: LOGIN_QUERY,
        variables: {
          employeeID: "8888888",
          password: "1999-10-10",
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log(login.body.data.login);
    expect(typeof login.body).toBe("object");
    expect(login.body.data.login.user).toBeDefined();
    expect(typeof login.body.data.login.user).toBe("object");
    expect(login.body.data.login.user).toHaveProperty("emp_no", "birth_date", "first_name", "last_name", "gender", "hire_date", "accesibility");
    expect(login.body.data.login.user.emp_no).toBe("8888888");
    expect(login.body.data.login.user.birth_date).toBe("1999-10-10");
    expect(login.body.data.login.user.first_name).toBe("Practice");
    expect(login.body.data.login.user.last_name).toBe("Test");
    expect(login.body.data.login.user.gender).toBe("M");
    expect(login.body.data.login.user.hire_date).toBe("1999-01-01");
    expect(login.body.data.login.colleagues.colleagues[0]).toHaveProperty(
      "emp_no",
      "birth_date",
      "first_name",
      "last_name",
      "gender",
      "hire_date",
      "Titles"
    );
    expect(login.body.data.login.colleagues.colleagues).toHaveLength(1000);
  });
  test("Test login route with incorrect employeeID", async () => {
    const login = await request(app)
      .post("/graphql")
      .send({
        query: LOGIN_QUERY,
        variables: {
          employeeID: "888888888",
          password: "1999-10-10",
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(login.body.errors[0].message).toBe("Incorrect EmployeeID");
  });
  test("Test login route with incorrect password", async () => {
    const login = await request(app)
      .post("/graphql")
      .send({
        query: LOGIN_QUERY,
        variables: {
          employeeID: "10100",
          password: "1953-04-30",
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log(login.body);
    expect(login.body.errors[0].message).toBe("Incorrect Password");
  });
});

describe("Testing paginated colleagues query", () => {
  test("Test paginated colleagues query with next page", async () => {
    const colleagues = await request(app)
      .post("/graphql")
      .send({
        query: GET_PAGINATED_COLLEAGUES_QUERY,
        variables: {
          limit: 1000,
          cursor: 0,
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(colleagues.body.data.getPaginatedColleagues.colleagues[0]).toHaveProperty(
      "emp_no",
      "birth_date",
      "first_name",
      "last_name",
      "gender",
      "hire_date",
      "Titles"
    );
    expect(colleagues.body.data.getPaginatedColleagues.colleagues).toHaveLength(1000);
    expect(colleagues.body.data.getPaginatedColleagues.hasNextPage).toBe(true);
  });
  test("Test paginated colleagues query without next page", async () => {
    const colleagues = await request(app)
      .post("/graphql")
      .send({
        query: GET_PAGINATED_COLLEAGUES_QUERY,
        variables: {
          limit: 1000,
          cursor: 240000,
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(colleagues.body.data.getPaginatedColleagues.colleagues[0]).toHaveProperty(
      "emp_no",
      "birth_date",
      "first_name",
      "last_name",
      "gender",
      "hire_date",
      "Titles"
    );
    expect(colleagues.body.data.getPaginatedColleagues.hasNextPage).toBe(false);
  });
});

describe("Testing get my information query", () => {
  test("Test get my information query", async () => {
    const myInformation = await request(app)
      .post("/graphql")
      .send({
        query: GET_MY_INFORMATION_QUERY,
        variables: {
          employeeID: "8888888",
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(typeof myInformation.body.data.getMyInformation.deptInfo).toBe("object");
    expect(myInformation.body.data.getMyInformation.deptInfo[0]).toHaveProperty("Department", "dept_no", "emp_no", "from_date", "to_date");
    expect(typeof myInformation.body.data.getMyInformation.salaryInfo).toBe("object");
    expect(myInformation.body.data.getMyInformation.salaryInfo[0]).toHaveProperty("emp_no", "salary", "from_date", "to_date");
    expect(typeof myInformation.body.data.getMyInformation.titleInfo).toBe("object");
    expect(myInformation.body.data.getMyInformation.titleInfo[0]).toHaveProperty("emp_no", "from_date", "to_date", "title");
  });
});
