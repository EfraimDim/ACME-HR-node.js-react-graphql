const { Employee } = require("../models/modelRelations");
const { currentDepManager } = require("../queries/middlewareQueries/checkAccessibilityQuery");
const { findNewManagersCurrentRole } = require("../queries/middlewareQueries/findNewManagersCurrentRole");
const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);

exports.validateBody = (schema) => {
  return (req, res, next) => {
    try {
      const valid = ajv.validate(schema, req.body);
      if (!valid) {
        res.status(400).send(ajv.errors[0]);
      } else {
        next();
      }
    } catch (e) {
      console.log(e);
      res.status(500).send(e.message);
    }
  };
};

exports.checkPassword = async (args) => {
  try {
    const { employeeID, password } = args;
    const user = await Employee.findByPk(employeeID);
    if (user.dataValues.birth_date === password) {
      args.user = user;
    } else {
      throw new Error("Incorrect Password");
    }
  } catch (e) {
    if ((e.message === "Incorrect Password")) {
      throw new Error(e.message);
    } else {
      throw new Error("Incorrect EmployeeID");
    }
  }
};

exports.checkAccessibility = async (args) => {
  try {
    const { employeeID } = args;
    const depManager = await currentDepManager(employeeID);
    if (depManager === null) {
      return { accessibility: "regularEmp", dept_no: null };
    } else if (depManager.dataValues.dept_no === "d003") {
      return { accessibility: "managerHR", dept_no: depManager.dataValues.dept_no };
    } else {
      return { accessibility: "manager", dept_no: depManager.dataValues.dept_no };
    }
  } catch (e) {
    console.error(e);
  }
};

exports.checkEmployeeNumberAvailable = async (args) => {
  try {
    const { empNum } = args;
    const empNumAvailable = await Employee.findByPk(empNum);
    if (empNumAvailable) {
      throw new Error("Employee Number Taken");
    }
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
};

exports.checkEmployeeNumberExists = async (args) => {
  try {
    const { managersEmpNum } = args;
    const empNumExists = await Employee.findByPk(managersEmpNum);
    if (empNumExists) {
      const managersCurrentRole = await findNewManagersCurrentRole(managersEmpNum);
      return { currentRole: managersCurrentRole, newManager: empNumExists };
    } else {
      throw new Error("Employee Number Doesn't Exist");
    }
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
};
