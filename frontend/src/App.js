import { useRef, useState } from "react";
import "./styles/App.module.css";
import LoadingButtonComponent from "./components/LoadingButtonComponent";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import { AppContext } from "./components/AppContext";
import { useLocation } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { LOGIN, GET_EMPLOYEE_DETAILS, GET_PAGINATED_COLLEAGUES } from "./graphql/queries";
import swal from "sweetalert";
import { GET_MY_ORGANISATION_INFO } from "./graphql/queries";

function App() {
  const [loginInfo, setLoginInfo] = useState(null);
  const [loadSpinner, setLoadSpinner] = useState(false);
  const [paginationCountEmployee, setPaginationCountEmployee] = useState(1);
  const [paginationEmployeeArray, setPaginationEmployeeArray] = useState([]);
  const [paginationPageEmployee, setPaginationPageEmployee] = useState(1);

  const [paginationCountSalary, setPaginationCountSalary] = useState(1);
  const [paginationSalaryArray, setPaginationSalaryArray] = useState([]);
  const [paginationPageSalary, setPaginationPageSalary] = useState(1);

  const [paginationCountDepEmp, setPaginationCountDepEmp] = useState(1);
  const [paginationDepEmpArray, setPaginationDepEmpArray] = useState([]);
  const [paginationPageDepEmp, setPaginationPageDepEmp] = useState(1);

  const [paginationCountSalaryDepEmp, setPaginationCountSalaryDepEmp] = useState(1);
  const [paginationSalaryArrayDepEmp, setPaginationSalaryArrayDepEmp] = useState([]);
  const [paginationPageSalaryDepEmp, setPaginationPageSalaryDepEmp] = useState(1);

  const [employeeDepInfo, setEmployeeDepInfo] = useState(null);

  const [roleDepartmentToggle, setRoleDepartmentToggle] = useState(true);

  const [addEmployee, setAddEmployee] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);

  const [updateRole, setUpdateRole] = useState(false);
  const [updateDepartment, setUpdateDepartment] = useState(false);
  const [updateSalary, setUpdateSalary] = useState(false);

  const [addDepartment, setAddDepartment] = useState(false);
  const [addTitle, setAddTitle] = useState(false);

  const [colleaguesCursor, setColleaguesCursor] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [myDepartmentEmployees, setMyDepartmentEmployees] = useState(null);
  const [myInformation, setMyInformation] = useState(null);
  const [myOrganisation, setMyOrganisation] = useState(null);

  const myInformationCalledOnce = useRef(false);
  const myDepartmentsCalledOnce = useRef(false);
  const myOrganisationCalledOnce = useRef(false);

  const [userLogin] = useLazyQuery(LOGIN, {
    onError: (error) => {
      setLoadSpinner(false);
      swal({
        title: "Login Failed!",
        text: `${error.message}`,
        icon: "error",
        button: "okay",
      });
    },
    onCompleted: (loginData) => {
      try {
        if (loginData.login === null) {
          return;
        }
        setPaginationCountEmployee(Math.ceil(loginData.login.colleagues.colleagues.length / 10));
        setPaginationEmployeeArray(loginData.login.colleagues.colleagues.slice(0, 10));
        console.log(loginData);
        setLoginInfo(loginData.login);
        swal({
          title: "Login Success!",
          text: `Welcome ${loginData.login.user.first_name} ${loginData.login.user.last_name}`,
          icon: "success",
          button: "continue!",
        });
      } catch (e) {
        setLoadSpinner(false);
        console.log(e);
      }
    },
  });

  const [getPaginatedColleagues] = useLazyQuery(GET_PAGINATED_COLLEAGUES, {
    onCompleted: (colleaguesData) => {
      try {
        if (colleaguesData.getPaginatedColleagues.hasNextPage === false) {
          setHasNextPage(false);
        }
        const newLoginInfo = { ...loginInfo };
        newLoginInfo.colleagues = colleaguesData.getPaginatedColleagues.colleagues;
        setLoginInfo(newLoginInfo);
        setPaginationCountEmployee(Math.ceil(colleaguesData.getPaginatedColleagues.colleagues.length / 10));
        setPaginationEmployeeArray(colleaguesData.getPaginatedColleagues.colleagues.slice(0, 10));
      } catch (e) {
        console.log(e);
      }
    },
  });

  const [getEmployeeDetails] = useLazyQuery(GET_EMPLOYEE_DETAILS, {
    onCompleted: (employeeData) => {
      try {
        setPaginationPageSalaryDepEmp(1);
        setPaginationCountSalaryDepEmp(Math.ceil(employeeData.getEmployeeDetails.salaryInfo.length / 10));
        setPaginationSalaryArrayDepEmp(employeeData.getEmployeeDetails.salaryInfo.slice(0, 10));
        setEmployeeDepInfo(employeeData.getEmployeeDetails);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const location = useLocation();

  const displayEmployeeDetails = async (empNo) => {
    try {
      setEditEmployee(false);
      setUpdateRole(false);
      setUpdateDepartment(false);
      await getEmployeeDetails({ variables: { empNo: empNo, accessibility: loginInfo.user.accessibility } });
    } catch (e) {
      console.log(e);
    }
  };

  const [getMyOrganisationInfo] = useLazyQuery(GET_MY_ORGANISATION_INFO, {
    onCompleted: (myOrganisationInformation) => {
      try {
        setMyOrganisation(myOrganisationInformation.getMyOrganisationInfo);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const updateNewRoleOnFrontend = (empNo, updatedRole) => {
    const newColleaguesArray = [...loginInfo.colleagues];
    const colleagueToUpdate = newColleaguesArray.find((colleague) => colleague.emp_no === empNo);
    colleagueToUpdate.Titles.unshift({ title: updatedRole, to_date: "9999-01-01" });
    setPaginationCountEmployee(Math.ceil(newColleaguesArray.length / 10));
    setPaginationEmployeeArray(newColleaguesArray.slice(0, 10));
  };

  return (
    <AppContext.Provider
      value={{
        setLoginInfo,
        loginInfo,
        setLoadSpinner,
        loadSpinner,
        paginationCountEmployee,
        setPaginationCountEmployee,
        paginationEmployeeArray,
        setPaginationEmployeeArray,
        paginationCountSalary,
        setPaginationCountSalary,
        paginationSalaryArray,
        setPaginationSalaryArray,
        paginationPageSalary,
        setPaginationPageSalary,
        paginationPageEmployee,
        setPaginationPageEmployee,
        paginationCountDepEmp,
        setPaginationCountDepEmp,
        paginationDepEmpArray,
        setPaginationDepEmpArray,
        paginationPageDepEmp,
        setPaginationPageDepEmp,
        employeeDepInfo,
        setEmployeeDepInfo,
        paginationCountSalaryDepEmp,
        setPaginationCountSalaryDepEmp,
        paginationSalaryArrayDepEmp,
        setPaginationSalaryArrayDepEmp,
        paginationPageSalaryDepEmp,
        setPaginationPageSalaryDepEmp,
        roleDepartmentToggle,
        setRoleDepartmentToggle,
        addEmployee,
        setAddEmployee,
        location,
        editEmployee,
        setEditEmployee,
        updateRole,
        setUpdateRole,
        updateDepartment,
        setUpdateDepartment,
        displayEmployeeDetails,
        addDepartment,
        setAddDepartment,
        updateSalary,
        setUpdateSalary,
        updateNewRoleOnFrontend,
        addTitle,
        setAddTitle,
        userLogin,
        getPaginatedColleagues,
        colleaguesCursor,
        setColleaguesCursor,
        hasNextPage,
        myInformationCalledOnce,
        myDepartmentsCalledOnce,
        myOrganisationCalledOnce,
        myInformation,
        setMyInformation,
        myDepartmentEmployees,
        setMyDepartmentEmployees,
        myOrganisation, 
        setMyOrganisation,
        getEmployeeDetails,
        getMyOrganisationInfo
      }}
    >
      <>
        {loadSpinner && <LoadingButtonComponent loadSpinner={loadSpinner} />}
        {!loadSpinner && loginInfo && <HomePage />}
        {!loadSpinner && !loginInfo && <Login />}
      </>
    </AppContext.Provider>
  );
}

export default App;
