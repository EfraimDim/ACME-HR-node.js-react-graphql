import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import swal from "sweetalert";
import AddAndEditEmployeeForm from "./AddAndEditEmployeeForm";
import { useMutation } from "@apollo/client";
import { EDIT_EMPLOYEE } from "../graphql/mutations"

function EditEmployee() {
  const { employeeDepInfo, colleaguesCursor, getEmployeeDetails, getPaginatedColleagues, loginInfo } = useContext(AppContext);

  const [firstName, setFirstName] = useState(employeeDepInfo.user.first_name);
  const [lastName, setLastName] = useState(employeeDepInfo.user.last_name);
  const [gender, setGender] = useState(employeeDepInfo.user.gender);
  const [birthDate, setBirthDate] = useState(employeeDepInfo.user.birth_date);
  const [empNum, setEmpNum] = useState(employeeDepInfo.user.emp_no);
  const [role, setRole] = useState(employeeDepInfo.titleInfo[0].title);
  const [department, setDepartment] = useState(employeeDepInfo.deptInfo[0].dept_no);
  const [hireDate, setHireDate] = useState(employeeDepInfo.user.hire_date);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleBirthDate = (e) => {
    setBirthDate(e.target.value);
  };

  const handleEmpNum = (e) => {
    setEmpNum(e.target.value);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleHireDate = (e) => {
    setHireDate(e.target.value);
  };

  const [editEmployee] = useMutation(EDIT_EMPLOYEE, {
    onError: (error) => {
      swal({
        title: "Edit Employee Failed!",
        text: `${error.message}`,
        icon: "error",
        button: "okay",
      });
      console.log(error);
    },
    onCompleted: async(editEmployeeData) => {
      try {
        console.log(editEmployeeData)
        swal({
          title: "Success!",
          text: `${editEmployeeData.editEmployee.message}`,
          icon: "success",
          button: "continue!",
        });
        await getEmployeeDetails({ variables: { empNo: empNum, accessibility: loginInfo.user.accessibility } });
        await getPaginatedColleagues({ variables: { limit: 1000, cursor: colleaguesCursor } });
      } catch (e) {
        console.log(e);
      }
    },
  });

  const editAnEmployee = async (ev) => {
    try {
      ev.preventDefault();
      const currentDate = new Date().toISOString().split("T")[0];
      await editEmployee({
        variables: {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          birthDate: birthDate,
          empNum: empNum,
          originalDeptNo: employeeDepInfo.deptInfo[0].dept_no,
          originalRole: employeeDepInfo.titleInfo[0].title,
          role: role,
          department: department,
          hireDate: hireDate,
          currentDate: currentDate,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <AddAndEditEmployeeForm
        handleSubmit={editAnEmployee}
        firstName={firstName}
        lastName={lastName}
        gender={gender}
        birthDate={birthDate}
        empNum={empNum}
        role={role}
        department={department}
        hireDate={hireDate}
        handleFirstName={handleFirstName}
        handleLastName={handleLastName}
        handleGender={handleGender}
        handleBirthDate={handleBirthDate}
        handleEmpNum={handleEmpNum}
        handleRole={handleRole}
        handleDepartment={handleDepartment}
        handleHireDate={handleHireDate}
        addEmployee={false}
      />
    </div>
  );
}

export default EditEmployee;
