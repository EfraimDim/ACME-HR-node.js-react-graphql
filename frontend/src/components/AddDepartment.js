import styles from "../styles/UpdateRole.module.css";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { TextField } from "@mui/material";
import { ADD_DEPARTMENT } from "../graphql/mutations";
import swal from "sweetalert";
import { useMutation } from "@apollo/client";

function AddDepartment() {
  const { colleaguesCursor, getMyOrganisationInfo, setAddDepartment, getPaginatedColleagues, myOrganisation } =
    useContext(AppContext);

  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newDepartmentNumber, setNewDepartmentNumber] = useState(parseInt(myOrganisation.deptWithManagersList.at(-1).deptNo.slice(-3)) + 1);
  const [managersEmpNum, setManagersEmpNum] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);

  const handleNewDepartmentName = (e) => {
    setNewDepartmentName(e.target.value);
  };

  const handleNewDepartmentNumber = (e) => {
    setNewDepartmentNumber(e.target.value);
  };

  const handleManagersEmpNum = (e) => {
    setManagersEmpNum(e.target.value);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const cancelAddDepartment = () => {
    setAddDepartment(false);
  };

  const [addDepartment] = useMutation(ADD_DEPARTMENT, {
    onError: (error) => {
      swal({
        title: "Add Department Failed!",
        text: `${error.message}`,
        icon: "error",
        button: "okay",
      });
      console.log(error);
    },
    onCompleted: async(addDepartmentData) => {
      try {
        swal({
          title: "Success!",
          text: `${addDepartmentData.addDepartment.message}`,
          icon: "success",
          button: "continue!",
        });
        await getPaginatedColleagues({ variables: { limit: 1000, cursor: colleaguesCursor } });
        await getMyOrganisationInfo();
        setAddDepartment(false);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleAddDepartment = async (ev) => {
    try {
      ev.preventDefault();
      await addDepartment({
        variables: {
          deptNo: `d0${newDepartmentNumber}`,
          deptName: newDepartmentName,
          managersEmpNum: managersEmpNum,
          startDate: startDate,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Add Department</h2>
        <div onClick={cancelAddDepartment} className={styles.hrLink}>
          Cancel
        </div>
      </div>
      <form onSubmit={handleAddDepartment}>
        <div className={styles.formWrapper}>
          <div className={styles.formColumn}>
            <TextField
              size="small"
              required
              type="text"
              value={newDepartmentName}
              onChange={handleNewDepartmentName}
              sx={{ margin: "20px" }}
              label="Department Name"
            />
            <TextField
              size="small"
              disabled={true}
              required
              type="text"
              value={`d0${newDepartmentNumber}`}
              onChange={handleNewDepartmentNumber}
              sx={{ margin: "20px" }}
              label="Department Number"
            />
          </div>
          <div className={styles.formColumn}>
            <TextField
              size="small"
              required
              type="text"
              value={managersEmpNum}
              onChange={handleManagersEmpNum}
              sx={{ margin: "20px" }}
              label="Managers Employee Number"
            />
            <TextField size="small" required type="date" value={startDate} onChange={handleStartDate} sx={{ margin: "20px" }} label="Starting Date" />
          </div>
        </div>
        <input className={styles.hrLink} value={"Add Department"} type="submit" />
      </form>
    </div>
  );
}

export default AddDepartment;
