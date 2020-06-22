import React, { Component, Fragment } from "react";
import firebase from "./firebase";
import Card from "./Card";

class App extends Component {
  constructor() {
    super();
    this.state = {
      apps: [],
      submission: {
        title: "",
        desc: "",
        platforms: [],
        iosUrl: "",
        androidUrl: "",
        macUrl: "",
        windowsUrl: "",
        linuxUrl: "",
        webUrl: "",
      },
    };
  }

  toggleElement(element) {
    if (element.style.display === "block") {
      element.style.display = "none";
      element.removeAttribute("required");
      element.value = "";
      this.setState({
        submission: {
          ...this.state.submission,
          [element.id]: element.value,
        },
      });
    } else {
      element.style.display = "block";
      element.setAttribute("required", "");
    }
  }

  handleChange = (e) => {
    this.setState({
      submission: {
        ...this.state.submission,
        [e.target.id]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const platformPairs = {
      iosUrl: "iOS",
      androidUrl: "Android",
      macUrl: "MacOS",
      windowsUrl: "Windows",
      linuxUrl: "Linux",
      webUrl: "Web",
    };
    const tempApp = this.state.submission;
    const submissionApp = {
      platforms: [],
    };
    for (const key in tempApp) {
      if (tempApp[key] !== "" && !platformPairs[key]) {
        submissionApp[key] = tempApp[key];
      }
      if (platformPairs[key] && tempApp[key] !== "") {
        submissionApp.platforms.push([platformPairs[key], tempApp[key]]);
      }
    }

    const dbRef = firebase.database().ref();
    dbRef.push(submissionApp);

    this.setState({
      ...this.state,
      submission: {
        title: "",
        desc: "",
        platforms: [],
        iosUrl: "",
        androidUrl: "",
        macUrl: "",
        windowsUrl: "",
        linuxUrl: "",
        webUrl: "",
      },
    });

    const textInputs = document.querySelectorAll("input");
    document.querySelector("textarea").value = "";
    textInputs.forEach((input) => {
      input.value = "";
      input.checked = false;
    });
    const hiddenInputs = document.querySelectorAll('input[type="text"]');
    hiddenInputs.forEach((input) => {
      input.style.display = "none";
    });
  };

  componentDidMount() {
    // create a variable to store a reference to our database
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      const newState = [];
      const data = response.val();

      for (let key in data) {
        newState.push({
          title: data[key].title,
          desc: data[key].desc,
          platforms: data[key].platforms,
          key: key,
        });
      }

      this.setState({
        apps: newState,
      });
    });
  }

  render() {
    const iosUrl = document.getElementById("iosUrl");
    const androidUrl = document.getElementById("androidUrl");
    const macUrl = document.getElementById("macUrl");
    const windowsUrl = document.getElementById("windowsUrl");
    const linuxUrl = document.getElementById("linuxUrl");
    const webUrl = document.getElementById("webUrl");
    return (
      <Fragment>
        <div className="wrapper">
          <h1>Browse cool apps made right here in Canada</h1>
          {this.state.apps.map((app) => {
            return (
              <Card
                title={app.title}
                desc={app.desc}
                platforms={app.platforms}
                key={app.key}
              />
            );
          })}
          <form className="submissionForm">
            <h2>Submit an App</h2>

            <label htmlFor="title" className="raise">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="lightBlockIntense"
              maxLength="22"
              required
              onChange={this.handleChange}
            />

            <label htmlFor="desc" className="raise">
              Description:
            </label>
            <textarea
              id="desc"
              className="lightBlockIntense"
              maxLength="100"
              required
              onChange={this.handleChange}
            ></textarea>

            <fieldset className="urls">
              <input
                type="checkbox"
                id="ios"
                onChange={() => {
                  this.toggleElement(iosUrl);
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
                className="lightBlockIntense"
                placeholder="Enter download URL"
                onChange={this.handleChange}
              />
            </fieldset>
            <fieldset className="urls">
              <input
                type="checkbox"
                id="android"
                onChange={() => {
                  this.toggleElement(androidUrl);
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
                className="lightBlockIntense"
                placeholder="Enter download URL"
                onChange={this.handleChange}
              />
            </fieldset>
            <fieldset className="urls">
              <input
                type="checkbox"
                id="mac"
                onChange={() => {
                  this.toggleElement(macUrl);
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
                className="lightBlockIntense"
                placeholder="Enter download URL"
                onChange={this.handleChange}
              />
            </fieldset>
            <fieldset className="urls">
              <input
                type="checkbox"
                id="windows"
                onChange={() => {
                  this.toggleElement(windowsUrl);
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
                className="lightBlockIntense"
                placeholder="Enter download URL"
                onChange={this.handleChange}
              />
            </fieldset>
            <fieldset className="urls">
              <input
                type="checkbox"
                id="linux"
                onChange={() => {
                  this.toggleElement(linuxUrl);
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
                className="lightBlockIntense"
                placeholder="Enter download URL"
                onChange={this.handleChange}
              />
            </fieldset>
            <fieldset className="urls">
              <input
                type="checkbox"
                id="web"
                onChange={() => {
                  this.toggleElement(webUrl);
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
                className="lightBlockIntense"
                placeholder="Enter download URL"
                onChange={this.handleChange}
              />
            </fieldset>

            <button className="lightBlockIntense" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default App;
