const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { LOGIN, GET_PAGINATED_COLLEAGUES, GET_MY_INFORMATION } = require("./queries/userQueries");
const { GET_EMPLOYEE_DETAILS, GET_MY_DEPARTMENT_INFO } = require("./queries/managerQueries");
const { GET_MY_ORGANISATION_INFO } = require("./queries/hrManagerQueries");
const {
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  EDIT_EMPLOYEE_ROLE,
  EDIT_EMPLOYEE_DEPARTMENT,
  EDIT_EMPLOYEE_SALARY,
  ADD_DEPARTMENT,
  ADD_TITLE,
} = require("./mutations/hrManagerMutations");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    login: LOGIN,
    getEmployeeDetails: GET_EMPLOYEE_DETAILS,
    getPaginatedColleagues: GET_PAGINATED_COLLEAGUES,
    getMyInformation: GET_MY_INFORMATION,
    getMyDepartmentInfo: GET_MY_DEPARTMENT_INFO,
    getMyOrganisationInfo: GET_MY_ORGANISATION_INFO,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addEmployee: ADD_EMPLOYEE,
    editEmployee: EDIT_EMPLOYEE,
    editEmployeeRole: EDIT_EMPLOYEE_ROLE,
    editEmployeeDepartment: EDIT_EMPLOYEE_DEPARTMENT,
    editEmployeeSalary: EDIT_EMPLOYEE_SALARY,
    addDepartment: ADD_DEPARTMENT,
    addTitle: ADD_TITLE,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
