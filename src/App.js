import React, { Component, Fragment } from "react";
import Card from "./Card";

class App extends Component {
  constructor() {
    super();
    this.state = {
      apps: [
        {
          title: "Shop",
          desc:
            "An awesome delivery tracker that recommends new stores. Built in Ottawa Ontario",
          platforms: ["iOS", "Android"],
        },
        {
          title: "Apollo for Reddit",
          desc:
            "An award winning reddit client, made entirely by a 1 person team from Halifax, Nova Scotia.",
          platforms: ["iOS"],
        },
      ],
    };
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
        </div>
      </Fragment>
    );
  }
}

export default App;
