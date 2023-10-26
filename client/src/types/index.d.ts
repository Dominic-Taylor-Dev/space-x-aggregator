export type Launch = {
  id: string;
  launchName: string;
  rocketName: string;
  launchpadName: string;
  details: string;
  date: string; // ISO DateTime format
  success: boolean;
};
