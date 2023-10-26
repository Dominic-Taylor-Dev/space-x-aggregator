import "./App.css";
import { Launch } from "./types";
import starryNightImage from "./assets/starry-night.jpeg";
import LaunchStatus from "./components/launch-status/LaunchStatus";

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
        return (
          <article>
            <div>
              <img src={starryNightImage} alt="Starry night sky" />
            </div>
            <div>
              <h2>{launch.launchName}</h2>
            </div>
            <LaunchStatus success={launch.success} />
            {/* TODO: format this date */}
            <div>{launch.date}</div>
            <div>{launch.details}</div>
            <div>
              <h3>Details</h3>
              <ul>
                <li>Rocket Name: {launch.rocketName}</li>
                <li>Launchpad Name: {launch.launchpadName}</li>
              </ul>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default App;
