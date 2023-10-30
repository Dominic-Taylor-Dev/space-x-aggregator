import { http } from "../../common/http/http";

const MAXIMUM_ITEMS_IN_RESPONSE = 10;

const defaultQueryRequestBody: SpaceXQueryApiBody = {
  query: {},
  options: {
    limit: MAXIMUM_ITEMS_IN_RESPONSE,
  },
};

export const getLaunchData = async (
  body: SpaceXQueryApiBody = defaultQueryRequestBody
) => http.client.post<LaunchDataResponse>("/launches/query", body);

export const getRocketData = () =>
  http.client.get<RocketDataResponse>("/rockets");

export const getLaunchpadData = () =>
  http.client.get<LaunchpadDataResponse>("/launchpads");
