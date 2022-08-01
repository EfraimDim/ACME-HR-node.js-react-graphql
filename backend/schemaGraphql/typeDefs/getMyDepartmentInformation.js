const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { ColleagueType } = require("./login")

const MyDepartmentInfoType = new GraphQLObjectType({
    name: "MyDepartmentInfo",
    fields: () => ({
      deptName: { type: GraphQLString },
      myDepartmentEmployees: { type: new GraphQLList(ColleagueType) },
    }),
  });

module.exports = { MyDepartmentInfoType }
