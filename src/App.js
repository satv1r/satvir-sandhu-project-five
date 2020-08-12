import React, { Fragment, useState, useEffect } from "react";
import firebase from "./firebase";

import Card from "./Card";
import Filter from "./Filter";
import ThemeSwitcher from "./ThemeSwitcher";
import SubmissionForm from "./SubmissionForm";
import { ThemeProvider } from "./ThemeContext";

const App = () => {
  const [apps, setApps] = useState([]);
  const [appFilter, setAppFilter] = useState("All");
  const [submitted, setSubmitted] = useState("false");
  const [submission, setSubmission] = useState({
    title: "",
    desc: "",
    platforms: [],
    iosUrl: "",
    androidUrl: "",
    webUrl: "",
  });

  // Toggle display of an element (none / block)
  const toggleElement = (element) => {
    if (element.style.display === "block") {
      element.style.display = "none";
      element.removeAttribute("required");
      element.value = "";
      setSubmission({
        ...submission,
        [element.id]: element.value,
      });
    } else {
      element.style.display = "block";
      element.setAttribute("required", "");
    }
  };

  // Store any changes in state, for a given input
  const handleChange = (e) => {
    setSubmission({
      ...submission,
      [e.target.id]: e.target.value,
    });
  };

  // Set filter in state for given input
  const filter = (e) => {
    setAppFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const platformRequired = document.getElementById("platformRequired");
    platformRequired.classList.remove("red");
    const boxes = document.querySelectorAll("input[type='checkbox']:checked");
    if (boxes.length === 0) {
      platformRequired.classList.add("red");
      setTimeout(() => {
        platformRequired.classList.remove("red");
      }, 3000);

      return false;
    }
    const platformPairs = {
      iosUrl: "iOS",
      androidUrl: "Android",
      webUrl: "Web",
    };
    const tempApp = submission;
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

    setSubmission({
      title: "",
      desc: "",
      platforms: [],
      iosUrl: "",
      androidUrl: "",
      webUrl: "",
    });

    setSubmitted("true");

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

  useEffect(() => {
    // create a variable to store a reference to our database
    const dbRef = firebase.database().ref();

    // Set an event listener to update local reference if firebase gets updated, also runs once
    dbRef.on("value", (response) => {
      let newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push({
          title: data[key].title,
          desc: data[key].desc,
          platforms: data[key].platforms,
          key: key,
        });
      }
      setApps(newState);
    });
  }, []);

  let appsToRender = [];
  apps.forEach((app) => {
    if (appFilter === "All") {
      appsToRender.push(app);
    } else {
      app.platforms.forEach((platform) => {
        if (platform[0] === appFilter) {
          appsToRender.push(app);
        }
      });
    }
  });

  return (
    <Fragment>
      <ThemeProvider>
        <div className="wrapper">
          <ThemeSwitcher />
          <h1>Browse cool apps made right here in Canada</h1>
          <Filter filter={filter} />
          <div className="cards">
            {appsToRender.map((app) => {
              return (
                <Card
                  title={app.title}
                  desc={app.desc}
                  platforms={app.platforms}
                  key={app.key}
                />
              );
            })}
          </div>

          <div className="bottom">
            <SubmissionForm
              submit={handleSubmit}
              submitted={submitted}
              change={handleChange}
              toggle={toggleElement}
              theme={"lightBlock"}
              title={submission.title}
              desc={submission.desc}
              key="form"
            />
            <div className="profile">
              <h2>Designed and Built by Satvir Sandhu</h2>
              <ul className="links">
                <li>
                  <a
                    href="https://github.com/satv1r"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Satvirs GitHub"
                  >
                    <i className="fab fa-github fa-2x"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://codepen.io/satv1r"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Satvirs CodePen"
                  >
                    <i className="fab fa-codepen fa-2x"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.behance.net/satv1r"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Satvirs Behance"
                  >
                    <i className="fab fa-behance fa-2x"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/satv1r"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Satvirs Twitter"
                  >
                    <i className="fab fa-twitter fa-2x"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
