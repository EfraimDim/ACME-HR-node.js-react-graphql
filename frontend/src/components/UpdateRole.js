import styles from "../styles/UpdateRole.module.css";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { TextField, MenuItem } from "@mui/material";
import { EDIT_EMPLOYEE_ROLE } from "../graphql/mutations";
import swal from "sweetalert";
import { useMutation } from "@apollo/client";

function UpdateRole() {
  const { setUpdateRole, employeeDepInfo, loginInfo, getEmployeeDetails, getPaginatedColleagues, colleaguesCursor } = useContext(AppContext);

  const [newRole, setNewRole] = useState("");
  const [newRoleStartDate, setNewRoleStartDate] = useState(new Date().toISOString().split("T")[0]);

  const handleNewRole = (e) => {
    setNewRole(e.target.value);
  };

  const handleNewRoleStartDate = (e) => {
    setNewRoleStartDate(e.target.value);
  };

  const cancelUpdateRole = () => {
    setUpdateRole(false);
  };

  const [editEmployeeRole] = useMutation(EDIT_EMPLOYEE_ROLE, {
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
          text: `${editEmployeeData.editEmployeeRole.message}`,
          icon: "success",
          button: "continue!",
        });
        await getEmployeeDetails({ variables: { empNo: employeeDepInfo.user.emp_no, accessibility: loginInfo.user.accessibility } });
        await getPaginatedColleagues({ variables: { limit: 1000, cursor: colleaguesCursor } });
        setUpdateRole(false);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleRoleUpdate = async (ev) => {
    try {
      ev.preventDefault();
      await editEmployeeRole({
        variables: {
          empNum: employeeDepInfo.user.emp_no,
          departmentNo: employeeDepInfo.deptInfo[0].dept_no,
          originalRole: employeeDepInfo.titleInfo[0].title,
          newRole: newRole,
          newRoleStartDate: newRoleStartDate,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Role History</h2>
        <div onClick={cancelUpdateRole} className={styles.hrLink}>
          Cancel
        </div>
      </div>
      <form onSubmit={handleRoleUpdate}>
        <div className={styles.formWrapper}>
          <div className={styles.formColumn}>
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.titleInfo[0].title}
              sx={{ margin: "20px" }}
              label="Current Role"
            />
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.titleInfo[0].from_date}
              sx={{ margin: "20px" }}
              label="Current Role Start Date"
            />
          </div>
          <div className={styles.formColumn}>
            <TextField select size="small" required value={newRole} onChange={handleNewRole} sx={{ margin: "20px" }} label="New Role">
              {loginInfo.titlesList.map((title, index) => {
                return (
                  <MenuItem key={index} value={title.title}>
                    {title.title}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              size="small"
              required
              type="text"
              value={newRoleStartDate}
              onChange={handleNewRoleStartDate}
              sx={{ margin: "20px" }}
              label="New Role Start Date"
            />
          </div>
        </div>
        <input className={styles.hrLink} value={"Update Role"} type="submit" />
      </form>
    </div>
  );
}

export default UpdateRole;
