const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const ColleagueTitleType = new GraphQLObjectType({
  name: "colleagueTitles",
  fields: () => ({
    title: { type: GraphQLString },
    to_date: { type: GraphQLString },
  }),
});

const ColleagueType = new GraphQLObjectType({
  name: "colleague",
  fields: () => ({
    Titles: { type: new GraphQLList(ColleagueTitleType) },
    birth_date: { type: GraphQLString },
    emp_no: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    gender: { type: GraphQLString },
    hire_date: { type: GraphQLString },
  }),
});


const ColleaguesConnection = new GraphQLObjectType({
  name: 'ColleaguesConnection',
  fields: {
      colleagues: { type: new GraphQLList(ColleagueType) },
      hasNextPage: { type: GraphQLBoolean },
  }
});


const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    accessibility: {type: GraphQLString},
    birth_date: { type: GraphQLString },
    dept_no: { type: GraphQLString },
    emp_no: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    gender: { type: GraphQLString },
    hire_date: { type: GraphQLString },
  }),
});

const LoginType = new GraphQLObjectType({
  name: "login",
  fields: () => ({
    colleagues: { type: ColleaguesConnection },
    user: { type: UserType },
  }),
});

module.exports = { LoginType, ColleaguesConnection, ColleagueType };
