const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { DeptInfoType } = require("./getMyInformation");
const SalaryType = require("./salary");
const TitleType = require("./title");
const EmployeeType = require("./employee");

const ManagersNameType = new GraphQLObjectType({
  name: "managersName",
  fields: () => ({
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
  }),
});

const EmployeesManagerType = new GraphQLObjectType({
  name: "employeesManager",
  fields: () => ({
    Employee: { type: ManagersNameType },
    dept_no: { type: GraphQLString },
    emp_no: { type: GraphQLString },
    to_date: { type: GraphQLString },
    from_date: { type: GraphQLString },
  }),
});

const EmployeeDetailsType = new GraphQLObjectType({
  name: "employeeDetails",
  fields: () => ({
    deptInfo: { type: new GraphQLList(DeptInfoType) },
    salaryInfo: { type: new GraphQLList(SalaryType) },
    titleInfo: { type: new GraphQLList(TitleType) },
    user: { type: EmployeeType },
    employeesManager: { type: EmployeesManagerType },
  }),
});

module.exports = { EmployeeDetailsType };
