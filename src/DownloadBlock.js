import React from "react";

const DownloadBlock = ({ platform, theme }) => {
  let colors = {
    iOS: "blue",
    Android: "green",
    MacOS: "pink",
    Windows: "purple",
    Linux: "red",
    Web: "teal",
  };
  return (
    <div className={"downloadBlock " + theme}>
      <a href={platform[1]}>
        <p className={colors[platform[0]]}>{platform[0]}</p>
      </a>
    </div>
  );
};

export default DownloadBlock;
