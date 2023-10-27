type LaunchData = {
  id: string;
  name: string;
  rocket: string;
  launchpad: string;
  details: string;
  date_utc: string;
  success: boolean;
};

type RocketData = {
  id: string;
  name: string;
};

type LaunchpadData = {
  id: string;
  name: string;
};

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
