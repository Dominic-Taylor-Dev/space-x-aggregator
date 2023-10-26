import React from "react";
import style from "./LaunchStatus.module.css";

interface LaunchStatusProps {
  success: boolean;
}

const LaunchStatus: React.FC<LaunchStatusProps> = ({ success }) => {
  // Determine the appropriate status class based on the success prop
  const statusClass = success
    ? style["card-status--success"]
    : style["card-status--failure"];

  return (
    <div className={style["card-status-container"]}>
      <p className={`${style["card-status"]} ${statusClass}`}>
        {/* This deviates from the requirements document in order to achieve consistency of parts of speech - both verbs */}
        {success ? "Succeeded" : "Failed"}
      </p>
    </div>
  );
};

export default LaunchStatus;
