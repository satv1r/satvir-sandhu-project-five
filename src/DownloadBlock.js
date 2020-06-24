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
    // <div >
    <a
      href={platform[1]}
      tabIndex="0"
      className={"downloadBlock " + theme}
      rel="noopener noreferrer"
      target="_blank"
    >
      <p className={colors[platform[0]]}>{platform[0]}</p>
    </a>
    // </div>
  );
};

export default DownloadBlock;
