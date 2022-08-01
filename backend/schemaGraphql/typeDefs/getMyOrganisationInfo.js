const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const ManagersType = new GraphQLObjectType({
  name: "managers",
  fields: () => ({
    emp_no: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
  }),
});

const DeptWithManagersListType = new GraphQLObjectType({
  name: "deptManagersList",
  fields: () => ({
    deptName: { type: GraphQLString },
    deptNo: { type: GraphQLString },
    noEmp: { type: GraphQLString },
    manager: { type: ManagersType },
  }),
});

const OnlyTitleType = new GraphQLObjectType({
  name: "titlesList",
  fields: () => ({
    title: { type: GraphQLString },
  }),
});

const MyOrganisationType = new GraphQLObjectType({
  name: "myOrganisation",
  fields: () => ({
    titlesList: { type: new GraphQLList(OnlyTitleType) },
    deptWithManagersList: { type: new GraphQLList(DeptWithManagersListType) },
  }),
});

module.exports = { MyOrganisationType }
