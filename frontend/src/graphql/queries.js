import { gql } from "@apollo/client";

const LOGIN_QUERY = `
query login($employeeID: String!, $password: String!) {
  login(employeeID: $employeeID, password: $password) {
    colleagues {
      hasNextPage
      colleagues {
        Titles {
          title
          to_date
        }
        birth_date
        emp_no
        first_name
        last_name
        gender
        hire_date
      }
    }
    user {
      accessibility
      birth_date
      dept_no
      emp_no
      first_name
      last_name
      gender
      hire_date
    }
  }
}
`;

const LOGIN = gql`
  ${LOGIN_QUERY}
`;

const GET_PAGINATED_COLLEAGUES_QUERY = `
query getPaginatedColleagues($limit: Int!, $cursor: Int!) {
  getPaginatedColleagues(limit: $limit, cursor: $cursor) {
    hasNextPage
    colleagues {
      Titles {
        title
        to_date
      }
      birth_date
      emp_no
      first_name
      last_name
      gender
      hire_date
    }
  }
}
`;

const GET_PAGINATED_COLLEAGUES = gql`${GET_PAGINATED_COLLEAGUES_QUERY}`;

const GET_EMPLOYEE_DETAILS_QUERY = `
query getEmployeeDetails($empNo: String!, $accessibility: String!) {
  getEmployeeDetails(empNo: $empNo, accessibility: $accessibility) {
    deptInfo {
      Department {
        dept_name
      }
      dept_no
      emp_no
      from_date
      to_date
    }
    salaryInfo {
      emp_no
      salary
      from_date
      to_date
    }
    titleInfo {
      emp_no
      title
      from_date
      to_date
    }
    user {
      birth_date
      emp_no
      first_name
      last_name
      gender
      hire_date
    }
    employeesManager {
      Employee {
        first_name
        last_name
      }
      dept_no
      emp_no
      from_date
      to_date
    }
  }
}
`

const GET_EMPLOYEE_DETAILS = gql`${GET_EMPLOYEE_DETAILS_QUERY}`;

const GET_MY_INFORMATION_QUERY = `
query getMyInformation($employeeID: String!) {
  getMyInformation(employeeID: $employeeID) {
    deptInfo {
      Department {
        dept_name
      }
      dept_no
      emp_no
      from_date
      to_date
    }
    salaryInfo {
      emp_no
      salary
      from_date
      to_date
    }
    titleInfo {
      emp_no
      title
      from_date
      to_date
    }
  }
}
`;

const GET_MY_INFORMATION = gql`${GET_MY_INFORMATION_QUERY}`;

const GET_MY_DEPARTMENT_INFO_QUERY = `
query getMyDepartmentInfo($deptNo: String!) {
  getMyDepartmentInfo(deptNo: $deptNo) {
    deptName
    myDepartmentEmployees {
      Titles {
        title
        to_date
      }
      birth_date
      emp_no
      first_name
      last_name
      gender
      hire_date
    }
  }
}
`;

const GET_MY_DEPARTMENT_INFO = gql`${GET_MY_DEPARTMENT_INFO_QUERY}`

const GET_MY_ORGANISATION_INFO_QUERY = `
query getMyOrganisationInfo {
  getMyOrganisationInfo {
    titlesList {
      title
    }
    deptWithManagersList {
      deptName
      deptNo
      noEmp
      manager {
        emp_no
        first_name
        last_name
      }
    }
  }
}
`;

const GET_MY_ORGANISATION_INFO = gql`${GET_MY_ORGANISATION_INFO_QUERY}`

export { LOGIN_QUERY, GET_MY_DEPARTMENT_INFO_QUERY, GET_MY_ORGANISATION_INFO_QUERY, LOGIN, GET_PAGINATED_COLLEAGUES_QUERY, GET_EMPLOYEE_DETAILS_QUERY, GET_EMPLOYEE_DETAILS, GET_PAGINATED_COLLEAGUES, GET_MY_INFORMATION_QUERY, GET_MY_INFORMATION, GET_MY_DEPARTMENT_INFO, GET_MY_ORGANISATION_INFO };
