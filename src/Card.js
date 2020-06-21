import React from "react";
import DownloadBlock from "./DownloadBlock";

const Card = ({ title, desc, platforms }) => {
  return (
    <article className="card lightBlock">
      <div className="cardWrapper">
        <h2 className="cardTitle">{title}</h2>
        <p className="cardDescription">{desc}</p>
        <p className="downloadLabel">Download / Use</p>
        <div className="downloadBlocks">
          {platforms.map((platform, index) => {
            return <DownloadBlock platform={platform} />;
          })}
          {console.log(platforms)}
        </div>
      </div>
    </article>
  );
};

export default Card;
