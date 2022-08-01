const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const DeptEmployeeType = new GraphQLObjectType({
  name: "dept_emp",
  fields: () => ({
    emp_no: { type: GraphQLString },
    dept_no: { type: GraphQLString },
    from_date: { type: GraphQLString },
    to_date: { type: GraphQLString },
  }),
});

module.exports = DeptEmployeeType;
