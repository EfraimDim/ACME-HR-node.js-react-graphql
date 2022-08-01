exports.loginSchemaAJV = {
  type: "object",
  properties: {
    employeeID: {
      type: "string",
    },
    password: {
      type: "string",
      format: "date",
      minLength: 10,
      maxLength: 10,
    },
  },
  required: ["employeeID", "password"],
  additionalProperties: false,
};

exports.addorEditEmployeeSchemaAJV = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    gender: {
      type: "string",
      minLength: 1,
      maxLength: 1,
    },
    birthDate: {
      type: "string",
      format: "date",
      minLength: 10,
      maxLength: 10,
    },
    empNum: {
      type: "string",
    },
    role: {
      type: "string",
    },
    originalRole: {
      type: "string",
    },
    department: {
      type: "string",
    },
    originalDeptNo: {
      type: "string",
    },
    hireDate: {
      type: "string",
      format: "date",
      minLength: 10,
      maxLength: 10,
    },
    currentDate: {
      type: "string",
      format: "date",
      minLength: 10,
      maxLength: 10,
    },
  },
  required: ["firstName", "lastName", "gender", "birthDate", "empNum", "role", "department", "hireDate"],
  additionalProperties: true,
};

exports.editEmployeeRoleSchemaAJV = {
  type: "object",
  properties: {
    empNum: {
      type: "string",
    },
    departmentNo: {
      type: "string",
    },
    originalRole: {
      type: "string",
    },
    newRoleStartDate: {
      type: "string",
      format: "date",
      minLength: 10,
      maxLength: 10,
    },
    newRole: {
      type: "string",
    },
  },
  required: ["empNum", "departmentNo", "originalRole", "newRoleStartDate", "newRole"],
};

exports.editEmployeeDepartmentSchemaAJV = {
  type: "object",
  properties: {
    empNum: {
      type: "string",
    },
    newDepartmentNo: {
      type: "string",
    },
    newDepartmentStartDate: {
      type: "string",
      format: "date",
      minLength: 10,
      maxLength: 10,
    },
  },
  required: ["empNum", "newDepartmentNo", "newDepartmentStartDate"],
};

exports.editEmployeeSalarySchemaAJV = {
  type: "object",
  properties: {
    empNum: {
      type: "string",
    },
    newSalary: {
      type: "string",
    },
    newSalaryStartDate: {
      type: "string",
      format: "date",
      minLength: 10,
      maxLength: 10,
    },
  },
  required: ["empNum", "newSalary", "newSalaryStartDate"],
};

exports.addDepartmentSchemaAJV = {
  type: "object",
  properties: {
    deptNo: {
      type: "string",
      minLength: 4,
      maxLength: 4,
    },
    deptName: {
      type: "string",
    },
    managersEmpNum: {
      type: "string",
    },
    startDate: {
      type: "string",
      format: "date",
      minLength: 10,
      maxLength: 10,
    },
  },
  required: ["deptNo", "deptName", "managersEmpNum", "startDate"],
};

exports.addTitleSchemaAJV = {
  type: "object",
  properties: {
    titleName: {
      type: "string",
    },
  },
  required: ["titleName"],
};
