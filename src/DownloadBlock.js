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
      <p className={colors[platform]}>{platform}</p>
    </div>
  );
};

export default DownloadBlock;
