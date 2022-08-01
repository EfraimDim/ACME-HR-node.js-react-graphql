const app = require("../app");
const request = require("supertest");

exports.createEmployee = async () => {
  await request(app)
    .post("/graphql")
    .send({
      query: `
  mutation addEmployee(
    $firstName: String!
    $lastName: String!
    $gender: String!
    $birthDate: Date!
    $empNum: String!
    $role: String!
    $department: String!
    $hireDate: Date!
    $salary: String!
  ) {
    addEmployee(
      firstName: $firstName
      lastName: $lastName
      gender: $gender
      birthDate: $birthDate
      empNum: $empNum
      role: $role
      department: $department
      hireDate: $hireDate
      salary: $salary
    ) {
      message
    }
  }
`,
      variables: {
        firstName: "Practice",
        lastName: "Test",
        gender: "M",
        birthDate: "1999-10-10",
        empNum: "8888888",
        role: "staff",
        department: "d005",
        hireDate: "1999-01-01",
        salary: "100000",
      },
    });
};
