import axios from "axios";
import request from "supertest";
import express from "express";
import { getAllLaunches } from "./controllers";
import { getSpaceXApiBaseUrl } from "../../config/config";

const spaceXBaseApi = getSpaceXApiBaseUrl();

jest.mock("axios");
const launchesSuccessResponse: LaunchData[] = [
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

const app = express();
app.get("/launches", getAllLaunches);

describe("GET /launches", () => {
  it("should return a successful response when all calls to SpaceX API succeed", async () => {
    (axios.get as jest.Mock).mockImplementation((url) => {
      switch (url) {
        case `${spaceXBaseApi}/launches`:
          return Promise.resolve({
            status: 200,
            data: launchesSuccessResponse,
          });
        case `${spaceXBaseApi}/rockets`:
          return Promise.resolve({
            status: 200,
            data: rocketsSuccessResponse,
          });
        case `${spaceXBaseApi}/launchpads`:
          return Promise.resolve({
            status: 200,
            data: launchpadSuccessResponse,
          });
        default:
          return Promise.reject(new Error("mock not found"));
      }
    });

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

  it("should return an error (500) response when a single call to SpaceX API fails", async () => {
    (axios.get as jest.Mock).mockImplementation((url) => {
      switch (url) {
        case "https://api.spacexdata.com/v4/launches":
          return Promise.resolve({
            status: 200,
            data: launchesSuccessResponse,
          });
        case "https://api.spacexdata.com/v4/rockets":
          return Promise.resolve({
            status: 200,
            data: rocketsSuccessResponse,
          });
        case "https://api.spacexdata.com/v4/launchpads":
          return Promise.resolve({
            status: 500,
          });
        default:
          return Promise.reject(new Error("mock not found"));
      }
    });

    const response = await request(app).get("/launches");

    expect(response.status).toBe(500);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({
      message: "An error occurred while fetching data from SpaceX API.",
    });
  });
});
