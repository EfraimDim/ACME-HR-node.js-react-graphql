const app = require("../../../app");
const request = require("supertest");
const { Employee, Title, DeptEmp, Department } = require("../../../models/modelRelations");
const { createEmployee } = require("../../../testFunctions/beforeEachTest");
const { destroyeEmployee } = require("../../../testFunctions/afterEachTest");
const {
  ADD_EMPLOYEE_MUTATION,
  EDIT_EMPLOYEE_MUTATION,
  EDIT_EMPLOYEE_ROLE_MUTATION,
  EDIT_EMPLOYEE_DEPARTMENT_MUTATION,
  EDIT_EMPLOYEE_SALARY_MUTATION,
  ADD_DEPARTMENT_MUTATION,
} = require("../../../../frontend/src/graphql/mutations");

beforeEach(async () => {
  await createEmployee();
});

afterEach(async () => {
  await destroyeEmployee();
});

describe("Testing add employee hrManager mutation", () => {
  test("Test add employee mutation with correct details", async () => {
    const addEmployee = await request(app)
      .post("/graphql")
      .send({
        query: ADD_EMPLOYEE_MUTATION,
        variables: {
          firstName: "John",
          lastName: "Smith",
          gender: "M",
          birthDate: "1994-01-01",
          empNum: "7777777",
          role: "staff",
          department: "d003",
          hireDate: "1999-01-01",
          salary: "100000",
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    await Employee.destroy({
      where: {
        emp_no: "7777777",
      },
    });
    await Title.destroy({
      where: {
        emp_no: "7777777",
      },
    });
    await DeptEmp.destroy({
      where: {
        emp_no: "7777777",
      },
    });
    console.log(addEmployee.body.data);
    expect(typeof addEmployee.body.data.addEmployee).toBe("object");
    expect(addEmployee.body.data.addEmployee.message).toBeDefined();
    expect(addEmployee.body.data.addEmployee.message).toBe("John Smith added to database!");
  });
  test("Test hrManager add employee mutation with missing details", async () => {
    await request(app)
      .post("/grapql")
      .send({
        query: ADD_EMPLOYEE_MUTATION,
        variables: {
          firstName: "John",
          lastName: "Smith",
          gender: "M",
          birthDate: "1994-01-01",
          role: "staff",
          department: "d003",
          hireDate: "1999-01-01",
        },
      })
      .set("Accept", "application/json")
      .expect(404);
  });
});

describe("Testing edit employee all details hrManager mutation", () => {
  test("Test edit employee mutation with correct details", async () => {
    const editEmployee = await request(app)
      .post("/graphql")
      .send({
        query: EDIT_EMPLOYEE_MUTATION,
        variables: {
          firstName: "Testttt",
          lastName: "Practicccce",
          gender: "M",
          birthDate: "1992-10-22",
          empNum: "8888888",
          originalDeptNo: "d005",
          originalRole: "staff",
          role: "senior staff",
          department: "d004",
          hireDate: "1999-01-02",
          currentDate: "2020-01-01",
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(typeof editEmployee.body.data.editEmployee).toBe("object");
    expect(editEmployee.body.data.editEmployee.message).toBeDefined();
    expect(editEmployee.body.data.editEmployee.message).toBe("Information updated to the database!");
  });
});

describe("Testing edit employee roles hrManager mutaton", () => {
  test("Test edit employee roles mutation with correct details", async () => {
    const editEmployee = await request(app)
      .post("/graphql")
      .send({
        query: EDIT_EMPLOYEE_ROLE_MUTATION,
        variables: {
          empNum: "8888888",
          originalRole: "staff",
          newRole: "engineer",
          departmentNo: "d005",
          newRoleStartDate: "2020-01-01",
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(typeof editEmployee.body.data.editEmployeeRole).toBe("object");
    expect(editEmployee.body.data.editEmployeeRole.message).toBeDefined();
    expect(editEmployee.body.data.editEmployeeRole.message).toBe("Information updated to the database!");
  });
});

describe("Testing edit employee department hrManager mutation", () => {
  test("Test edit employee department mutation with correct details", async () => {
    const editEmployee = await request(app)
      .post("/graphql")
      .send({
        query: EDIT_EMPLOYEE_DEPARTMENT_MUTATION,
        variables: {
          empNum: "8888888",
          newDepartmentNo: "d008",
          newDepartmentStartDate: "2021-01-01",
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(typeof editEmployee.body.data.editEmployeeDepartment).toBe("object");
    expect(editEmployee.body.data.editEmployeeDepartment.message).toBeDefined();
    expect(editEmployee.body.data.editEmployeeDepartment.message).toBe("Information updated to the database!");
  });
});

describe("Testing edit employee salary hrManager mutation", () => {
  test("Test edit employee salary mutation with correct details", async () => {
    const editEmployee = await request(app)
      .post("/graphql")
      .send({
        query: EDIT_EMPLOYEE_SALARY_MUTATION,
        variables: {
          empNum: "8888888",
          newSalary: "100000",
          newSalaryStartDate: "2022-03-03",
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(typeof editEmployee.body.data.editEmployeeSalary).toBe("object");
    expect(editEmployee.body.data.editEmployeeSalary.message).toBeDefined();
    expect(editEmployee.body.data.editEmployeeSalary.message).toBe("Information updated to the database!");
  });
});

describe("Testing add department hrManager mutation", () => {
  test("Test add department mutation with correct details", async () => {
    const addDepartment = await request(app)
      .post("/graphql")
      .send({
        query: ADD_DEPARTMENT_MUTATION,
        variables: {
          deptNo: "d023",
          deptName: "TestingDepart",
          managersEmpNum: "8888888",
          startDate: "2022-03-04",
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    const department = await Department.findByPk("d023");
    expect(department.dept_no).toBe("d023");
    expect(department.dept_name).toBe("TestingDepart");
    await Department.destroy({
      where: {
        dept_no: "d023",
      },
    });
    expect(typeof addDepartment.body.data.addDepartment).toBe("object");
    expect(addDepartment.body.data.addDepartment.message).toBeDefined();
    expect(addDepartment.body.data.addDepartment.message).toBe("Department added to the database!");
    expect(typeof addDepartment.body.data.addDepartment.newManager).toBe("object");
    expect(addDepartment.body.data.addDepartment.newManager).toBeDefined();
    expect(addDepartment.body.data.addDepartment.newManager.firstName).toBe("Practice");
    expect(addDepartment.body.data.addDepartment.newManager.lastName).toBe("Test");
  });
});
