const { GraphQLString, GraphQLInt } = require("graphql");
const { checkPassword, checkAccessibility } = require("../../middleware/middleware");
const { LoginType, ColleaguesConnection } = require("../typeDefs/login");
const { getAllEmployees } = require("../../queries/getAllEmployees");
const { getEmployeeDepartmentInfo } = require("../../queries/getEmployeeDepartmentInfo");
const { getEmployeeSalaryInfo } = require("../../queries/getEmployeeSalaryInfo");
const { getEmployeeTitleInfo } = require("../../queries/getEmployeeTitleInfo");
const { MyInformationType } = require("../typeDefs/getMyInformation");

const LOGIN = {
  type: LoginType,
  args: {
    employeeID: { type: GraphQLString },
    password: { type: GraphQLString },
    limit: { type: GraphQLInt },
    cursor: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    try {
      await checkPassword(args);
      const accessibilityAndDeptNo = await checkAccessibility(args);
      let { user } = args;
      user.dataValues.accessibility = accessibilityAndDeptNo.accessibility;
      user.dataValues.dept_no = accessibilityAndDeptNo.dept_no;
      user = user.dataValues;
      const colleaguesList = await getAllEmployees(1000, 0);
      const colleagues = {colleagues: colleaguesList, hasNextPage: true}
      return {
        user,
        colleagues,
      };
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

const GET_PAGINATED_COLLEAGUES = {
  type: ColleaguesConnection,
  args: {
    limit: { type: GraphQLInt },
    cursor: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    try {
      const { limit, cursor } = args;
      const colleagues = await getAllEmployees(limit, cursor);
      let hasNextPage = false;
      if (colleagues.length === limit) {
        hasNextPage = true;
      }
      return { colleagues, hasNextPage };
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

const GET_MY_INFORMATION = {
  type: MyInformationType,
  args: {
    employeeID: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const { employeeID } = args;
      const deptInfo = await getEmployeeDepartmentInfo(employeeID);
      const salaryInfo = await getEmployeeSalaryInfo(employeeID);
      const titleInfo = await getEmployeeTitleInfo(employeeID);
      return { deptInfo, salaryInfo, titleInfo };
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

module.exports = { LOGIN, GET_PAGINATED_COLLEAGUES, GET_MY_INFORMATION };
