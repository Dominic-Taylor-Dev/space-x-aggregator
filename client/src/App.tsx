import "./App.css";
import { Launch } from "./types";
import LaunchDetailCard from "./components/launch-detail-card/LaunchDetailCard";

const placeholderLaunchInfo: Launch[] = [
  {
    id: "5eb87cd9ffd86e000604b32a",
    launchName: "FalconSat",
    rocketName: "Falcon 1",
    launchpadName: "Kwajalein Atoll",
    details: "Engine failure at 33 seconds and loss of vehicle",
    date: "2006-03-24T22:30:00.000Z",
    success: true,
  },
  {
    id: "5eb87cdaffd86e000604b32b",
    launchName: "DemoSat",
    rocketName: "Falcon 1",
    launchpadName: "Kwajalein Atoll",
    details:
      "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
    date: "2007-03-21T01:10:00.000Z",
    success: false,
  },
];

function App() {
  return (
    <section>
      {placeholderLaunchInfo.map((launch) => {
        return <LaunchDetailCard key={launch.id} launch={launch} />;
      })}
    </section>
  );
}

export default App;
