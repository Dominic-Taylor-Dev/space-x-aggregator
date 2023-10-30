import { http } from "../../common/http/http";

export const getLaunchData = () =>
  http.client.get<LaunchDataResponse>("/launches");

export const getRocketData = () =>
  http.client.get<RocketDataResponse>("/rockets");

export const getLaunchpadData = () =>
  http.client.get<LaunchpadDataResponse>("/launchpads");
