/**
 * Created by kidroca on 4.12.2016 г..
 */
"use strict";

const mockRequire = require("mock-require");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const request = require("supertest");

chai.should();
chai.use(sinonChai);

describe("Team interceptor tests", () => {

    const testRoute = "/test";
    let teamInterceptor, app, defaultRouteHanler, stubRepo;

    beforeEach(() => {
        stubRepo = stubRepository();

        mockRequire("../../source/data/TeamRepository", stubRepo);
        // bypasses require cache without cache
        teamInterceptor = mockRequire.reRequire("../../source/midlleware/team-interceptor");

        app = express();
        app.use(session({ secret: "secret" }));
        app.use(flash());
        defaultRouteHanler = sinon.spy();
    });

    it("Should call the repository with the received request id", (done) => {

        app.get(`${testRoute}/:id`, teamInterceptor, currentRouteHandler);

        const id = "500";
        stubRepo.get = sinon.stub().returns(Promise.resolve({ id }));

        request(app)
            .get(`${testRoute}/${id}`)
            .expect(200, err => done(err));

        function currentRouteHandler(req, res) {
            stubRepo.get.should.have.been.calledWith(id);
            done();

            res.status(200);
        }
    });

    it("Should assign a team to `req` when a team is returned from the repository", (done) => {

        app.get(`${testRoute}/:id`, teamInterceptor, currentRouteHandler);

        const id = "500";
        const repoResponse = { id };
        stubRepo.get.returns(Promise.resolve(repoResponse));

        request(app)
            .get(`${testRoute}/${id}`)
            .expect(200, (err) => done(err));

        function currentRouteHandler(req, res) {
            req.team.should.equal(repoResponse);
            done();

            res.status(200);
        }
    });

    it("Should redirect back when there is no `id`", (done) => {

        app.get(testRoute, teamInterceptor, defaultRouteHanler);

        request(app)
            .get(testRoute)
            .expect(302, (err, res) => {
                if (err) {
                    done(err);
                }

                res.redirect.should.equal(true);
                done();
            });
    });

    it("Should redirect back when the team is not found", (done) => {

        app.get(`${testRoute}/:id`, teamInterceptor, defaultRouteHanler);

        const id = "500";
        stubRepo.get = sinon.stub().returns(Promise.resolve(null));

        request(app)
            .get(`${testRoute}/${id}`)
            .expect(302, (err, res) => {
                if (err) {
                    done(err);
                }

                res.redirect.should.equal(true);
                done();
            });
    });

    it("Should redirect back when `CastError` is caught", (done) => {

        app.get(`${testRoute}/:id`, teamInterceptor, defaultRouteHanler);

        const id = "500";
        let err = new Error("Test error");
        err.name = "CastError";

        stubRepo.get = sinon.stub().returns(Promise.reject(err));

        request(app)
            .get(`${testRoute}/${id}`)
            .expect(302, (err, res) => {
                if (err) {
                    done(err);
                }

                res.redirect.should.equal(true);
                done();
            });
    });

    it("Should rethrow errors other than `CastError`", (done) => {

        app.get(`${testRoute}/:id`, teamInterceptor, defaultRouteHanler);

        const id = "500";
        let err = new Error("Test error");

        stubRepo.get = sinon.stub().returns(Promise.reject(err));

        request(app)
            .get(`${testRoute}/${id}`)
            .expect(500, err => done(err));
    });
});

function stubRepository() {

    // noinspection Eslint
    const IRepository = require("../../source/data/IRepository");
    let stub = sinon.createStubInstance(IRepository);

    return stub;
}