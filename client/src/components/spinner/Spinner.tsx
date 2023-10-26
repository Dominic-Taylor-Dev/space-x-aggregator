import React from "react";
import style from "./Spinner.module.css";

const LaunchStatus: React.FC = () => {
  return (
    <div className={style["spinner"]} aria-live="polite" aria-busy="true"></div>
  );
};

export default LaunchStatus;
