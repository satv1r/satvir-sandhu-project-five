import React from "react";
import { useTheme } from "./ThemeContext";

const SubmissionForm = ({ submit, submitted, change, toggle, title, desc }) => {
  const iosUrl = document.getElementById("iosUrl");
  const androidUrl = document.getElementById("androidUrl");
  const webUrl = document.getElementById("webUrl");
  const titleLength = 20;
  const descLength = 140;
  const theme = useTheme();
  if (submitted === "false") {
    return (
      <form className="submissionForm" onSubmit={submit}>
        <h2>Submit an App</h2>

        <label htmlFor="title" className="raise">
          Title <span>{titleLength - title.length} Characters Remaining</span>
        </label>
        <input
          type="text"
          id="title"
          className={theme}
          maxLength={titleLength}
          required
          onChange={change}
        />

        <label htmlFor="desc" className="raise">
          Description{" "}
          <span>{descLength - desc.length} Characters Remaining</span>
        </label>
        <textarea
          id="desc"
          className={theme}
          maxLength={descLength}
          required
          onChange={change}
        ></textarea>
        <h3 id="platformRequired">Atleast 1 Platform is Required</h3>
        <fieldset className="urls">
          <input
            type="checkbox"
            id="ios"
            onChange={() => {
              toggle(iosUrl);
            }}
          />
          <label htmlFor="ios" className="raise">
            iOS
          </label>
          <label htmlFor="iosUrl" className="sr-only">
            Enter App Store URL (with HTTP in url)
          </label>
          <input
            type="text"
            id="iosUrl"
            className={theme}
            placeholder="https://www.apple.com/ca/ios/app-store/"
            onChange={change}
            pattern="https://.*"
          />
        </fieldset>
        <fieldset className="urls">
          <input
            type="checkbox"
            id="android"
            onChange={() => {
              toggle(androidUrl);
            }}
          />
          <label htmlFor="android" className="raise">
            Android
          </label>
          <label htmlFor="androidUrl" className="sr-only">
            Enter Google Play Store URL
          </label>
          <input
            type="text"
            id="androidUrl"
            className={theme}
            placeholder="https://play.google.com/store/apps/"
            onChange={change}
          />
        </fieldset>
        <fieldset className="urls">
          <input
            type="checkbox"
            id="web"
            onChange={() => {
              toggle(webUrl);
            }}
          />
          <label htmlFor="web" className="raise">
            Web
          </label>
          <label htmlFor="webUrl" className="sr-only">
            Enter URL
          </label>
          <input
            type="text"
            id="webUrl"
            className={theme}
            placeholder="https://www.reddit.com/"
            onChange={change}
          />
        </fieldset>

        <button type="submit" className={theme + " submit"}>
          Submit
        </button>
      </form>
    );
  } else {
    return <h2 className="thanks">Thank you for your submission.</h2>;
  }
};

export default SubmissionForm;
