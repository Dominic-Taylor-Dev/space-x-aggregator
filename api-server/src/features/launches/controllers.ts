import { Response, Request } from "express";
import { log } from "../../common/logging";
import { errorReferenceCode } from "../../common/errors";
import {
  getLaunchData,
  getLaunchpadData,
  getRocketData,
} from "./space-x-service";

export const getAllLaunches = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    log.info("Attempting to retreive data from SpaceX API");
    const [launchesResponse, rocketsResponse, launchpadsResponse] =
      await Promise.all([getLaunchData(), getRocketData(), getLaunchpadData()]);

    const rocketsMap = new Map(
      rocketsResponse.data.map((rocket) => [rocket.id, rocket])
    );
    const launchpadsMap = new Map(
      launchpadsResponse.data.map((launchpad) => [launchpad.id, launchpad])
    );

    const simplifiedLaunches: Launch[] = launchesResponse.data.docs.map(
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

    // Limit the response to the first 10 launches
    const first10Launches = simplifiedLaunches.slice(0, 10);

    const apiResult: LaunchesApiResult = { results: first10Launches };
    log.info("Returning successful response to user");
    res.json(apiResult);
  } catch (error) {
    const referenceCode = errorReferenceCode();

    log.error(
      `An error occurred while fetching data from SpaceX API. Returning error response to user with code: ${referenceCode}`
    );

    const errorData: ErrorData = {
      message: "An error occurred while fetching data from SpaceX API.",
      referenceCode,
    };

    res.status(500).json(errorData);
  }
};
