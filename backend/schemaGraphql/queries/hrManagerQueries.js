const { getDepartmentInfoForHR } = require("../../queries/getDepartmentInfoForHR");
const { getDepartmentManagerInfoForHR } = require("../../queries/getDepartmentManagerInfoForHR");
const { MyOrganisationType } = require("../typeDefs/getMyOrganisationInfo");
const { getTitlesList } = require("../../queries/getTitlesList");

const GET_MY_ORGANISATION_INFO = {
  type: MyOrganisationType,
  async resolve() {
    try {
      const titlesList = await getTitlesList();
      const managersList = await getDepartmentManagerInfoForHR();
      const departmentList = await getDepartmentInfoForHR();
      departmentList.pop();
      const deptWithManagersList = departmentList.map((department) => {
        const deptName = department["Departments.dept_name"];
        const deptNo = department["Departments.dept_no"];
        const managerOfDepartment = managersList.filter((manager) => manager.dataValues.dept_no === deptNo);
        const departmentWithManager = {
          deptName: deptName,
          deptNo: deptNo,
          manager: managerOfDepartment[0].dataValues.Employee,
          noEmp: department.noEmp,
        };
        return departmentWithManager;
      });
      return { deptWithManagersList, titlesList };
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

module.exports = { GET_MY_ORGANISATION_INFO };
