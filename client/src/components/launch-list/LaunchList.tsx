import React, { useEffect, useState } from "react";
import LaunchDetailCard from "../launch-detail-card/LaunchDetailCard";
import style from "./LaunchList.module.css";
import { Launch } from "../../types";
import { getAggregatedLaunchData } from "../../apis/launches";

const LaunchList: React.FC = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);

  useEffect(() => {
    getAggregatedLaunchData().then((launchinfo) => {
      setLaunches(launchinfo.data.results);
    });
  }, []);

  if (!launches.length) {
    return <p className={style["error-text"]}>No launches found.</p>;
  }

  return (
    <section className={style["card-list"]}>
      {launches.map((launch) => {
        return <LaunchDetailCard key={launch.id} launch={launch} />;
      })}
    </section>
  );
};

export default LaunchList;
