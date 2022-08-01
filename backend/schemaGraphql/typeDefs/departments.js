const { GraphQLObjectType, GraphQLString } = require("graphql");

const DepartmentType = new GraphQLObjectType({
  name: "departments",
  fields: () => ({
    dept_no: { type: GraphQLString },
    dept_name: { type: GraphQLString },
  }),
});

module.exports = DepartmentType;
