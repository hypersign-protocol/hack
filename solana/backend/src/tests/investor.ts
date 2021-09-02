import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.should();


chai.use(chaiHttp);

let chaiServer;
let investorCount;

// This token we have to get by logging into webapp
let HypersignAuthToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmlzaHdhcyBBbmFuZCAiLCJlbWFpbCI6InZpc2h1LmFuYW5kMUBnbWFpbC5jb20iLCJpZCI6ImRpZDpoczo2OGJhMjQxZC00YjE4LTQ3NjUtYjMyMS05ZGJiMmRkZjg1YWEiLCJpYXQiOjE2MTg0OTIwODEsImV4cCI6MTYxODYxMjA4MX0.hdjqoTNnaitdFwSyfbjr7nmtvBe8yMarrPXJkHDDfoo"


let mockData = {
    did: "did:hs:mock",
    email: "vishu.anand1@gmail.com",
    name: "mock_user",
    ethAddress: "0x123131MOCK",
    twitterHandle: "mock_twitter",
    telegramHandle: "mock_telegram",
    hasTwitted: false,
    hasJoinedTGgroup: false,
    projectId: "60783b6bb4659891e6c582aa",
    tweetUrl: "http://twitter.com/twwitId1=123123123"
};


describe("API testing for /api/v1/investor", () => {
    beforeEach(() => {
        chaiServer =  chai.request(server);
    })


    it("should NOT be able to add (POST) an investor since unauthorized", (done) => {
        try{
            chaiServer
            .post("/api/v1/investor")
            .send(mockData)
            .end((err, response) => {
                response.should.have.status(403);
            })
            done();
        }catch(e){

        }
    })


    it("should be able to add (POST) an investor", (done) => {
        chaiServer
            .post("/api/v1/investor")
            .set("Authorization", "Bearer " + HypersignAuthToken)
            .send(mockData)
            .end((err, response) => {
                response.should.have.status(200);
            })
            done();
    })


    it("should NOT be able to add GET an investor as did is not passed", (done) => {
        chaiServer
            .get("/api/v1/investor")
            .set("Authorization", "Bearer " + HypersignAuthToken)
            .end((err, response) => {
                response.should.have.status(400);
            })
            done();
    })

    it("should be able to add GET an investor", (done) => {
        chaiServer
            .get("/api/v1/investor/" + mockData.did)
            .set("Authorization", "Bearer " + HypersignAuthToken)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.length.should.be.eq(1);
                response.body[0].email.should.be.eq(mockData.email);
            })
            done();
    })
})