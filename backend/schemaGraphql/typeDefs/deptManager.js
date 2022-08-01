const { GraphQLObjectType, GraphQLString } = require("graphql");

const DeptManagerType = new GraphQLObjectType({
  name: "dept_manager",
  fields: () => ({
    emp_no: { type: GraphQLString },
    dept_no: { type: GraphQLString },
    from_date: { type: GraphQLString },
    to_date: { type: GraphQLString },
  }),
});

module.exports = DeptManagerType;
