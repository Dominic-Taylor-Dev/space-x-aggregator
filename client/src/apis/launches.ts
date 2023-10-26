import { Launch } from "../types";
import { http } from "./http";

export type AggregatedLaunchDataResponse = {
  results: Launch[];
};

export const getAggregatedLaunchData = () =>
  http.client.get<AggregatedLaunchDataResponse>("/api/v1/launches");
