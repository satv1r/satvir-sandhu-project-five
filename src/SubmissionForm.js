import React from "react";

const SubmissionForm = ({
  submit,
  submitted,
  change,
  toggle,
  theme,
  title,
  desc,
}) => {
  const iosUrl = document.getElementById("iosUrl");
  const androidUrl = document.getElementById("androidUrl");
  const macUrl = document.getElementById("macUrl");
  const windowsUrl = document.getElementById("windowsUrl");
  const linuxUrl = document.getElementById("linuxUrl");
  const webUrl = document.getElementById("webUrl");
  const titleLength = 20;
  const descLength = 100;
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
            Enter App Store URL
          </label>
          <input
            type="text"
            id="iosUrl"
            className={theme}
            placeholder="Enter download URL"
            onChange={change}
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
            placeholder="Enter download URL"
            onChange={change}
          />
        </fieldset>
        <fieldset className="urls">
          <input
            type="checkbox"
            id="mac"
            onChange={() => {
              toggle(macUrl);
            }}
          />
          <label htmlFor="mac" className="raise">
            MacOS
          </label>
          <label htmlFor="macUrl" className="sr-only">
            Enter Download URL
          </label>
          <input
            type="text"
            id="macUrl"
            className={theme}
            placeholder="Enter download URL"
            onChange={change}
          />
        </fieldset>
        <fieldset className="urls">
          <input
            type="checkbox"
            id="windows"
            onChange={() => {
              toggle(windowsUrl);
            }}
          />
          <label htmlFor="windows" className="raise">
            Windows
          </label>
          <label htmlFor="windowsUrl" className="sr-only">
            Enter Download URL
          </label>
          <input
            type="text"
            id="windowsUrl"
            className={theme}
            placeholder="Enter download URL"
            onChange={change}
          />
        </fieldset>
        <fieldset className="urls">
          <input
            type="checkbox"
            id="linux"
            onChange={() => {
              toggle(linuxUrl);
            }}
          />
          <label htmlFor="linux" className="raise">
            Linux
          </label>
          <label htmlFor="linuxUrl" className="sr-only">
            Enter App Store URL
          </label>
          <input
            type="text"
            id="linuxUrl"
            className={theme}
            placeholder="Enter download URL"
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
            placeholder="Enter download URL"
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
