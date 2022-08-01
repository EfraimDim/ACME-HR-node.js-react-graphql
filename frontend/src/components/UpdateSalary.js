import styles from "../styles/UpdateRole.module.css";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { TextField } from "@mui/material";
import { EDIT_EMPLOYEE_SALARY } from "../graphql/mutations";
import swal from "sweetalert";
import { useMutation } from "@apollo/client";

function UpdateSalary() {
  const { setUpdateSalary, employeeDepInfo, loginInfo, getEmployeeDetails } = useContext(AppContext);

  const [newSalary, setNewSalary] = useState("");
  const [newSalaryStartDate, setNewSalaryStartDate] = useState(new Date().toISOString().split("T")[0]);

  const handleNewSalary = (e) => {
    setNewSalary(e.target.value);
  };

  const handleNewSalaryStartDate = (e) => {
    setNewSalaryStartDate(e.target.value);
  };

  const cancelUpdateSalary = () => {
    setUpdateSalary(false);
  };

  const [editEmployeeSalary] = useMutation(EDIT_EMPLOYEE_SALARY, {
    onError: (error) => {
      swal({
        title: "Edit Employee Failed!",
        text: `${error.message}`,
        icon: "error",
        button: "okay",
      });
      console.log(error);
    },
    onCompleted: async (editEmployeeData) => {
      try {
        swal({
          title: "Success!",
          text: `${editEmployeeData.editEmployeeSalary.message}`,
          icon: "success",
          button: "continue!",
        });
        await getEmployeeDetails({ variables: { empNo: employeeDepInfo.user.emp_no, accessibility: loginInfo.user.accessibility } });
        setUpdateSalary(false);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleSalaryUpdate = async (ev) => {
    try {
      ev.preventDefault();
      await editEmployeeSalary({
        variables: {
          empNum: employeeDepInfo.user.emp_no,
          newSalary: newSalary,
          newSalaryStartDate: newSalaryStartDate,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Salary History</h2>
        <div onClick={cancelUpdateSalary} className={styles.hrLink}>
          Cancel
        </div>
      </div>
      <form onSubmit={handleSalaryUpdate}>
        <div className={styles.formWrapper}>
          <div className={styles.formColumn}>
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.salaryInfo[0].salary}
              sx={{ margin: "20px" }}
              label="Current Salary"
            />
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.salaryInfo[0].from_date}
              sx={{ margin: "20px" }}
              label="Current Salary Start Date"
            />
          </div>
          <div className={styles.formColumn}>
            <TextField size="small" required type="text" value={newSalary} onChange={handleNewSalary} sx={{ margin: "20px" }} label="New Salary" />
            <TextField
              size="small"
              required
              type="text"
              value={newSalaryStartDate}
              onChange={handleNewSalaryStartDate}
              sx={{ margin: "20px" }}
              label="New Salary Start Date"
            />
          </div>
        </div>
        <input className={styles.hrLink} value={"Update Salary"} type="submit" />
      </form>
    </div>
  );
}

export default UpdateSalary;
