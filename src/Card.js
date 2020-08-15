import React from "react";
import DownloadBlock from "./DownloadBlock";
import { useTheme } from "./ThemeContext";

const Card = ({ title, desc, platforms }) => {
  const theme = useTheme();
  return (
    <article className={"card " + theme} tabIndex="0">
      <div className="cardWrapper">
        <div className="info">
          <h2 className="cardTitle">{title}</h2>
          <p className="cardDescription">{desc}</p>
        </div>
        <div className="action">
          <p className="downloadLabel">Download / Use</p>
          <div className="downloadBlocks">
            {platforms.map((platform, index) => {
              return (
                <DownloadBlock
                  platform={platform}
                  key={title + index}
                  theme={theme}
                />
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
