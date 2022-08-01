import styles from "../styles/AddEmployee.module.css";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import swal from "sweetalert";
import AddAndEditEmployeeForm from "./AddAndEditEmployeeForm";
import { useMutation } from "@apollo/client";
import { ADD_EMPLOYEE } from "../graphql/mutations"

function AddEmployee() {
  const { setAddEmployee, loginInfo, setPaginationCountEmployee, setPaginationEmployeeArray } = useContext(AppContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [empNum, setEmpNum] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [hireDate, setHireDate] = useState(new Date().toISOString().split("T")[0]);
  const [salary, setSalary] = useState("");

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

  const handleSalary = (e) => {
    setSalary(e.target.value);
  };

  const toggleAddEmployee = () => {
    setAddEmployee(false);
  };

  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    onError: (error) => {
      swal({
        title: "Add Employee Failed!",
        text: `${error.message}`,
        icon: "error",
        button: "okay",
      });
      console.log(error);
    },
    onCompleted: (addEmployeeData) => {
      try {
        const newEmployee = {
          Titles: [{ title: role, to_date: "9999-01-01" }],
          first_name: firstName,
          last_name: lastName,
          emp_no: empNum,
          hire_date: hireDate,
        };
        const newColleaguesArray = [...loginInfo.colleagues.colleagues];
        newColleaguesArray.unshift(newEmployee);
        setPaginationCountEmployee(Math.ceil(newColleaguesArray.length / 10));
        setPaginationEmployeeArray(newColleaguesArray.slice(0, 10));
        setFirstName("");
        setLastName("");
        setGender("");
        setBirthDate("2000-01-01");
        setDepartment("");
        setEmpNum("");
        setRole("");
        setHireDate(new Date().toISOString().split("T")[0]);
        setSalary("");
        swal({
          title: "Success!",
          text: `${addEmployeeData.addEmployee.message}`,
          icon: "success",
          button: "continue!",
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  const addNewEmployee = async (ev) => {
    try {
      ev.preventDefault();
      await addEmployee({
        variables: {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          birthDate: birthDate,
          empNum: empNum,
          role: role,
          department: department,
          hireDate: hireDate,
          salary: salary,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div onClick={toggleAddEmployee} className={styles.hrLink}>
        Cancel
      </div>
      <h1>Employee Information</h1>
      <AddAndEditEmployeeForm
        handleSubmit={addNewEmployee}
        firstName={firstName}
        lastName={lastName}
        gender={gender}
        birthDate={birthDate}
        empNum={empNum}
        role={role}
        department={department}
        hireDate={hireDate}
        salary={salary}
        handleFirstName={handleFirstName}
        handleLastName={handleLastName}
        handleGender={handleGender}
        handleBirthDate={handleBirthDate}
        handleEmpNum={handleEmpNum}
        handleRole={handleRole}
        handleDepartment={handleDepartment}
        handleHireDate={handleHireDate}
        handleSalary={handleSalary}
        addEmployee={true}
      />
    </div>
  );
}

export default AddEmployee;
