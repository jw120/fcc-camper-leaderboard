/** @flow
 *
 * Container that holds our state and the table component
 *
 */

import React, { Component } from 'react';
import "whatwg-fetch";
import './App.css';
import CamperTable from './CamperTable';
import type { Camper, Direction } from './CamperTable';

const title = "Camper Leaderboard";
const columnHeaders = [ "#", "Camper", "All-time", "Recent" ];
const initialColumnDirections = [ "NonControl", "NonControl", "Down", "Unselected" ];
const recentURL = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
const allTimeURL = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";

class App extends Component {

  state: {
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
      directions: initialColumnDirections,
      campers: { allTimeUp: [], allTimeDown: [], recentUp: [], recentDown: [] }
    };
    fetch(allTimeURL)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          ...this.state,
          campers: {
            ...this.state.campers,
            allTimeDown: json,
            allTimeUp: json.concat().sort((a, b) => a.alltime - b.alltime)
          }
        });
      });
      fetch(recentURL)
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            ...this.state,
            campers: {
              ...this.state.campers,
              recentDown: json,
              recentUp: json.concat().sort((a, b) => a.recent - b.recent)
            }
          });
        });

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
        <div className="App-title">{title}</div>
        <div className="App-box">
          <div className="App-table-box">
            <CamperTable
              headers={columnHeaders}
              directions={this.state.directions}
              campers={this.selectCampersArray()}
              onHeaderClick={(i) => this.updateDirections(i)}
            />
          </div>
        </div>
        <div className="App-footer">
          Page by <a href="https://jw120.github.io">jw120</a>.
        </div>
      </div>
    );
  }
}

export default App;
