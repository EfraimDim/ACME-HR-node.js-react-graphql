import styles from "../styles/EmployeeTable.module.css";
import { useState, useContext } from "react";
import { TextField, Typography, Pagination } from "@mui/material";
import { AppContext } from "./AppContext";

function EmployeeTable({
  arrayToPaginate,
  paginatedArray,
  setPaginatedArray,
  paginationCount,
  paginationPage,
  setPaginationPage,
  manager,
  hasNextPage,
  allColeagues,
}) {
  const { loginInfo, setAddEmployee, location, displayEmployeeDetails, colleaguesCursor, getPaginatedColleagues, setColleaguesCursor } =
    useContext(AppContext);

  const [employeeName, setEmployeeName] = useState("");

  const handlePagination = (e) => {
    const pageNumber = JSON.parse(e.target.innerText);
    setPaginationPage(pageNumber);
    const spliceStart = (pageNumber - 1) * 10;
    const spliceEnd = spliceStart + 10;
    setPaginatedArray(arrayToPaginate.slice(spliceStart, spliceEnd));
  };

  const handleEmployeeName = (e) => {
    setEmployeeName(e.target.value);
  };

  const searchEmployeeByName = (e) => {
    e.preventDefault();
  };

  const toggleAddEmployee = () => {
    setAddEmployee(true);
  };

  const showMoreColleages = async () => {
    try {
      const newColleaguesCursor = colleaguesCursor + 1000
      await getPaginatedColleagues({ variables: { limit: 1000, cursor: newColleaguesCursor } });
      setColleaguesCursor(newColleaguesCursor);
      setPaginationPage(1);
    } catch (e) {
      console.log(e);
    }
  };

  const showPreviousColleages = async () => {
    try {
      const newColleaguesCursor = colleaguesCursor - 1000
      setColleaguesCursor(newColleaguesCursor);
      await getPaginatedColleagues({ variables: { limit: 1000, cursor: newColleaguesCursor } });
      setPaginationPage(1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className={styles.searchWrapper}>
        <h2 className={styles.header}>Employees</h2>
        <form onSubmit={searchEmployeeByName} className={styles.employeeSearch}>
          <TextField
            size="small"
            required
            type="text"
            value={employeeName}
            onChange={handleEmployeeName}
            InputLabelProps={{ style: { color: "#fff" } }}
            inputProps={{ style: { color: "#fff" } }}
            label="Search By Employee Name"
          />
          <button className={styles.search} type="submit">
            Search!
          </button>
          {loginInfo.user.accessibility === "managerHR" && location.pathname === "/organisation" && (
            <div onClick={toggleAddEmployee} className={styles.hrLink}>
              Add Employee
            </div>
          )}
        </form>
      </div>

      <Typography sx={{ color: "white" }}>Page: {paginationPage}</Typography>
      <div className={styles.table}>
        <div className={styles.employeeWrapper}>
          <div className={styles.tableHeader}>First Name</div>
          <div className={styles.tableHeader}>Last Name</div>
          <div className={styles.tableHeader}>Job Title</div>
          <div className={styles.tableHeader}>Start Date</div>
        </div>
        {paginatedArray.map((employee, index) => {
          return (
            <div
              key={index}
              className={manager ? styles.employeeWrapperManager : styles.employeeWrapper}
              {...(manager && { onClick: () => displayEmployeeDetails(employee.emp_no) })}
            >
              <div className={styles.tableInfo}>{employee.first_name}</div>
              <div className={styles.tableInfo}>{employee.last_name}</div>
              <div className={styles.tableInfo}>{employee.Titles[0].title}</div>
              <div className={styles.tableInfo}>{employee.hire_date}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.paginationWrapper}>
        {allColeagues && (
          <button disabled={colleaguesCursor === 0} className={styles.paginationButton} onClick={showPreviousColleages}>
            Show Previous
          </button>
        )}
        <Pagination
          hideNextButton={true}
          hidePrevButton={true}
          className={styles.pagination}
          count={paginationCount}
          defaultPage={paginationPage}
          page={paginationPage}
          onChange={(e) => handlePagination(e)}
        />
        {allColeagues && (
          <button disabled={!hasNextPage} className={styles.paginationButton} onClick={showMoreColleages}>
            Show Next
          </button>
        )}
      </div>
    </div>
  );
}

export default EmployeeTable;
