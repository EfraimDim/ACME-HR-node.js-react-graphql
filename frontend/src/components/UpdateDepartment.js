import styles from "../styles/UpdateRole.module.css";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { TextField, MenuItem } from "@mui/material";
import { EDIT_EMPLOYEE_DEPARTMENT } from "../graphql/mutations";
import swal from "sweetalert";
import { useMutation } from "@apollo/client";

function UpdateDepartment() {
  const { setUpdateDepartment, employeeDepInfo, loginInfo, getEmployeeDetails, myOrganisation } = useContext(AppContext);

  const [newDepartment, setNewDepartment] = useState(employeeDepInfo.deptInfo[0].dept_no);
  const [newDepartmentStartDate, setNewDepartmentStartDate] = useState(new Date().toISOString().split("T")[0]);

  const handleNewDepartment = (e) => {
    setNewDepartment(e.target.value);
  };

  const handleNewDepartmentStartDate = (e) => {
    setNewDepartmentStartDate(e.target.value);
  };

  const cancelUpdateDepartment = () => {
    setUpdateDepartment(false);
  };

  const [editEmployeeDepartment] = useMutation(EDIT_EMPLOYEE_DEPARTMENT, {
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
          text: `${editEmployeeData.editEmployeeDepartment.message}`,
          icon: "success",
          button: "continue!",
        });
        await getEmployeeDetails({ variables: { empNo: employeeDepInfo.user.emp_no, accessibility: loginInfo.user.accessibility } });
        setUpdateDepartment(false);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleDepartmentUpdate = async (ev) => {
    try {
      ev.preventDefault();
      await editEmployeeDepartment({
        variables: {
          empNum: employeeDepInfo.user.emp_no,
          newDepartmentNo: newDepartment,
          newDepartmentStartDate: newDepartmentStartDate,
        },
      });
    } catch (e) {
      swal({
        title: "Edit Employee Failed!",
        text: `${e.response.data.message}`,
        icon: "error",
        button: "okay",
      });
      console.log(e);
    }
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Department History</h2>
        <div onClick={cancelUpdateDepartment} className={styles.hrLink}>
          Cancel
        </div>
      </div>
      <form onSubmit={handleDepartmentUpdate}>
        <div className={styles.formWrapper}>
          <div className={styles.formColumn}>
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.deptInfo[0].Department.dept_name}
              sx={{ margin: "20px" }}
              label="Current Department"
            />
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.deptInfo[0].from_date}
              sx={{ margin: "20px" }}
              label="Current Role Start Date"
            />
          </div>
          <div className={styles.formColumn}>
            <TextField
              select
              size="small"
              required
              sx={{ margin: "20px" }}
              value={newDepartment}
              label="New Department"
              onChange={handleNewDepartment}
            >
              {myOrganisation.deptWithManagersList.map((department, index) => {
                return (
                  <MenuItem key={index} value={department.deptNo}>
                    {department.deptName}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              size="small"
              required
              type="text"
              value={newDepartmentStartDate}
              onChange={handleNewDepartmentStartDate}
              sx={{ margin: "20px" }}
              label="New Department Start Date"
            />
          </div>
        </div>
        <input className={styles.hrLink} value={"Update Department"} type="submit" />
      </form>
    </div>
  );
}

export default UpdateDepartment;
