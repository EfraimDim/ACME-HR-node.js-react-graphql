import InformationBasic from "./InformationBasic";
import InformationRoleHistory from "./InformationRoleHistory";
import InformationDepartmentHistory from "./InformationDepartmentHistory";
import InformationSalary from "./InformationSalary";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import RoleDepartmentToggle from "./RoleDepartmentToggle";
import { useLazyQuery } from "@apollo/client";
import { GET_MY_INFORMATION } from "../graphql/queries";

function MyInformation() {
  const {
    loginInfo,
    setPaginationSalaryArray,
    paginationSalaryArray,
    paginationCountSalary,
    paginationPageSalary,
    setPaginationPageSalary,
    roleDepartmentToggle,
    myInformationCalledOnce,
    myInformation,
    setMyInformation,
    setPaginationCountSalary
  } = useContext(AppContext);

  const [getMyInformation] = useLazyQuery(GET_MY_INFORMATION, {
    onCompleted: (myInformation) => {
      try {
        setPaginationCountSalary(Math.ceil(myInformation.getMyInformation.salaryInfo.length / 10));
        setPaginationSalaryArray(myInformation.getMyInformation.salaryInfo.slice(0, 10));
        const user = loginInfo.user
        setMyInformation({user, ...myInformation.getMyInformation});
      } catch (e) {
        console.log(e);
      }
    },
  });

  useEffect(async () => {
    if (myInformationCalledOnce.current) {
      return;
    } else {
      await getMyInformation({ variables: { employeeID: loginInfo.user.emp_no} });
      myInformationCalledOnce.current = true;
    }
  }, []);

  return (
    <>
    {myInformation && <div>
      <InformationBasic employeeInfo={myInformation} />
      <RoleDepartmentToggle />
      {roleDepartmentToggle ? <InformationRoleHistory employeeInfo={myInformation} /> : <InformationDepartmentHistory employeeInfo={myInformation} />}
      <InformationSalary
        arrayToPaginate={myInformation.salaryInfo}
        paginatedArray={paginationSalaryArray}
        setPaginatedArray={setPaginationSalaryArray}
        paginationCount={paginationCountSalary}
        paginationPage={paginationPageSalary}
        setPaginationPage={setPaginationPageSalary}
      />
    </div>}
    </>
  );
}

export default MyInformation;
