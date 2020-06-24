import React, { Component, Fragment } from "react";
import firebase from "./firebase";
import Card from "./Card";
import Filter from "./Filter";
import ThemeSwitcher from "./ThemeSwitcher";
import SubmissionForm from "./SubmissionForm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      apps: [],
      filter: "All",
      theme: "lightBlock",
      submitted: "false",
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

  toggleElement = (element) => {
    if (element.style.display === "block") {
      element.style.display = "none";
      element.removeAttribute("required");
      element.value = "";
      console.log(this);
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
  };

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
      submitted: "true",
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
          <ThemeSwitcher
            switchTheme={this.switchTheme}
            theme={this.state.theme}
            buttonTheme={buttonTheme}
          />
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

          <SubmissionForm
            submit={this.handleSubmit}
            submitted={this.state.submitted}
            change={this.handleChange}
            toggle={this.toggleElement}
            theme={this.state.theme}
            title={this.state.submission.title}
            desc={this.state.submission.desc}
            key="form"
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
