import { useState, useContext } from "react";
import styles from "../styles/Login.module.css";
import { TextField } from "@mui/material";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";


function Login() {
  const {
    setLoadSpinner,
    userLogin,
  } = useContext(AppContext);

  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");



  const navigate = useNavigate();

  const handleEmployeeID = (e) => {
    setEmployeeID(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async (ev) => {
    try {
      ev.preventDefault();
      setLoadSpinner(true);
      await userLogin({ variables: { employeeID: employeeID, password: password} });
      navigate("/");
      setEmployeeID("");
      setPassword("");
      setLoadSpinner(false);
    } catch (e) {
      setLoadSpinner(false);
      console.log(e);
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={login}>
        <h1 className={styles.header}>Login</h1>

        <TextField
          size="large"
          required
          type="text"
          value={employeeID}
          onChange={handleEmployeeID}
          InputLabelProps={{ style: { color: "#fff" } }}
          sx={{ margin: "20px" }}
          inputProps={{ style: { color: "#fff" } }}
          label="Employee ID"
        />

        <TextField
          size="large"
          required
          type="text"
          value={password}
          onChange={handlePassword}
          InputLabelProps={{ style: { color: "#fff" } }}
          sx={{ margin: "20px" }}
          inputProps={{
            style: { color: "#fff" },
            minLength: 10,
            maxLength: 10,
          }}
          label="Birth Date: xxxx-xx-xx"
        />
        <button className={styles.button} type="submit">
          Enter!
        </button>
      </form>
    </div>
  );
}

export default Login;
