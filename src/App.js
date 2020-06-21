import React, { Component, Fragment } from "react";
import firebase from "./firebase";
import Card from "./Card";

class App extends Component {
  constructor() {
    super();
    this.state = {
      apps: [],
    };
  }

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
        });
      }

      this.setState({
        apps: newState,
      });
    });
  }

  render() {
    return (
      <Fragment>
        <div className="wrapper">
          <h1>Browse cool apps made right here in Canada</h1>
          {this.state.apps.map((app, index) => {
            return (
              <Card
                title={app.title}
                desc={app.desc}
                platforms={app.platforms}
                key={index}
              />
            );
          })}
          <form className="submissionForm">
            <h2>Submit an App</h2>

            <label htmlFor="submitTitle">Title:</label>
            <input
              type="text"
              id="submitTitle"
              className="lightBlockIntense"
              maxLength="22"
            />

            <label htmlFor="submitDesc">Description:</label>
            <textarea
              id="submitDesc"
              className="lightBlockIntense"
              maxLength="100"
            ></textarea>

            <fieldset>
              <input type="checkbox" id="ios" />
              <label htmlFor="ios">iOS</label>
              <input type="text" />
            </fieldset>
            <fieldset>
              <input type="checkbox" id="android" />
              <label htmlFor="ios">Android</label>
              <input type="text" />
            </fieldset>
            <fieldset>
              <input type="checkbox" id="mac" />
              <label htmlFor="ios">MacOS</label>
              <input type="text" />
            </fieldset>
            <fieldset>
              <input type="checkbox" id="windows" />
              <label htmlFor="ios">Windows</label>
              <input type="text" />
            </fieldset>
            <fieldset>
              <input type="checkbox" id="linux" />
              <label htmlFor="ios">Linux</label>
              <input type="text" />
            </fieldset>
            <fieldset>
              <input type="checkbox" id="web" />
              <label htmlFor="ios">Web</label>
              <input type="text" />
            </fieldset>

            <button id="submit" className="lightBlockIntense">
              Submit
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default App;
