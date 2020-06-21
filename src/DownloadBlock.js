import React from "react";

const DownloadBlock = ({ platform }) => {
  let colors = {
    iOS: "blue",
    Android: "green",
    MacOS: "pink",
    Windows: "purple",
    Linux: "red",
    Web: "teal",
  };
  return (
    <div className="downloadBlock lightBlock">
      <a href={platform[1]}>
        <p className={colors[platform[0]]}>{platform[0]}</p>
      </a>
    </div>
  );
};

export default DownloadBlock;
