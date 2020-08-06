import React from "react";
import DownloadBlock from "./DownloadBlock";
import { ThemeContext } from "./ThemeContext";

const Card = ({ title, desc, platforms }) => {
  return (
    <ThemeContext.Consumer>
      {(context) => (
        <article className={"card " + context.theme} tabIndex="0">
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
                      theme={context.theme}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </article>
      )}
    </ThemeContext.Consumer>
  );
};

export default Card;
