const { GraphQLObjectType, GraphQLString } = require("graphql");

const HrManagerMutationType = new GraphQLObjectType({
  name: "HrManagerMutation",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});

const NewManagerType = new GraphQLObjectType({
  name: "NewManager",
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  }),
});

const HrManagerAddDepartmentType = new GraphQLObjectType({
  name: "HrManagerAddDepartmentMutation",
  fields: () => ({
    message: { type: GraphQLString },
    newManager: { type: NewManagerType },
  }),
});

module.exports = { HrManagerMutationType, HrManagerAddDepartmentType };
