import { useContext } from "react";
import { AppContext } from "./AppContext";
import EmployeeTable from "./EmployeeTable";
import HREmployeeInformationView from "./HREmployeeInformationView";

function HREmployees() {
  const {
    loginInfo,
    paginationPageEmployee,
    setPaginationPageEmployee,
    setPaginationEmployeeArray,
    paginationEmployeeArray,
    paginationCountEmployee,
    hasNextPage,
  } = useContext(AppContext);

  return (
    <div>
      <EmployeeTable
        manager={true}
        hasNextPage={hasNextPage}
        allColeagues={true}
        arrayToPaginate={loginInfo.colleagues}
        paginatedArray={paginationEmployeeArray}
        setPaginatedArray={setPaginationEmployeeArray}
        paginationCount={paginationCountEmployee}
        paginationPage={paginationPageEmployee}
        setPaginationPage={setPaginationPageEmployee}
      />
      <HREmployeeInformationView />
    </div>
  );
}

export default HREmployees;
