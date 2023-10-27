import React, { useEffect, useState } from "react";
import LaunchDetailCard from "../launch-detail-card/LaunchDetailCard";
import style from "./LaunchList.module.css";
import { Launch } from "../../types";
import { getAggregatedLaunchData } from "../../apis/launches";
import Spinner from "../spinner/Spinner";
import { ApiError } from "../../apis/http";

const LaunchList: React.FC = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    getAggregatedLaunchData()
      .then((launchinfo) => {
        setLaunches(launchinfo.data.results);
        setLoading(false);
      })
      .catch((error: ApiError) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <p className={style["error-text"]} role="alert" aria-live="assertive">
        We are sorry but something went wrong with your request. Please refresh
        the page
        {error.data
          ? ` or contact user support, quoting error reference:
        ${error.data.referenceCode}`
          : ""}
        .
      </p>
    );
  }

  if (loading) {
    return (
      <section className={style["spinner-container"]}>
        <Spinner />
      </section>
    );
  }

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
