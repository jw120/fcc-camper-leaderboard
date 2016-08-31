/** @flow
 *
 * Container that holds our state and the table component
 *
 */

import React, { Component } from 'react';
import './App.css';
import HeadedTable from './HeadedTable';

const headers = [
  { label: "Camper", direction: "NonControl"},
  { label: "All-time", direction: "Down"},
  { label: "Last 30 days", direction: "Unselected"}
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeadedTable
          title="Camper Leaderboard"
          headers={headers}
          rows={[]}
        />
      </div>
    );
  }
}

export default App;
