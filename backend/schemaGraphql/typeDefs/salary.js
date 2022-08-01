const { GraphQLObjectType,  GraphQLString } = require("graphql");

const SalaryType = new GraphQLObjectType({
  name: "salaries",
  fields: () => ({
    emp_no: { type: GraphQLString },
    salary: { type: GraphQLString },
    from_date: { type: GraphQLString },
    to_date: { type: GraphQLString },
  }),
});

module.exports = SalaryType;
