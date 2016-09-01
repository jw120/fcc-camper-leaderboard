/** @flow
 *
 * Container that holds our state and the table component
 *
 */

import React, { Component } from 'react';
import './App.css';
import CamperTable from './CamperTable';
/* import type Direction from './CamperTable'; */

type Direction = "Up" | "Down" | "Unselected" | "NonControl";

const campers = [
  {"username":"Takumar","img":"https://avatars.githubusercontent.com/u/2951935?v=3","alltime":2946,"recent":9,"lastUpdate":"2016-08-24T06:32:39.875Z"},
  {"username":"abhisekp","img":"https://avatars.githubusercontent.com/u/1029200?v=3","alltime":2658,"recent":133,"lastUpdate":"2016-08-31T00:27:03.626Z"},
  {"username":"sjames1958gm","img":"https://avatars.githubusercontent.com/u/4639625?v=3","alltime":2646,"recent":719,"lastUpdate":"2016-08-31T04:00:31.385Z"}
];

class App extends Component {

  state: {
    headers: string[];
    directions: Direction[];
   };

  constructor() {
    super();
    this.state = {
      headers: [ "#", "Camper name", "All-time", "Last 30 days" ],
      directions: [ "NonControl", "NonControl", "Down", "Up" ]
    }
  }

  updateDirections(columnIndex: number): void {
    console.log("Changing direction for column", columnIndex, "from", this.state.directions[columnIndex]);
  }

  render() {
    return (
      <div className="App">
        <CamperTable
          title="Camper Leaderboard"
          headers={this.state.headers}
          directions={this.state.directions}
          campers={campers}
          onHeaderClick={(i) => this.updateDirections(i)}
        />
      </div>
    );
  }
}

export default App;
