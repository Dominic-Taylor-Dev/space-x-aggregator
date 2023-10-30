import request from "supertest";
import express from "express";
import { getAllLaunches } from "./controllers";

const mockErrorReference = "mock-error-ref";
jest.mock("../../common/errors", () => ({
  errorReferenceCode: jest.fn(() => mockErrorReference),
}));

const singleLaunchesSuccessResponse: LaunchData[] = [
  {
    id: "1",
    name: "Launch 1",
    rocket: "1",
    launchpad: "1",
    details: "Launch details",
    date_utc: "2023-10-25T10:00:00.000Z",
    success: true,
  },
];
let isLaunchResponseSuccess: boolean;
let launchesSuccessResponseData: LaunchData[];

const rocketsSuccessResponse: RocketData[] = [
  {
    id: "1",
    name: "Rocket 1",
  },
];
const launchpadSuccessResponse: RocketData[] = [
  {
    id: "1",
    name: "Launchpad 1",
  },
];

jest.mock("./space-x-service", () => {
  return {
    getLaunchData: jest.fn(() => {
      if (isLaunchResponseSuccess) {
        return Promise.resolve({
          status: 200,
          data: launchesSuccessResponseData,
        });
      }

      return Promise.reject();
    }),
    getRocketData: jest.fn(() =>
      Promise.resolve({ status: 200, data: rocketsSuccessResponse })
    ),
    getLaunchpadData: jest.fn(() =>
      Promise.resolve({ status: 200, data: launchpadSuccessResponse })
    ),
  };
});

const app = express();
app.get("/launches", getAllLaunches);

describe("GET /launches", () => {
  beforeEach(() => {
    isLaunchResponseSuccess = true;
    launchesSuccessResponseData = singleLaunchesSuccessResponse;
  });

  it("should return a successful response when all calls to SpaceX API succeed", async () => {
    const response = await request(app).get("/launches");

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);

    const expectedResponse: LaunchesApiResult = {
      results: [
        {
          id: "1",
          launchName: "Launch 1",
          rocketName: "Rocket 1",
          launchpadName: "Launchpad 1",
          details: "Launch details",
          date: "2023-10-25T10:00:00.000Z",
          success: true,
        },
      ],
    };
    expect(response.body).toEqual(expectedResponse);
  });

  it("should return a successful response when all calls to SpaceX API succeed, with 15 launches returned, but limit own response to 10 records", async () => {
    const launchesResponse = new Array(15).fill(
      singleLaunchesSuccessResponse[0]
    );
    isLaunchResponseSuccess = true;
    launchesSuccessResponseData = launchesResponse;

    const response = await request(app).get("/launches");

    expect(response.status).toBe(200);
    expect(response.body.results.length).toEqual(10);
  });

  it("should return a successful response when all calls to SpaceX API succeed, and return same number of records as provided by SpaceX API when there are 10 or fewer", async () => {
    const launchesResponse = new Array(3).fill(
      singleLaunchesSuccessResponse[0]
    );
    isLaunchResponseSuccess = true;
    launchesSuccessResponseData = launchesResponse;

    const response = await request(app).get("/launches");

    expect(response.status).toBe(200);
    expect(response.body.results.length).toEqual(3);
  });

  it("should return an error (500) response when a single call to SpaceX API fails", async () => {
    isLaunchResponseSuccess = false;

    const response = await request(app).get("/launches");

    expect(response.status).toBe(500);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({
      message: "An error occurred while fetching data from SpaceX API.",
      referenceCode: mockErrorReference,
    });
  });
});
