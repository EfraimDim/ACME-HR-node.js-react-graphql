const { GraphQLObjectType, GraphQLString } = require("graphql");

const EmployeeType = new GraphQLObjectType({
  name: "employees",
  fields: () => ({
    emp_no: { type: GraphQLString },
    birth_date: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    gender: { type: GraphQLString },
    hire_date: { type: GraphQLString },
  }),
});

module.exports = EmployeeType;
