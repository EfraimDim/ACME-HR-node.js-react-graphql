const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const SalaryType = require("./salary");
const TitleType = require("./title");

const DepartmentNameType = new GraphQLObjectType({
  name: "departmentName",
  fields: () => ({
    dept_name: { type: GraphQLString },
  }),
});

const DeptInfoType = new GraphQLObjectType({
  name: "deptInfo",
  fields: () => ({
    Department: { type: DepartmentNameType },
    dept_no: { type: GraphQLString },
    emp_no: { type: GraphQLString },
    from_date: { type: GraphQLString },
    to_date: { type: GraphQLString },
  }),
});

const MyInformationType = new GraphQLObjectType({
  name: "myInformation",
  fields: () => ({
    deptInfo: { type: new GraphQLList(DeptInfoType) },
    salaryInfo: { type: new GraphQLList(SalaryType) },
    titleInfo: { type: new GraphQLList(TitleType) },
  }),
});

module.exports = { MyInformationType, DeptInfoType };