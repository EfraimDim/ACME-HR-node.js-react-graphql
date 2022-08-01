import styles from "../styles/DepartmentsTable.module.css";
import { useContext } from "react";
import { AppContext } from "./AppContext";

function DepartmentsTable() {
  const { loginInfo, setAddDepartment, displayEmployeeDetails, myOrganisation} = useContext(AppContext);

  const toggleAddDepartment = () => {
    setAddDepartment(true);
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Departments</h2>
        <div onClick={toggleAddDepartment} className={styles.hrLink}>
          Add Department
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.departmentWrapper}>
          <div className={styles.tableHeader}>Dept Number</div>
          <div className={styles.tableHeader}>Department</div>
          <div className={styles.tableHeader}>Manager's Last Name</div>
          <div className={styles.tableHeader}>Manager's First Name</div>
          <div className={styles.tableHeader}>No. Employees</div>
        </div>
        {myOrganisation.deptWithManagersList.map((department, index) => {
          return (
            <div key={index} className={styles.departmentWrapper} onClick={() => displayEmployeeDetails(department.manager.emp_no)}>
              <div className={styles.tableInfo}>{department.deptNo}</div>
              <div className={styles.tableInfo}>{department.deptName}</div>
              <div className={styles.tableInfo}>{department.manager.last_name}</div>
              <div className={styles.tableInfo}>{department.manager.first_name}</div>
              <div className={styles.tableInfo}>{department.noEmp}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DepartmentsTable;
