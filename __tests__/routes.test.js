const request = require('supertest')
const app = require('../app.js')

describe("Test Suite Covid-19 API", () => {

    test("Get one Country", done => {
      request(app)
        .get("/v1/country/Brazil")
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual(
            expect.objectContaining({
                country : "Brazil"
            }));
          done();
        });
    });


    test("Get All Countries", done => {
        request(app)
          .get("/v1/country")
          .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                      country : "Brazil"
                    },
                    {
                      country : "Canada"
                    },
                    {
                      country : "United States"
                    })
            ]));
            done();
          });
      });

      test("Get one Country timeline", done => {
        request(app)
          .get("/v1/country/Brazil?view=timeline")
          .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(
              expect.objectContaining({
                  timeline : expect.arrayContaining([
                    expect.objectContaining({
                    confirmed: 2,
                    deaths: 0,
                    recovered: 0
                  })])
              }));
            done();
          });
      });
    
});

