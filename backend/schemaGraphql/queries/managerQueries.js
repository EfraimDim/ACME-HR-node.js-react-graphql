const { GraphQLString } = require("graphql");
const { EmployeeDetailsType } = require("../typeDefs/getEmployeeDetails");
const { Employee, Department } = require("../../models/modelRelations");
const { getEmployeeDepartmentInfo } = require("../../queries/getEmployeeDepartmentInfo");
const { getEmployeeSalaryInfo } = require("../../queries/getEmployeeSalaryInfo");
const { getEmployeeTitleInfo } = require("../../queries/getEmployeeTitleInfo");
const { getManagerOfEmployee } = require("../../queries/controllerQueries/managerController/getManagerOfEmployee");
const { MyDepartmentInfoType } = require("../typeDefs/getMyDepartmentInformation");
const { getDepartmentEmployees } = require("../../queries/controllerQueries/managerController/depEmpsForManagersQuery");


const GET_MY_DEPARTMENT_INFO = {
  type: MyDepartmentInfoType,
  args: {
    deptNo: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const { deptNo } = args;
      const department = await Department.findByPk(deptNo);
      const deptName = department.dept_name;
      const myDepartmentEmployees = await getDepartmentEmployees(deptNo);
      return { deptName, myDepartmentEmployees };
    } catch (e) {
      throw new Error(e.message);
    }
  },
};


const GET_EMPLOYEE_DETAILS = {
  type: EmployeeDetailsType,
  args: {
    empNo: { type: GraphQLString },
    accessibility: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const { empNo, accessibility } = args;
      const user = await Employee.findByPk(empNo);
      const deptInfo = await getEmployeeDepartmentInfo(empNo);
      const salaryInfo = await getEmployeeSalaryInfo(empNo);
      const titleInfo = await getEmployeeTitleInfo(empNo);
      let employeesManager = "";
      if (accessibility === "managerHR") {
        employeesManager = await getManagerOfEmployee(deptInfo[0].dataValues.dept_no);
      }
      return {
        user,
        deptInfo,
        salaryInfo,
        titleInfo,
        employeesManager,
      };
    } catch (e) {
      console.log(e)
      throw new Error(e.message);
    }
  },
};

module.exports = { GET_EMPLOYEE_DETAILS, GET_MY_DEPARTMENT_INFO };
