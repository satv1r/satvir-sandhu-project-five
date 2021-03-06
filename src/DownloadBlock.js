import React from "react";

const DownloadBlock = ({ platform }) => {
  let icons = {
    iOS: "fab fa-apple",
    Android: "fab fa-google-play",
    Web: "fas fa-globe-americas",
  };
  return (
    <a
      href={platform[1]}
      tabIndex="0"
      className={"downloadBlock"}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={"Link to app on " + platform[0]}
    >
      <i className={icons[platform[0]]}></i>
    </a>
  );
};

export default DownloadBlock;
