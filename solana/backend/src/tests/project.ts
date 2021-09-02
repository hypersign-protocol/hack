import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app";

//Assertion Style
chai.should();

chai.use(chaiHttp);

let chaiServer;
let projectCount;

let projectData = {
  projectName: "Test New Project",
  logoUrl: "http://localhost:xyz.png",
  fromDate: new Date().toString(),
  toDate: new Date().toString(),
  ownerDid: "did:hs:1231231",
  twitterHandle: "hermit1@",
  telegramHandle: "hermit1@",
};

describe("API testing /api/v1/project", () => {
  beforeEach(() => {
    chaiServer = chai.request(server);
  });

  it("should be able to GET projectCount", (done) => {
    chaiServer.get("/api/v1/project").end((err, response) => {
      response.should.have.status(200);
      response.body.should.be.a("array");
      projectCount = response.body.length;
      done();
    });
  });

  it("should NOT add (POST) a new project since any one paramter is empty", (done) => {
    const tempProjectData = { ...projectData };
    tempProjectData.projectName = "";
    chaiServer
      .post("/api/v1/project")
      .send(tempProjectData)
      .end((err, response) => {
        response.should.have.status(400);
        // response.should.be.equal("projectName, logoUrl, fromDate, toDate can not be empty")
        done();
      });
  });

  it("should NOT add (POST) a new project since fromDate can not greater than toDate", (done) => {
    const tempProjectData = { ...projectData };
    tempProjectData.fromDate = "16/11/2020";
    tempProjectData.toDate = "12/11/2020";
    chaiServer
      .post("/api/v1/project")
      .send(tempProjectData)
      .end((err, response) => {
        response.should.have.status(400);
        // response.should.be.equal("projectName, logoUrl, fromDate, toDate can not be empty")
        done();
      });
  });

  it("should be able to add (POST) a new project", (done) => {
    chaiServer
      .post("/api/v1/project")
      .send(projectData)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("_id");
        projectData["_id"] = response.body["_id"];

        // response.should.be.equal("projectName, logoUrl, fromDate, toDate can not be empty")
        done();
      });
  });

  it("should GET all projects", (done) => {
    chaiServer.get("/api/v1/project").end((err, response) => {
      response.should.have.status(200);
      response.body.should.be.a("array");
      response.body.length.should.be.eq(projectCount + 1);
      done();
    });
  });

  it("should GET a specific project", (done) => {
    chaiServer
      .get("/api/v1/project/" + projectData["_id"])
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("_id").eq(projectData["_id"]);
        response.body.should.have
          .property("projectName")
          .eq("Test New Project");
        response.body.should.have.property("twitterHandle").eq("hermit1@");
        response.body.should.have.property("telegramHandle").eq("hermit1@");
        response.body.should.have.property("ownerDid").eq("did:hs:1231231");
        done();
      });
  });

  it("should be able to update (PUT) a project", (done) => {
    const tempProjectData = { ...projectData };
    tempProjectData.projectName = "Test New Project Updated";
    tempProjectData.twitterHandle = "hermit1@update";
    tempProjectData.telegramHandle = "hermit1@update";
    chaiServer
      .put("/api/v1/project")
      .send(tempProjectData)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("_id").eq(projectData["_id"]);
        response.body.should.have
          .property("projectName")
          .eq("Test New Project Updated");
        response.body.should.have
          .property("twitterHandle")
          .eq("hermit1@update");
        response.body.should.have
          .property("telegramHandle")
          .eq("hermit1@update");
        response.body.should.have.property("ownerDid").eq("did:hs:1231231");

        done();
      });
  });

  it("should DELETE a specific project", (done) => {
    chaiServer
      .delete("/api/v1/project/" + projectData["_id"])
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });
});
