import styles from "../styles/InfoComponents.module.css";
import { Routes, Route } from "react-router-dom";
import MyInformation from "./MyInformation";
import MyDepartment from "./MyDepartment";
import MyOrganisation from "./MyOrganisation";
import EmployeeTable from "./EmployeeTable";
import { useContext } from "react";
import { AppContext } from "./AppContext";

function InfoComponents() {
  const {
    paginationPageEmployee,
    setPaginationPageEmployee,
    setPaginationEmployeeArray,
    paginationEmployeeArray,
    paginationCountEmployee,
    hasNextPage,
    loginInfo
  } = useContext(AppContext);
  return (
    <div className={styles.informationPage}>
      <Routes>
        <Route path="/information" element={<MyInformation />}></Route>
        <Route path="/department" element={<MyDepartment />}></Route>
        <Route path="/organisation" element={<MyOrganisation />}></Route>
        <Route
          path="/"
          element={
            <>
              <h1 className={styles.headerMain}>Colleagues</h1>
              <EmployeeTable
                manager={false}
                hasNextPage={hasNextPage}
                allColeagues={true}
                arrayToPaginate={loginInfo.colleagues}
                paginatedArray={paginationEmployeeArray}
                setPaginatedArray={setPaginationEmployeeArray}
                paginationCount={paginationCountEmployee}
                paginationPage={paginationPageEmployee}
                setPaginationPage={setPaginationPageEmployee}
              />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default InfoComponents;
