import { gql } from "@apollo/client";

const ADD_EMPLOYEE_MUTATION = `
mutation addEmployee(
  $firstName: String!
  $lastName: String!
  $gender: String!
  $birthDate: Date!
  $empNum: String!
  $role: String!
  $department: String!
  $hireDate: Date!
  $salary: String!
) {
  addEmployee(
    firstName: $firstName
    lastName: $lastName
    gender: $gender
    birthDate: $birthDate
    empNum: $empNum
    role: $role
    department: $department
    hireDate: $hireDate
    salary: $salary
  ) {
    message
  }
}
`;

const ADD_EMPLOYEE = gql`
  ${ADD_EMPLOYEE_MUTATION}
`;

const EDIT_EMPLOYEE_MUTATION = `
mutation editEmployee(
  $firstName: String!
  $lastName: String!
  $gender: String!
  $birthDate: Date!
  $empNum: String!
  $originalDeptNo: String!
  $originalRole: String!
  $role: String!
  $department: String!
  $hireDate: Date!
  $currentDate: Date!
) {
  editEmployee(
    firstName: $firstName
    lastName: $lastName
    gender: $gender
    birthDate: $birthDate
    empNum: $empNum
    originalDeptNo: $originalDeptNo
    originalRole: $originalRole
    role: $role
    department: $department
    hireDate: $hireDate
    currentDate: $currentDate
  ) {
    message
  }
}
`;

const EDIT_EMPLOYEE = gql`
  ${EDIT_EMPLOYEE_MUTATION}
`;

const EDIT_EMPLOYEE_ROLE_MUTATION = `
mutation editEmployeeRole($empNum: String!, $departmentNo: String!, $originalRole: String!, $newRole: String!, $newRoleStartDate: Date!) {
  editEmployeeRole(
    empNum: $empNum
    departmentNo: $departmentNo
    originalRole: $originalRole
    newRole: $newRole
    newRoleStartDate: $newRoleStartDate
  ) {
    message
  }
}
`;

const EDIT_EMPLOYEE_ROLE = gql`
  ${EDIT_EMPLOYEE_ROLE_MUTATION}
`;

const EDIT_EMPLOYEE_DEPARTMENT_MUTATION = `
mutation editEmployeeDepartment($empNum: String!, $newDepartmentNo: String!, $newDepartmentStartDate: Date!) {
  editEmployeeDepartment(empNum: $empNum, newDepartmentNo: $newDepartmentNo, newDepartmentStartDate: $newDepartmentStartDate) {
    message
  }
}
`;

const EDIT_EMPLOYEE_DEPARTMENT = gql`
  ${EDIT_EMPLOYEE_DEPARTMENT_MUTATION}
`;

const EDIT_EMPLOYEE_SALARY_MUTATION = `
mutation editEmployeeSalary($empNum: String!, $newSalary: String!, $newSalaryStartDate: Date!) {
  editEmployeeSalary(empNum: $empNum, newSalary: $newSalary, newSalaryStartDate: $newSalaryStartDate) {
    message
  }
}
`;

const EDIT_EMPLOYEE_SALARY = gql`
  ${EDIT_EMPLOYEE_SALARY_MUTATION}
`;

const ADD_DEPARTMENT_MUTATION = `
mutation addDepartment($deptNo: String!, $deptName: String!, $managersEmpNum: String!, $startDate: Date!) {
  addDepartment(deptNo: $deptNo, deptName: $deptName, managersEmpNum: $managersEmpNum, startDate: $startDate) {
    message
    newManager {
      firstName
      lastName
    }
  }
}
`;

const ADD_DEPARTMENT = gql`
  ${ADD_DEPARTMENT_MUTATION}
`;

const ADD_TITLE_MUTATION = `
mutation addTitle($titleName: String!) {
  addTitle(titleName: $titleName) {
    message
  }
}
`;

const ADD_TITLE = gql`
  ${ADD_TITLE_MUTATION}
`;

export {
  ADD_EMPLOYEE,
  ADD_EMPLOYEE_MUTATION,
  EDIT_EMPLOYEE,
  EDIT_EMPLOYEE_MUTATION,
  EDIT_EMPLOYEE_ROLE,
  EDIT_EMPLOYEE_ROLE_MUTATION,
  EDIT_EMPLOYEE_DEPARTMENT,
  EDIT_EMPLOYEE_DEPARTMENT_MUTATION,
  EDIT_EMPLOYEE_SALARY,
  EDIT_EMPLOYEE_SALARY_MUTATION,
  ADD_DEPARTMENT,
  ADD_DEPARTMENT_MUTATION,
  ADD_TITLE,
  ADD_TITLE_MUTATION,
};
