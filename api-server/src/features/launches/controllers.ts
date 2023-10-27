import axios from "axios";
import { Response, Request } from "express";
import { getSpaceXApiBaseUrl } from "../../config/config";

const spaceXBaseApi = getSpaceXApiBaseUrl();

export const getAllLaunches = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const [launchesResponse, rocketsResponse, launchpadsResponse] =
      await Promise.all([
        axios.get<LaunchData[]>(spaceXBaseApi + "/launches"),
        axios.get<RocketData[]>(spaceXBaseApi + "/rockets"),
        axios.get<LaunchpadData[]>(spaceXBaseApi + "/launchpads"),
      ]);

    const rocketsMap = new Map(
      rocketsResponse.data.map((rocket) => [rocket.id, rocket])
    );
    const launchpadsMap = new Map(
      launchpadsResponse.data.map((launchpad) => [launchpad.id, launchpad])
    );

    const simplifiedLaunches: Launch[] = launchesResponse.data.map(
      (launch) => ({
        id: launch.id,
        launchName: launch.name,
        rocketName: rocketsMap.get(launch.rocket)?.name ?? "N/A",
        launchpadName: launchpadsMap.get(launch.launchpad)?.name ?? "N/A",
        details: launch.details,
        date: launch.date_utc,
        success: launch.success,
      })
    );

    const apiResult: LaunchesApiResult = { results: simplifiedLaunches };
    res.json(apiResult);
  } catch (error) {
    const errorData: ErrorData = {
      message: "An error occurred while fetching data from SpaceX API.",
    };

    res.status(500).json(errorData);
  }
};
