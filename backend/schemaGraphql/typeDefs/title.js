const { GraphQLObjectType,  GraphQLString } = require("graphql");

const TitleType = new GraphQLObjectType({
  name: "titles",
  fields: () => ({
    emp_no: { type: GraphQLString },
    title: { type: GraphQLString },
    from_date: { type: GraphQLString },
    to_date: { type: GraphQLString },
  }),
});

module.exports = TitleType;
