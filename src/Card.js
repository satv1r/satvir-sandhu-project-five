import React from "react";
import DownloadBlock from "./DownloadBlock";

const Card = () => {
  return (
    <article className="card lightBlock">
      <div className="cardWrapper">
        <h2 className="cardTitle">Shop</h2>
        <p className="cardDescription">
          An awesome delivery tracker that recommends new stores. Built in
          Ottawa, Ontario
        </p>
        <p className="downloadLabel">Download</p>
        <div className="downloadBlocks">
          <DownloadBlock />
          <DownloadBlock />
          <DownloadBlock />
          <DownloadBlock />
        </div>
      </div>
    </article>
  );
};

export default Card;
