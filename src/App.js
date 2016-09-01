/** @flow
 *
 * Container that holds our state and the table component
 *
 */

import React, { Component } from 'react';
import './App.css';
import HeadedTable from './HeadedTable';
import RowElements from "./RowElements";

const headers = [
  { label: "#", direction: "NonControl"},
  { label: "Camper name", direction: "NonControl"},
  { label: "All-time", direction: "Down"},
  { label: "Last 30 days", direction: "Unselected"}
];

const camperData = [
  {"username":"Takumar","img":"https://avatars.githubusercontent.com/u/2951935?v=3","alltime":2946,"recent":9,"lastUpdate":"2016-08-24T06:32:39.875Z"},
  {"username":"abhisekp","img":"https://avatars.githubusercontent.com/u/1029200?v=3","alltime":2658,"recent":133,"lastUpdate":"2016-08-31T00:27:03.626Z"},
  {"username":"sjames1958gm","img":"https://avatars.githubusercontent.com/u/4639625?v=3","alltime":2646,"recent":719,"lastUpdate":"2016-08-31T04:00:31.385Z"}
];

const rows = camperData.map((camper, i) => <RowElements camper={camper} index={i} />);

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeadedTable
          title="Camper Leaderboard"
          headers={headers}
          rows={rows}
        />
      </div>
    );
  }
}

export default App;
