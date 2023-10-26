import React from "react";
import LaunchStatus from "../launch-status/LaunchStatus";
import starryNightImage from "../../assets/starry-night.jpeg";
import style from "./LaunchDetailCard.module.css";
import { Launch } from "../../types";

export type LaunchDetailCardProps = {
  launch: Launch;
};

const zeroPad = (num: number) => {
  return num.toString().padStart(2, "0");
};

// The output format is: (D)D/(M)M/YYYY HH:mm:ss AM/PM - time elements are padded with leading zeros, but not dates
// This is a combination of the two examples given in the design mockup, as two different formats were used there
export const formattedDate = (rawDate: string) => {
  const date = new Date(rawDate);

  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}, ${zeroPad(date.getHours())}:${zeroPad(
    date.getMinutes()
  )}:${zeroPad(date.getSeconds())} ${date.getHours() < 12 ? "AM" : "PM"}`;
};

const LaunchDetailCard: React.FC<LaunchDetailCardProps> = ({ launch }) => (
  <article className={`${style.card} ${style["card-shadow"]}`}>
    <div className={style["card-image"]}>
      <img src={starryNightImage} alt="Starry night sky" />
    </div>
    <div className={style["card-header"]}>
      <h2>{launch.launchName}</h2>
    </div>
    <LaunchStatus success={launch.success} />
    <div className={style["card-datetime"]}>{formattedDate(launch.date)}</div>
    {launch.details ? (
      <div className={style["card-description"]}>{launch.details}</div>
    ) : null}
    <div className={style["card-details"]}>
      <h3>Details</h3>
      <ul>
        <li>Rocket Name: {launch.rocketName}</li>
        <li>Launchpad Name: {launch.launchpadName}</li>
      </ul>
    </div>
  </article>
);

export default LaunchDetailCard;
