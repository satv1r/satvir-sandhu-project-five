import React, { Component, Fragment } from "react";
import firebase from "./firebase";
import Card from "./Card";
import Filter from "./Filter";

class App extends Component {
  constructor() {
    super();
    this.state = {
      apps: [],
      filter: "All",
      theme: "lightBlock",
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

  switchTheme = (element) => {
    if (this.state.theme === "lightBlock") {
      this.setState({
        ...this.state,
        theme: "darkBlock",
      });
    } else {
      this.setState({
        ...this.state,
        theme: "lightBlock",
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      submission: {
        ...this.state.submission,
        [e.target.id]: e.target.value,
      },
    });
  };

  filter = (e) => {
    this.setState({
      ...this.state,
      filter: e.target.value,
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
      if (input.id === "title") {
      } else {
        input.style.display = "none";
      }
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
        ...this.state,
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

    if (this.state.theme === "darkBlock") {
      document.body.classList.value = "darkBody";
    } else {
      document.body.classList.value = "lightBody";
    }

    let buttonTheme = "lightTheme";
    if (this.state.theme === "darkBlock") {
      buttonTheme = "current darkCurrent";
    } else {
      buttonTheme = "current lightCurrent";
    }

    let appsToRender = [];
    this.state.apps.forEach((app) => {
      if (this.state.filter === "All") {
        appsToRender.push(app);
      } else {
        app.platforms.forEach((platform) => {
          if (platform[0] === this.state.filter) {
            appsToRender.push(app);
          }
        });
      }
    });

    return (
      <Fragment>
        <div className="wrapper">
          <button
            onClick={this.switchTheme}
            className={"themeSwitcher " + this.state.theme}
            id="themeSwitcher"
          >
            <div className="light">
              <i className="fas fa-sun fa-2x"></i>
            </div>
            <div className="dark">
              <i className="fas fa-moon fa-2x"></i>
            </div>
            <div className={buttonTheme} id="current"></div>
          </button>
          <h1>Browse cool apps made right here in Canada</h1>

          <Filter filter={this.filter} theme={this.state.theme} />

          <div className="cards">
            {appsToRender.map((app) => {
              return (
                <Card
                  title={app.title}
                  desc={app.desc}
                  platforms={app.platforms}
                  key={app.key}
                  theme={this.state.theme}
                />
              );
            })}
          </div>
          <form className="submissionForm" onSubmit={this.handleSubmit}>
            <h2>Submit an App</h2>

            <label htmlFor="title" className="raise">
              Title
            </label>
            <input
              type="text"
              id="title"
              className={this.state.theme}
              maxLength="20"
              required
              onChange={this.handleChange}
            />

            <label htmlFor="desc" className="raise">
              Description
            </label>
            <textarea
              id="desc"
              className={this.state.theme}
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
                className={this.state.theme}
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
                className={this.state.theme}
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
                className={this.state.theme}
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
                className={this.state.theme}
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
                className={this.state.theme}
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
                className={this.state.theme}
                placeholder="Enter download URL"
                onChange={this.handleChange}
              />
            </fieldset>

            <button type="submit" className={this.state.theme + " submit"}>
              Submit
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default App;
