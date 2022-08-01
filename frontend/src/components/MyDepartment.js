import styles from "../styles/MyDepartment.module.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import EmployeeTable from "./EmployeeTable";
import InformationBasic from "./InformationBasic";
import InformationRoleHistory from "./InformationRoleHistory";
import InformationSalary from "./InformationSalary";
import RoleDepartmentToggle from "./RoleDepartmentToggle";
import InformationDepartmentHistory from "./InformationDepartmentHistory";
import { GET_MY_DEPARTMENT_INFO } from "../graphql/queries";
import LoadingButtonComponent from "./LoadingButtonComponent";
import { useLazyQuery } from "@apollo/client";

function MyDepartment() {
  const {
    loginInfo,
    paginationPageDepEmp,
    setPaginationPageDepEmp,
    setPaginationDepEmpArray,
    paginationDepEmpArray,
    paginationCountDepEmp,
    employeeDepInfo,
    paginationCountSalaryDepEmp,
    paginationSalaryArrayDepEmp,
    setPaginationSalaryArrayDepEmp,
    paginationPageSalaryDepEmp,
    setPaginationPageSalaryDepEmp,
    roleDepartmentToggle,
    myDepartmentsCalledOnce,
    setPaginationCountDepEmp,
    myDepartmentEmployees, 
    setMyDepartmentEmployees
  } = useContext(AppContext);

  const [getMyDepartmentInfo] = useLazyQuery(GET_MY_DEPARTMENT_INFO, {
    onCompleted: (myDepartmentInformation) => {
      try {
        setPaginationCountDepEmp(Math.ceil(myDepartmentInformation.getMyDepartmentInfo.myDepartmentEmployees.length / 10));
        setPaginationDepEmpArray(myDepartmentInformation.getMyDepartmentInfo.myDepartmentEmployees.slice(0, 10));
        setMyDepartmentEmployees(myDepartmentInformation.getMyDepartmentInfo)
      } catch (e) {
        console.log(e);
      }
    },
  });

  useEffect(async () => {
    if (myDepartmentsCalledOnce.current) {
      return;
    } else {
      await getMyDepartmentInfo({ variables: { deptNo: loginInfo.user.dept_no } });
      myDepartmentsCalledOnce.current = true;
    }
  }, []);

  return (
    <>
    {!myDepartmentEmployees ? <LoadingButtonComponent loadSpinner={!myDepartmentEmployees} /> :
    <div>
      <h1 className={styles.headerMain}>Department</h1>
      <div className={styles.departmentName}>{myDepartmentEmployees.deptName}</div>
      <EmployeeTable
        manager={true}
        arrayToPaginate={myDepartmentEmployees.myDepartmentEmployees}
        paginatedArray={paginationDepEmpArray}
        setPaginatedArray={setPaginationDepEmpArray}
        paginationCount={paginationCountDepEmp}
        paginationPage={paginationPageDepEmp}
        setPaginationPage={setPaginationPageDepEmp}
      />
      {employeeDepInfo && (
        <>
          <InformationBasic employeeInfo={employeeDepInfo} />
          <RoleDepartmentToggle />
          {roleDepartmentToggle ? (
            <InformationRoleHistory employeeInfo={employeeDepInfo} />
          ) : (
            <InformationDepartmentHistory employeeInfo={employeeDepInfo} />
          )}
          <InformationSalary
            arrayToPaginate={employeeDepInfo.salaryInfo}
            paginatedArray={paginationSalaryArrayDepEmp}
            setPaginatedArray={setPaginationSalaryArrayDepEmp}
            paginationCount={paginationCountSalaryDepEmp}
            paginationPage={paginationPageSalaryDepEmp}
            setPaginationPage={setPaginationPageSalaryDepEmp}
          />
        </>
      )}
    </div>}
    </>
  );
}

export default MyDepartment;
