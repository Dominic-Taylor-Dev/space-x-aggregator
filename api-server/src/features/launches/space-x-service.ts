import { http } from "../../common/http/http";

const MAXIMUM_ITEMS_IN_RESPONSE = 10;

const defaultLaunchQueryEndpointPostBody: SpaceXQueryApiBody = {
  query: {},
  options: {
    limit: MAXIMUM_ITEMS_IN_RESPONSE,
    select: {
      id: 1,
      name: 1,
      rocket: 1,
      launchpad: 1,
      details: 1,
      date_utc: 1,
      success: 1,
    },
  },
};

export const getLaunchData = async (
  body: SpaceXQueryApiBody = defaultLaunchQueryEndpointPostBody
) => http.client.post<LaunchDataResponse>("/launches/query", body);

export const getRocketData = () =>
  http.client.get<RocketDataResponse>("/rockets");

export const getLaunchpadData = () =>
  http.client.get<LaunchpadDataResponse>("/launchpads");
