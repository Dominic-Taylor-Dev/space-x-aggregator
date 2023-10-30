type SpaceXQueryApiBody = {
  query: {};
  options: {
    limit?: number;
    select?: any;
  };
};

type LaunchData = {
  id: string;
  name: string;
  rocket: string;
  launchpad: string;
  details: string;
  date_utc: string;
  success: boolean;
};

type LaunchDataResponse = {
  docs: LaunchData[];
};

type RocketData = {
  id: string;
  name: string;
};

type RocketDataResponse = RocketData[];

type LaunchpadData = {
  id: string;
  name: string;
};

type LaunchpadDataResponse = LaunchpadData[];

type Launch = {
  id: string;
  launchName: string;
  rocketName: string;
  launchpadName: string;
  details: string;
  date: string;
  success: boolean;
};

type LaunchesApiResult = {
  results: Launch[];
};
