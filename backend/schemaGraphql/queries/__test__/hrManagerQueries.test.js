const app = require("../../../app");
const request = require("supertest");
const { GET_MY_ORGANISATION_INFO_QUERY } = require("../../../../frontend/src/graphql/queries");

describe("Testing HR managers queries", () => {
  test("Testing get my organisation query", async () => {
    const myOrganisation = await request(app)
      .get("/graphql")
      .send({
        query: GET_MY_ORGANISATION_INFO_QUERY,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log(myOrganisation.body.data.getMyOrganisationInfo);
    expect(typeof myOrganisation.body.data.getMyOrganisationInfo.titlesList).toBe("object");
    expect(myOrganisation.body.data.getMyOrganisationInfo.titlesList[0]).toHaveProperty("title");
    expect(typeof myOrganisation.body.data.getMyOrganisationInfo.deptWithManagersList).toBe("object");
    expect(myOrganisation.body.data.getMyOrganisationInfo.deptWithManagersList[0]).toHaveProperty("deptName", "deptNo", "noEmp", "manager");
    expect(myOrganisation.body.data.getMyOrganisationInfo.deptWithManagersList[0].deptName).toBe("Marketing");
    expect(myOrganisation.body.data.getMyOrganisationInfo.deptWithManagersList[0].deptNo).toBe("d001");
  });
});
