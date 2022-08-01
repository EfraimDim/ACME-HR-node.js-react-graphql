const { HrManagerMutationType, HrManagerAddDepartmentType } = require("../typeDefs/hrManagerMutation");
const sanitizeHtml = require("sanitize-html");
const { addNewEmployee } = require("../../queries/controllerQueries/hrManagerController/addEmployee");
const { editCurrentEmployeeBasicInfo } = require("../../queries/controllerQueries/hrManagerController/editEmployeeInfoBasic");
const { editCurrentEmployeeDepartmentInfo } = require("../../queries/controllerQueries/hrManagerController/editEmployeeDepartmentInfo");
const { editCurrentEmployeeTitleInfo } = require("../../queries/controllerQueries/hrManagerController/editEmployeeTitleInfo");
const { addNewEmployeeDepartment } = require("../../queries/controllerQueries/hrManagerController/addNewEmployeeDepartmentInfo");
const { addNewEmployeeTitle } = require("../../queries/controllerQueries/hrManagerController/addNewEmployeeTitleInfo");
const { addNewEmployeeDeptManager } = require("../../queries/controllerQueries/hrManagerController/addNewEmployeeDeptManagerInfo");
const { editCurrentEmployeeDeptManagerInfo } = require("../../queries/controllerQueries/hrManagerController/editEmployeeManagerInfo");
const { editCurrentEmployeeSalaryInfo } = require("../../queries/controllerQueries/hrManagerController/editEmployeeSalaryInfo");
const { addNewEmployeeSalary } = require("../../queries/controllerQueries/hrManagerController/addNewEmployeeSalaryInfo");
const { addNewDepartment } = require("../../queries/controllerQueries/hrManagerController/addDepartment");
const { addNewTitle } = require("../../queries/controllerQueries/hrManagerController/addTitle");

const { GraphQLScalarType, Kind, GraphQLString } = require("graphql");

const { checkEmployeeNumberAvailable, checkEmployeeNumberExists } = require("../../middleware/middleware");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const ADD_EMPLOYEE = {
  type: HrManagerMutationType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    gender: { type: GraphQLString },
    birthDate: { type: dateScalar },
    empNum: { type: GraphQLString },
    role: { type: GraphQLString },
    department: { type: GraphQLString },
    hireDate: { type: dateScalar },
    salary: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      await checkEmployeeNumberAvailable(args);
      const { firstName, lastName, gender, birthDate, empNum, role, department, hireDate, salary } = args;
      const newEmployee = { firstName, lastName, gender, birthDate, empNum, role, department, hireDate, salary };
      await addNewEmployee(newEmployee);
      return { message: `${sanitizeHtml(firstName)} ${sanitizeHtml(lastName)} added to database!` };
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

const EDIT_EMPLOYEE = {
  type: HrManagerMutationType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    gender: { type: GraphQLString },
    birthDate: { type: dateScalar },
    empNum: { type: GraphQLString },
    originalDeptNo: { type: GraphQLString },
    originalRole: { type: GraphQLString },
    role: { type: GraphQLString },
    department: { type: GraphQLString },
    hireDate: { type: dateScalar },
    currentDate: { type: dateScalar },
  },
  async resolve(parent, args) {
    try {
      const { firstName, lastName, gender, birthDate, empNum, role, department, hireDate, originalDeptNo, originalRole, currentDate } = args;
      await editCurrentEmployeeBasicInfo(firstName, lastName, gender, birthDate, empNum, hireDate);
      if (role !== originalRole) {
        await editCurrentEmployeeTitleInfo(empNum, currentDate);
        await addNewEmployeeTitle(empNum, role, currentDate);
      }
      if (department !== originalDeptNo) {
        await editCurrentEmployeeDepartmentInfo(empNum, currentDate);
        await addNewEmployeeDepartment(empNum, department, currentDate);
      }
      if (role === "Manager" && originalRole !== "Manager") {
        await addNewEmployeeDeptManager(empNum, department, currentDate);
      }
      if (originalRole === "Manager" && role !== "Manager") {
        await editCurrentEmployeeDeptManagerInfo(empNum, currentDate);
      }
      return { message: "Information updated to the database!" };
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

const EDIT_EMPLOYEE_ROLE = {
  type: HrManagerMutationType,
  args: {
    empNum: { type: GraphQLString },
    departmentNo: { type: GraphQLString },
    originalRole: { type: GraphQLString },
    newRoleStartDate: { type: dateScalar },
    newRole: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const { empNum, departmentNo, originalRole, newRole, newRoleStartDate } = args;
      await editCurrentEmployeeTitleInfo(empNum, newRoleStartDate);
      await addNewEmployeeTitle(empNum, newRole, newRoleStartDate);
      if (newRole === "Manager" && originalRole !== "Manager") {
        await addNewEmployeeDeptManager(empNum, departmentNo, newRoleStartDate);
      }
      if (originalRole === "Manager" && newRole !== "Manager") {
        await editCurrentEmployeeDeptManagerInfo(empNum, newRoleStartDate);
      }
      return { message: "Information updated to the database!" };
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

const EDIT_EMPLOYEE_DEPARTMENT = {
  type: HrManagerMutationType,
  args: {
    empNum: { type: GraphQLString },
    newDepartmentNo: { type: GraphQLString },
    newDepartmentStartDate: { type: dateScalar },
  },
  async resolve(parent, args) {
    try {
      const { empNum, newDepartmentNo, newDepartmentStartDate } = args;
      await editCurrentEmployeeDepartmentInfo(empNum, newDepartmentStartDate);
      await addNewEmployeeDepartment(empNum, newDepartmentNo, newDepartmentStartDate);
      return { message: "Information updated to the database!" };
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

const EDIT_EMPLOYEE_SALARY = {
  type: HrManagerMutationType,
  args: {
    empNum: { type: GraphQLString },
    newSalary: { type: GraphQLString },
    newSalaryStartDate: { type: dateScalar },
  },
  async resolve(parent, args) {
    try {
      const { empNum, newSalary, newSalaryStartDate } = args;
      await editCurrentEmployeeSalaryInfo(empNum, newSalaryStartDate);
      await addNewEmployeeSalary(empNum, newSalary, newSalaryStartDate);
      return { message: "Information updated to the database!" };
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

const ADD_DEPARTMENT = {
  type: HrManagerAddDepartmentType,
  args: {
    deptNo: { type: GraphQLString },
    deptName: { type: GraphQLString },
    managersEmpNum: { type: GraphQLString },
    startDate: { type: dateScalar },
  },
  async resolve(parent, args) {
    try {
      const newManagerDetails = await checkEmployeeNumberExists(args);
      const { deptNo, deptName, managersEmpNum, startDate } = args;
      const { currentRole, newManager } = newManagerDetails;
      await addNewDepartment(deptNo, deptName);
      await editCurrentEmployeeDepartmentInfo(managersEmpNum, startDate);
      await addNewEmployeeDepartment(managersEmpNum, deptNo, startDate);
      await editCurrentEmployeeTitleInfo(managersEmpNum, startDate);
      await addNewEmployeeTitle(managersEmpNum, "Manager", startDate);
      if (currentRole === "Manager") {
        await editCurrentEmployeeDeptManagerInfo(managersEmpNum, startDate);
      }
      await addNewEmployeeDeptManager(managersEmpNum, deptNo, startDate);
      const { first_name, last_name } = newManager;
      const cleanManagersDetails = { firstName: sanitizeHtml(first_name), lastName: sanitizeHtml(last_name) };
      return { message: "Department added to the database!", newManager: cleanManagersDetails };
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

const ADD_TITLE = {
  type: HrManagerMutationType,
  args: {
    titleName: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const { titleName } = args;
      await addNewTitle(titleName);
      return { message: "Title added to the database!" };
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

module.exports = { ADD_EMPLOYEE, EDIT_EMPLOYEE, EDIT_EMPLOYEE_ROLE, EDIT_EMPLOYEE_DEPARTMENT, EDIT_EMPLOYEE_SALARY, ADD_DEPARTMENT, ADD_TITLE };
