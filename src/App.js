/** @flow
 *
 * Container that holds our state and the table component
 *
 */

import React, { Component } from 'react';
import './App.css';
import CamperTable from './CamperTable';
import type { Camper, Direction } from './CamperTable';

type State = {
  headers: string[];
  directions: Direction[];
  campers: {
    allTimeUp: Camper[];
    allTimeDown: Camper[];
    recentUp: Camper[];
    recentDown: Camper [];
  }
 };

class App extends Component {

  state: {
    headers: string[];
    directions: Direction[];
    campers: {
      allTimeUp: Camper[];
      allTimeDown: Camper[];
      recentUp: Camper[];
      recentDown: Camper [];
    }
   };

  constructor() {
    super();
    this.state = {
      headers: [ "#", "Camper name", "All-time", "Last 30 days" ],
      directions: [ "NonControl", "NonControl", "Down", "Unselected" ],
      campers: {
        allTimeUp: [
          {"username":"Takumar","img":"https://avatars.githubusercontent.com/u/2951935?v=3","alltime":2946,"recent":9,"lastUpdate":"2016-08-24T06:32:39.875Z"},
          {"username":"abhisekp","img":"https://avatars.githubusercontent.com/u/1029200?v=3","alltime":2658,"recent":133,"lastUpdate":"2016-08-31T00:27:03.626Z"},
          {"username":"sjames1958gm","img":"https://avatars.githubusercontent.com/u/4639625?v=3","alltime":2646,"recent":719,"lastUpdate":"2016-08-31T04:00:31.385Z"}
        ],
        allTimeDown: [
          {"username":"sjames1958gm","img":"https://avatars.githubusercontent.com/u/4639625?v=3","alltime":2646,"recent":719,"lastUpdate":"2016-08-31T04:00:31.385Z"},
          {"username":"abhisekp","img":"https://avatars.githubusercontent.com/u/1029200?v=3","alltime":2658,"recent":133,"lastUpdate":"2016-08-31T00:27:03.626Z"},
          {"username":"Takumar","img":"https://avatars.githubusercontent.com/u/2951935?v=3","alltime":2946,"recent":9,"lastUpdate":"2016-08-24T06:32:39.875Z"}
        ],
        recentUp: [
          {"username":"Takumar","img":"https://avatars.githubusercontent.com/u/2951935?v=3","alltime":2946,"recent":9,"lastUpdate":"2016-08-24T06:32:39.875Z"},
          {"username":"abhisekp","img":"https://avatars.githubusercontent.com/u/1029200?v=3","alltime":2658,"recent":133,"lastUpdate":"2016-08-31T00:27:03.626Z"},
          {"username":"sjames1958gm","img":"https://avatars.githubusercontent.com/u/4639625?v=3","alltime":2646,"recent":719,"lastUpdate":"2016-08-31T04:00:31.385Z"}
        ],
        recentDown: [
          {"username":"sjames1958gm","img":"https://avatars.githubusercontent.com/u/4639625?v=3","alltime":2646,"recent":719,"lastUpdate":"2016-08-31T04:00:31.385Z"},
          {"username":"abhisekp","img":"https://avatars.githubusercontent.com/u/1029200?v=3","alltime":2658,"recent":133,"lastUpdate":"2016-08-31T00:27:03.626Z"},
          {"username":"Takumar","img":"https://avatars.githubusercontent.com/u/2951935?v=3","alltime":2946,"recent":9,"lastUpdate":"2016-08-24T06:32:39.875Z"}
        ]
      }
    };
  }

  /** Helper method to select the appropriate array of campers given our sorting headers */
  selectCampersArray(): Camper[] {
    if (this.state.directions[2] === "Up") {
      return this.state.campers.allTimeUp;
    } else if (this.state.directions[2] === "Down") {
      return this.state.campers.allTimeDown
    } else if (this.state.directions[3] === "Up") {
      return this.state.campers.recentUp;
    } else if (this.state.directions[3] === "Down") {
      return this.state.campers.recentDown
    } else {
      return [];
    }
  }

  /* Helper method to update the directions[] in state when a column is clicked */
  updateDirections(columnIndex: number): void {
    console.log("Changing direction for column", columnIndex, "from", this.state.directions[columnIndex]);
    let oldDirection = this.state.directions[columnIndex];
    let mapFn = (d: Direction, i: number) => {
      switch (oldDirection) {
        case "Up":
          return i === columnIndex ? "Down" : d;
        case "Down":
          return i === columnIndex ? "Up" : d;
        case "Unselected":
          return i === columnIndex ? "Down" : (d === "NonControl" ? "NonControl" : "Unselected");
        default:
          return d;
      }
    };
    this.setState({
      ...this.state,
      directions: this.state.directions.map(mapFn)
    });
  }

  render() {
    return (
      <div className="App">
        <CamperTable
          title="Camper Leaderboard"
          headers={this.state.headers}
          directions={this.state.directions}
          campers={this.selectCampersArray()}
          onHeaderClick={(i) => this.updateDirections(i)}
        />
      </div>
    );
  }
}



export default App;
